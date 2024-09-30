"use client";

import { memo, useCallback } from "react";

import { OrgschemaStartBg } from "@/src/shared/assets/OrgschemaStartBg/OrgschemaStartBg";
import { subtitle, title } from "@/components/primitives";
import { RoutesStartBg } from "@/src/shared/assets/RoutesStartBg/RoutesStartBg";
import { OrgschemaChooseBg } from "@/src/shared/assets/OrgschemaChooseBg/OrgschemaChooseBg";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";

interface OrgschemaStartProps {
  className?: string;
  titleText: string;
  description: string;
  background: "schema" | "route" | "error";
}

export const OrgschemaStart = memo((props: OrgschemaStartProps) => {
  const { background, titleText, description } = props;

  const renderBackground = useCallback(
    (background: "schema" | "route" | "error") => {
      switch (background) {
        case "schema":
          return (
            <OrgschemaStartBg className="flex-none text-primary" size={500} />
          );
        case "route":
          return (
            <RoutesStartBg className="flex-none text-primary" size={500} />
          );
        case "error":
          return <ErrorBg className="flex-none text-danger" size={500} />;
        default:
          return (
            <OrgschemaChooseBg className="flex-none text-primary" size={500} />
          );
      }
    },
    [],
  );

  return (
    <div className="w-full h-full flex flex-row items-center gap-4">
      {renderBackground(background)}

      <div className="flex flex-col gap-4">
        <h3 className={title()}>{titleText}</h3>
        <p
          className={subtitle({
            mb: "md",
          })}
        >
          {description}
        </p>
      </div>
    </div>
  );
});
