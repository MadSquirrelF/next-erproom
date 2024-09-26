"use client";
import { memo } from "react";

import { BlockForm } from "../../../../BlockForm/BlockForm";

import {
  IActionManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { useUpdateBlock } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateBlock";

interface ActionManageScreenUpdateProps {
  className?: string;
}

export const ActionManageScreenUpdate = memo(
  (props: ActionManageScreenUpdateProps) => {
    const { className } = props;

    const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
    const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);
    const setActionManageScreen = useOrgschemaMenu(
      (state) => state.setActionManageScreen,
    );

    const cancelUpdateBlock = () => {
      setActionManageScreen(IActionManageScreen.INFO);
      setBlockForm(undefined);
    };

    const {
      onChangeName,
      onChangeSort,
      onChangeMail,
      onChangeIsTogether,
      onChangeCloud,
      onChangeColor,
      onChangeDescription,
      onChangeDescriptionSecondary,
      onChangeParentBlock,
      updateBlock,
      onClearColor,
      isPending,
    } = useUpdateBlock();

    return (
      <BlockForm
        cancel={cancelUpdateBlock}
        cancelTitle="Отменить обновление"
        data={selectedBlock}
        formTitle="Редактирование блока"
        handleBlock={updateBlock}
        handleTitle="Обновить блок"
        isPending={isPending}
        type="update"
        onChangeCloud={onChangeCloud}
        onChangeColor={onChangeColor}
        onChangeDescription={onChangeDescription}
        onChangeDescriptionSecondary={onChangeDescriptionSecondary}
        onChangeIsTogether={onChangeIsTogether}
        onChangeMail={onChangeMail}
        onChangeName={onChangeName}
        onChangeParentBlock={onChangeParentBlock}
        onChangeSort={onChangeSort}
        onClearColor={onClearColor}
      />
    );
  },
);
