"use client";
import { Button } from "@nextui-org/button";
import { memo } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Chip, cn, Divider } from "@nextui-org/react";

import {
  IOrgschemaMenuSection,
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";

import { ArrowRightIcon } from "@/src/shared/assets/icons";
import { OrgschemaStartBg } from "@/src/shared/assets/OrgschemaStartBg/OrgschemaStartBg";
import { RoutesStartBg } from "@/src/shared/assets/RoutesStartBg/RoutesStartBg";

export const OrgschemaMenuSection = memo(() => {
  const setStep = useOrgschemaMenu((state) => state.setStep);
  const currentSection = useOrgschemaMenu((state) => state.currentSection);

  const setSection = useOrgschemaMenu((state) => state.setSection);

  const handleSectionChange = (section: IOrgschemaMenuSection) => {
    if (currentSection === section) {
      setSection(IOrgschemaMenuSection.NONE);
    } else {
      setSection(section);
    }
  };

  const handleContinue = () => {
    setStep(IOrgschemaMenuSteps.LIST);
  };

  return (
    <form className="h-full flex flex-col justify-between">
      <div className="flex flex-col w-full  gap-6">
        <Checkbox
          classNames={{
            base: cn(
              "inline-flex w-full max-w-md bg-content1",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary",
            ),
            label: "w-full text-primary",
          }}
          isSelected={currentSection === IOrgschemaMenuSection.SCHEMAS}
          onValueChange={() =>
            handleSectionChange(IOrgschemaMenuSection.SCHEMAS)
          }
        >
          <div className="w-full flex flex-col items-center gap-3 p-5 rounded-xl">
            <OrgschemaStartBg
              className={`${currentSection === IOrgschemaMenuSection.SCHEMAS ? "text-primary" : "text-default"} transition-all`}
              size={200}
            />
            <Chip
              color={`${currentSection === IOrgschemaMenuSection.SCHEMAS ? "primary" : "default"}`}
              size="lg"
              variant="dot"
            >
              Оргсхема
            </Chip>
          </div>
        </Checkbox>

        <Divider />
        <Checkbox
          classNames={{
            base: cn(
              "inline-flex w-full max-w-md bg-content1",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary",
            ),
            label: "w-full text-primary",
          }}
          isSelected={currentSection === IOrgschemaMenuSection.ROUTES}
          onValueChange={() =>
            handleSectionChange(IOrgschemaMenuSection.ROUTES)
          }
        >
          <div className="w-full flex flex-col items-center gap-3 p-5 rounded-xl">
            <RoutesStartBg
              className={`${currentSection === IOrgschemaMenuSection.ROUTES ? "text-primary" : "text-default"} transition-all`}
              size={200}
            />
            <Chip
              color={`${currentSection === IOrgschemaMenuSection.ROUTES ? "primary" : "default"}`}
              size="lg"
              variant="dot"
            >
              Маршруты
            </Chip>
          </div>
        </Checkbox>
      </div>
      <Button
        color="primary"
        endContent={<ArrowRightIcon size={30} />}
        isDisabled={currentSection === IOrgschemaMenuSection.NONE}
        size="lg"
        onClick={handleContinue}
      >
        Продолжить
      </Button>
    </form>
  );
});
