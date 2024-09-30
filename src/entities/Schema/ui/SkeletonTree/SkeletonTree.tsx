import { memo } from "react";

import { SkeletonSchemaBlock } from "../SchemaBlock/SkeletonSchemaBlock";
import { skeletonDataSchema } from "../../model/data/data";

import { useOrgschemaBoardStore } from "@/src/features/OrgschemaBoard/model/store/orgschemaBoardStore";

interface SkeletonTreeProps {
  className?: string;
}

export const SkeletonTree = memo((props: SkeletonTreeProps) => {
  const { className } = props;
  const zoomCount = useOrgschemaBoardStore((state) => state.zoomCount);

  return (
    <ul
      style={{
        transform: `scale(${zoomCount})`,
        transformOrigin: "top left",
        transition: "transform 0.2s",
      }}
    >
      <SkeletonSchemaBlock block={skeletonDataSchema} />
    </ul>
  );
});
