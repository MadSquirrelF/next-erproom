"use client";

import { memo } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";

import { OrgschemaInfo } from "../OrgschemaInfo/OrgschemaInfo";
import { OrgschemaZoom } from "../OrgschemaZoom/OrgschemaZoom";
import { useBoard } from "../../model/hooks/useBoard";

import { InfoIcon, ZoomInIcon } from "@/src/shared/assets/icons";
import { SchemaTree } from "@/src/entities/Schema/ui/SchemaTree/SchemaTree";
import { OrgschemaStart } from "@/src/features/OrgschemaStart/ui/OrgschemaStart";
import { Loader } from "@/src/shared/ui/Loader/Loader";
import { SkeletonTree } from "@/src/entities/Schema/ui/SkeletonTree/SkeletonTree";

export const OrgschemaBoard = memo(() => {
  const { schema, isLoading, isError, error } = useBoard();

  if (isLoading) {
    return (
      <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
        <div className="absolute top-2 z-10 left-2 flex flex-row gap-2">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <Skeleton className="w-9 h-9 rounded-lg" />
        </div>
        <CardBody className="relative">
          <Loader classname="absolute left-2 z-10 top-16" />

          <SkeletonTree />
        </CardBody>
      </Card>
    );
  }

  if (isError && error) {
    return (
      <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
        <CardBody className="relative">
          <OrgschemaStart
            background={"error"}
            description={error.message}
            titleText="Ошибка загрузки оргсхемы"
          />
        </CardBody>
      </Card>
    );
  }

  if (!schema) {
    return (
      <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
        <CardBody className="relative">
          <OrgschemaStart
            background={"schema"}
            description="Схема организации — это визуальное представление структуры компании,
          демонстрирующее иерархию и взаимосвязи между различными отделами и
          сотрудниками. Она помогает понять распределение ролей и
          обязанностей, а также облегчает процесс коммуникации внутри
          организации. Используя данную схему, вы сможете быстро
          ориентироваться в структуре компании, выявлять ключевых сотрудников
          и их функции, а также эффективно планировать ресурсы и управлять
          проектами."
            titleText="Схема организации"
          />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
      <div className="absolute top-2 left-2 flex flex-row gap-2">
        <Popover showArrow offset={20} placement="bottom-start">
          <PopoverTrigger>
            <Button isIconOnly color="primary" size="lg" variant="light">
              <InfoIcon size={40} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">
            <OrgschemaInfo
              createdAt={schema.created_at}
              name={schema.name}
              updatedAt={schema.updated_at}
            />
          </PopoverContent>
        </Popover>
        <Popover showArrow offset={20} placement="bottom-start">
          <PopoverTrigger>
            <Button isIconOnly color="primary" size="lg" variant="light">
              <ZoomInIcon size={40} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">
            <OrgschemaZoom />
          </PopoverContent>
        </Popover>
      </div>

      <CardBody className="relative">
        <SchemaTree schema={schema} />
      </CardBody>
    </Card>
  );
});
