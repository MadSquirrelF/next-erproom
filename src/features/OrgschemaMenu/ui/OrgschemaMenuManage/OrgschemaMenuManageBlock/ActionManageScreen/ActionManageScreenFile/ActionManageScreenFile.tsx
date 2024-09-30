"use client";
import { Button } from "@nextui-org/button";
import { memo } from "react";

import {
  IManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";

interface ActionManageScreenFileProps {
  className?: string;
}

export const ActionManageScreenFile = memo(
  (props: ActionManageScreenFileProps) => {
    const { className } = props;
    const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
    const handleBackClick = () => {
      setManageScreen(IManageScreen.MANAGE);
    };

    return (
      <div className="w-full h-full flex flex-col justify-between gap-3">
        ActionManageScreenFile
        <Button
          color="danger"
          size="lg"
          variant="faded"
          onClick={handleBackClick}
        >
          Назад
        </Button>
      </div>
    );
  },
);
