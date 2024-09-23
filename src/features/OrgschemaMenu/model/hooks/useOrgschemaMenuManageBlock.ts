import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";

import { OrgschemaService } from "../services/orgschema";
import { IManageScreen, useOrgschemaMenu } from "../store/orgschemaMenu";

import { ISchema } from "@/src/entities/Schema";

export const useOrgschemaMenuManage = () => {
  const queryClient = useQueryClient();
  const [isDeletedPopoverOpen, setIsDeletedPopoverOpen] = useState(false);

  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

  const setLoadedSchema = useOrgschemaMenu((state) => state.setLoadedSchema);
  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);

  const { isLoading, isError, error, refetch } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: false,
    select: (data) => {
      setLoadedSchema(data);

      return data;
    },
  });

  const { mutate: deleteBlock } = useMutation({
    mutationKey: ["delete block"],
    mutationFn: () =>
      OrgschemaService.deleteBlock(activeSchemaId, selectedBlock?.id),
    onSuccess: async () => {
      toast.success("Блок успешно удален");

      setSelectedBlock(undefined);

      setIsDeletedPopoverOpen(false);

      await queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      const result = await refetch();

      if (result.data?.blocks && result.data.blocks.length === 0) {
        setManageScreen(IManageScreen.EMPTY);
      }
    },
    onError: (error: any) => {
      toast.error("Ошибка при удалении блока");
      toast.error(error.response.data.message);

      setIsDeletedPopoverOpen(false);
    },
  });

  const handleDeleteBlock = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteBlock();
  };

  return useMemo(
    () => ({
      handleDeleteBlock,
      isDeletedPopoverOpen,
      setIsDeletedPopoverOpen,
    }),
    [handleDeleteBlock, isDeletedPopoverOpen, setIsDeletedPopoverOpen],
  );
};
