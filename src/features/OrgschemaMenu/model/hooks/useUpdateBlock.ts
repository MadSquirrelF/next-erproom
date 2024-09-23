import { ChangeEvent, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { IManageScreen, useOrgschemaMenu } from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

import { ISchema } from "@/src/entities/Schema";

export const useUpdateBlock = () => {
  const queryClient = useQueryClient();

  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const blockForm = useOrgschemaMenu((state) => state.blockForm);
  const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);

  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);

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

  const { mutate: createBlock } = useMutation<number>({
    mutationKey: ["create new block"],
    mutationFn: () => OrgschemaService.createBlock(activeSchemaId, blockForm),
    onSuccess: () => {
      toast.success("Блок успешно создан");

      setBlockForm(undefined);
      setManageScreen(IManageScreen.MANAGE);

      queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      refetch();
    },
    onError: (error: any) => {
      toast.error("Ошибка при создании блока");
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
      is_together: isSelected || false,
    });
  }, []);

  return useMemo(
    () => ({
      onChangeName,
      onChangeDescription,
      onChangeDescriptionSecondary,
      createBlock,
      onChangeColor,
      onChangeMail,
      onChangeCloud,
      onChangeSort,
      cancelUpdate,
      onChangeIsTogether,
    }),
    [
      onChangeName,
      cancelUpdate,
      onChangeDescription,
      onChangeDescriptionSecondary,
      createBlock,
      onChangeColor,
      onChangeMail,
      onChangeCloud,
      onChangeSort,
      onChangeIsTogether,
    ],
  );
};
