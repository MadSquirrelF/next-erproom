"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { memo, useState } from "react";
import { Selection } from "@nextui-org/react";

import {
  IOrgschemaMenuSection,
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";
import { RoutesList, SchemasList } from "../../model/data/data";

import {
  AddIcon,
  CloudActionIcon,
  OrgSchemaIcon,
  RoutesIcon,
  SearchListIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";

interface OrgschemaMenuListProps {
  className?: string;
}

export const OrgschemaMenuList = memo((props: OrgschemaMenuListProps) => {
  const { className } = props;

  const currentSection = useOrgschemaMenu((state) => state.currentSection);

  const setSchema = useOrgschemaMenu((state) => state.setSchema);
  const setStep = useOrgschemaMenu((state) => state.setStep);
  const setRoute = useOrgschemaMenu((state) => state.setRoute);

  const [selectedKeys, setSelectedKeys] = useState<Selection | undefined>();

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  const handleContinue = () => {
    if (selectedKeys !== "all" && selectedKeys) {
      const values = Array.from(selectedKeys).join(", ");

      if (currentSection === IOrgschemaMenuSection.SCHEMAS) {
        setSchema(values[0]);
        setStep(IOrgschemaMenuSteps.MANAGE);

        return;
      }

      setRoute(values[0]);
      setStep(IOrgschemaMenuSteps.MANAGE);

      return;
    }
  };

  return (
    <form className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6">
        <Input
          isClearable
          label="Поиск"
          labelPlacement="outside"
          placeholder={`Искать ${currentSection === IOrgschemaMenuSection.SCHEMAS ? "схему" : "маршрут"} `}
          size="lg"
          startContent={<SearchListIcon className="text-primary" size={30} />}
          type="text"
        />

        <Listbox
          disallowEmptySelection
          aria-label="orgschema list"
          color="primary"
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="faded"
          onSelectionChange={handleSelectionChange}
        >
          {currentSection === IOrgschemaMenuSection.SCHEMAS
            ? SchemasList.map((schema) => (
                <ListboxItem
                  key={schema.name}
                  aria-label={schema.name}
                  startContent={<OrgSchemaIcon size={40} />}
                >
                  <p className={subtitle()}>{schema.name}</p>
                </ListboxItem>
              ))
            : RoutesList.map((route) => (
                <ListboxItem
                  key={route.name}
                  aria-label={route.name}
                  startContent={<RoutesIcon size={40} />}
                >
                  <p className={subtitle()}>{route.name}</p>
                </ListboxItem>
              ))}
        </Listbox>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          color="primary"
          endContent={<AddIcon size={30} />}
          size="lg"
          variant="faded"
        >
          {currentSection === IOrgschemaMenuSection.SCHEMAS
            ? "Создать новую схему"
            : "Создать новый маршрут"}
        </Button>

        <Button
          color="primary"
          endContent={<CloudActionIcon size={30} />}
          isDisabled={!selectedKeys}
          size="lg"
          onClick={handleContinue}
        >
          {currentSection === IOrgschemaMenuSection.SCHEMAS
            ? "Загрузить схему"
            : "Загрузить маршрут"}
        </Button>
      </div>
    </form>
  );
});
