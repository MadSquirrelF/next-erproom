"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  FocusEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { OrgschemaService } from "../services/orgschema";
import { IOrgschemaMenuSteps, useOrgschemaMenu } from "../store/orgschemaMenu";

export const useUpdateSchema = () => {
  const queryClient = useQueryClient();

  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);

  const setStep = useOrgschemaMenu((state) => state.setStep);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const setActiveSchemaId = useOrgschemaMenu(
    (state) => state.setActiveSchemaId,
  );

  const schemaInputValue = useOrgschemaMenu((state) => state.schemaInputValue);
  const schemaName = useOrgschemaMenu((state) => state.schemaName);
  const setSchemaInputValue = useOrgschemaMenu(
    (state) => state.setSchemaInputValue,
  );

  const [isDeletedPopoverOpen, setIsDeletedPopoverOpen] = useState(false);
  const [isCreatePopoverOpen, setIsCreatePopoverOpen] = useState(false);
  const [isSchemaInputReadonly, setIsSchemaInputReadonly] = useState(true);

  const { mutate: createSchema } = useMutation<number>({
    mutationKey: ["create new schema"],
    mutationFn: () => OrgschemaService.createSchema(schemaInputValue),
    onSuccess: (data) => {
      toast.success("Схема успешно создана");

      setIsCreatePopoverOpen(false);
      setActiveSchemaId(data);
      setStep(IOrgschemaMenuSteps.MANAGE);

      queryClient.invalidateQueries({
        queryKey: ["get all schemas"],
      });
    },
    onError: (error: any) => {
      toast.error("Ошибка при создании схемы");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: updateSchema } = useMutation({
    mutationKey: ["update schema", activeSchemaId],
    mutationFn: () =>
      OrgschemaService.updateSchema(activeSchemaId, schemaInputValue),
    onSuccess: () => {
      toast.success("Схема успешно обвлена");

      queryClient.invalidateQueries({
        queryKey: ["get all schemas"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get schema tree by id", activeSchemaId],
      });

      setIsSchemaInputReadonly(true);
    },
    onError: (error: any) => {
      toast.error("Ошибка при обновлении схемы");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: deleteSchema } = useMutation({
    mutationKey: ["delete schema", activeSchemaId],
    mutationFn: () => OrgschemaService.deleteSchema(activeSchemaId),
    onSuccess: () => {
      toast.success("Схема успешно удалена");

      setSelectedBlock(undefined);

      setActiveSchemaId(undefined);

      setIsDeletedPopoverOpen(false);

      setStep(IOrgschemaMenuSteps.LIST);

      queryClient.invalidateQueries({
        queryKey: ["get all schemas"],
      });
    },
    onError: (error: any) => {
      toast.error("Ошибка при обновлении схемы");
      toast.error(error.response.data.message);
    },
  });

  const handleDeleteSchema = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteSchema();
  };

  const handleCreateSchema = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createSchema();
  };

  const handleEditSchema = () => {
    setIsSchemaInputReadonly(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSetIsCreatePopoverOpen = () => {
    setIsCreatePopoverOpen(true);
    setSchemaInputValue("");
  };

  const handleSetIsCreatePopoverClose = () => {
    setIsCreatePopoverOpen(false);
    setSchemaInputValue("");
  };

  const handleBlurSchemaName = useCallback(
    (e: FocusEvent<Element>) => {
      const relatedTarget = e.relatedTarget;

      if (
        relatedTarget &&
        (relatedTarget as HTMLElement).id === "confirmUpdateSchemaButton"
      ) {
        return;
      }

      if (schemaInputValue !== schemaName) {
        setIsSchemaInputReadonly(true);
        setSchemaInputValue(schemaName);

        return;
      } else {
        setIsSchemaInputReadonly(true);
      }
    },
    [schemaInputValue, schemaName],
  );

  return useMemo(
    () => ({
      handleDeleteSchema,
      handleCreateSchema,
      updateSchema,
      isDeletedPopoverOpen,
      setIsDeletedPopoverOpen,
      isSchemaInputReadonly,
      inputRef,
      handleBlurSchemaName,
      handleEditSchema,
      setIsSchemaInputReadonly,
      isCreatePopoverOpen,
      handleSetIsCreatePopoverOpen,
      handleSetIsCreatePopoverClose,
    }),
    [
      handleDeleteSchema,
      handleCreateSchema,
      updateSchema,
      isDeletedPopoverOpen,
      setIsDeletedPopoverOpen,
      handleBlurSchemaName,
      isSchemaInputReadonly,
      inputRef,
      handleEditSchema,
      setIsSchemaInputReadonly,
      isDeletedPopoverOpen,
      setIsDeletedPopoverOpen,
      isCreatePopoverOpen,
      handleSetIsCreatePopoverOpen,
      handleSetIsCreatePopoverClose,
    ],
  );
};
