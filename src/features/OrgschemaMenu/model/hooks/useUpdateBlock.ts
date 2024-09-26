import { ChangeEvent, Key, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  IActionManageScreen,
  IManageScreen,
  useOrgschemaMenu,
} from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

import { ISchema } from "@/src/entities/Schema";
import { INode } from "@/src/entities/Node";

export const useUpdateBlock = () => {
  const queryClient = useQueryClient();

  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const blockForm = useOrgschemaMenu((state) => state.blockForm);
  const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const setActionManageScreen = useOrgschemaMenu(
    (state) => state.setActionManageScreen,
  );
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const currentActionManageScreen = useOrgschemaMenu(
    (state) => state.currentActionManageScreen,
  );
  const setLoadedSchema = useOrgschemaMenu((state) => state.setLoadedSchema);

  const { isLoading, isError, error, refetch } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: false,
    select: (data) => {
      setLoadedSchema(data);

      return data;
    },
  });

  const { mutate: createBlock, isPending } = useMutation<number>({
    mutationKey: ["create new block"],
    mutationFn: () => OrgschemaService.createBlock(activeSchemaId, blockForm),
    onSuccess: () => {
      toast.success("Блок успешно создан");

      queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      refetch();

      if (currentActionManageScreen === IActionManageScreen.CREATE) {
        setBlockForm(undefined);
        setActionManageScreen(IActionManageScreen.INFO);
      } else {
        setBlockForm(undefined);
        setManageScreen(IManageScreen.MANAGE);
      }
    },
    onError: (error: any) => {
      toast.error("Ошибка при создании блока");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: updateBlock } = useMutation({
    mutationKey: ["update block"],
    mutationFn: () =>
      OrgschemaService.updateBlock(
        activeSchemaId,
        selectedBlock?.id,
        blockForm,
      ),
    onSuccess: () => {
      toast.success("Блок успешно обновлен");

      setBlockForm(undefined);
      setActionManageScreen(IActionManageScreen.INFO);

      queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      const updatedBlocks = queryClient.getQueryData<INode[]>([
        "get all blocks by schema id",
        activeSchemaId,
      ]);

      const updatedBlock = updatedBlocks?.find(
        (b) => b.id === selectedBlock?.id,
      );

      setSelectedBlock(updatedBlock);

      refetch();
    },
    onError: (error: any) => {
      toast.error("Ошибка при обновлении блока");
      toast.error(error.response.data.message);
    },
  });

  const cancelUpdate = () => {
    setBlockForm(undefined);
    setManageScreen(IManageScreen.EMPTY);
  };

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBlockForm({ name: e.currentTarget.value || "" });
  }, []);

  const onChangeDescription = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBlockForm({ description: e.currentTarget.value || "" });
    },
    [],
  );

  const onChangeDescriptionSecondary = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBlockForm({
        description_secondary: e.currentTarget.value || "",
      });
    },
    [],
  );

  const onChangeColor = useCallback((value: string) => {
    setBlockForm({
      color: value || "",
    });
  }, []);

  const onClearColor = useCallback((isSelected: boolean) => {
    setBlockForm({
      isColorClear: isSelected,
    });
  }, []);

  const onChangeMail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBlockForm({
      mail: e.currentTarget.value || "",
    });
  }, []);

  const onChangeCloud = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBlockForm({
      cloud: e.currentTarget.value || "",
    });
  }, []);

  const onChangeSort = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // Получаем значение из поля ввода
    const validateValue = e.currentTarget.value.replace(/\D+/g, ""); // Удаляем все нецифровые символы

    // Устанавливаем состояние с числом или 1, если строка пустая
    setBlockForm({
      sort: Number(validateValue || 1),
    });
  }, []);

  const onChangeIsTogether = useCallback((isSelected: boolean) => {
    setBlockForm({
      is_together: isSelected ? 1 : 0 || 0,
    });
  }, []);

  const onChangeParentBlock = useCallback((id: Key | null) => {
    setBlockForm({
      parent_id: Number(id) || 0,
    });
  }, []);

  return useMemo(
    () => ({
      onChangeName,
      isPending,
      onChangeDescription,
      onChangeDescriptionSecondary,
      createBlock,
      onChangeColor,
      updateBlock,
      onChangeMail,
      onChangeCloud,
      onChangeSort,
      onClearColor,
      cancelUpdate,
      onChangeIsTogether,
      onChangeParentBlock,
    }),
    [
      onChangeName,
      isPending,
      onClearColor,
      cancelUpdate,
      onChangeDescription,
      onChangeDescriptionSecondary,
      createBlock,
      updateBlock,
      onChangeParentBlock,
      onChangeColor,
      onChangeMail,
      onChangeCloud,
      onChangeSort,
      onChangeIsTogether,
    ],
  );
};
