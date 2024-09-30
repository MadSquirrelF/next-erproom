"use client";
import { memo } from "react";

import { SchemaBlock } from "../SchemaBlock/SchemaBlock";
import { ISchema } from "../../model/types/schema";

import { subtitle, title } from "@/components/primitives";
import { useOrgschemaBoardStore } from "@/src/features/OrgschemaBoard/model/store/orgschemaBoardStore";

interface SchemaTreeProps {
  schema: ISchema;
}

export const SchemaTree = memo((props: SchemaTreeProps) => {
  const { schema } = props;

  const zoomCount = useOrgschemaBoardStore((state) => state.zoomCount);

  if (!schema.blocks || schema.blocks.length === 0) {
    return (
      <div className="flex items-center flex-col justify-center w-full h-full text-center">
        <h5
          className={title({
            size: "sm",
            color: "blue",
          })}
        >
          Блоки не найдены.
        </h5>
        <p className={subtitle()}>
          Создайте блок, чтобы отобразить его на схеме.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="relative"
      style={{
        transform: `scale(${zoomCount})`,
        transformOrigin: "top left",
        transition: "transform 0.2s",
      }}
    >
      <SchemaBlock block={schema.blocks[0]} />
    </ul>
  );
});
