import { memo } from "react";

import { DocsTabs } from "../DocsTabs/DocsTabs";
import { DocsTables } from "../DocsTables/DocsTables";

interface DocsBoardProps {
  className?: string;
}

export const DocsBoard = memo((props: DocsBoardProps) => {
  const { className } = props;

  return (
    <div className="relative w-full h-full flex flex-col gap-5">
      <DocsTabs />

      <DocsTables />
    </div>
  );
});
