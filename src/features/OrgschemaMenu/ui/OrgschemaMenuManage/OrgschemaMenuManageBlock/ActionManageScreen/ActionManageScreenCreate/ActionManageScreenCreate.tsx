"use client";
import { memo } from "react";

import { BlockForm } from "../../../../BlockForm/BlockForm";

import {
  IActionManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { useUpdateBlock } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateBlock";

interface ActionManageScreenCreateProps {
  className?: string;
}

export const ActionManageScreenCreate = memo(
  (props: ActionManageScreenCreateProps) => {
    const { className } = props;

    const setActionManageScreen = useOrgschemaMenu(
      (state) => state.setActionManageScreen,
    );
    const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);

    const cancelCreateBlock = () => {
      setBlockForm(undefined);
      setActionManageScreen(IActionManageScreen.INFO);
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
      createBlock,
      onClearColor,
      isPending,
    } = useUpdateBlock();

    return (
      <BlockForm
        cancel={cancelCreateBlock}
        cancelTitle="Отменить создание"
        formTitle="Создание блока"
        handleBlock={createBlock}
        handleTitle="Создать блок"
        isPending={isPending}
        type="create"
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
