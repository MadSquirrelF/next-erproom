"use client";

import { memo, useCallback } from "react";

import { IOrgschemaMenuSection } from "../../OrgschemaMenu/model/store/orgschemaMenu";

import { OrgschemaStartBg } from "@/src/shared/assets/OrgschemaStartBg/OrgschemaStartBg";
import { subtitle, title } from "@/components/primitives";
import { RoutesStartBg } from "@/src/shared/assets/RoutesStartBg/RoutesStartBg";
import { OrgschemaChooseBg } from "@/src/shared/assets/OrgschemaChooseBg/OrgschemaChooseBg";

interface OrgschemaStartProps {
  className?: string;
  titleText: string;
  description: string;
  background: IOrgschemaMenuSection;
}

export const OrgschemaStart = memo((props: OrgschemaStartProps) => {
  const { background, titleText, description } = props;

  const renderBackground = useCallback((background: IOrgschemaMenuSection) => {
    switch (background) {
      case IOrgschemaMenuSection.SCHEMAS:
        return (
          <OrgschemaStartBg className="flex-none text-primary" size={500} />
        );
      case IOrgschemaMenuSection.ROUTES:
        return <RoutesStartBg className="flex-none text-primary" size={500} />;
      default:
        return (
          <OrgschemaChooseBg className="flex-none text-primary" size={500} />
        );
    }
  }, []);

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
