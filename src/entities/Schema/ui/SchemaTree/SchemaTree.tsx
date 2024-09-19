import { memo } from "react";

import { SchemaBlock } from "../SchemaBlock/SchemaBlock";

import { useOrgschemaMenu } from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { subtitle, title } from "@/components/primitives";

interface SchemaTreeProps {
  className?: string;
}

export const SchemaTree = memo((props: SchemaTreeProps) => {
  const { className } = props;

  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);

  if (!loadedSchema) {
    return (
      <div className="flex items-center flex-col justify-center w-full h-full text-center">
        <h5
          className={title({
            size: "sm",
            color: "blue",
          })}
        >
          Схема не загружена.
        </h5>
        <p className={subtitle()}>Загрузите схему, чтобы просмотреть блоки.</p>
      </div>
    );
  }

  if (!loadedSchema.blocks || loadedSchema.blocks.length === 0) {
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
    <ul className="relative">
      <SchemaBlock block={loadedSchema.blocks[0]} />
    </ul>
  );
});
