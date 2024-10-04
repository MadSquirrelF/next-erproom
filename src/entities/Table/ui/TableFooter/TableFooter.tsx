"use client";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { memo } from "react";

interface TableFooterProps {
  className?: string;
}

export const TableFooter = memo((props: TableFooterProps) => {
  const { className } = props;

  return (
    <div className="flex flex-row gap-5 w-full items-center justify-between">
      <span>0 из 20 выбрано</span>

      <Pagination isCompact showControls initialPage={1} total={10} />

      <div className="flex flex-row gap-2">
        <Button variant="flat">Предыдущее</Button>
        <Button variant="flat">Следущее</Button>
      </div>
    </div>
  );
});
