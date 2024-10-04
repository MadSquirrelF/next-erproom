"use client";
import { Input } from "@nextui-org/input";
import { ChangeEventHandler, memo } from "react";

import { SearchIcon } from "@/src/shared/assets/icons";

interface TableSearchProps {
  className?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const TableSearch = memo((props: TableSearchProps) => {
  const { className, value, onChange } = props;

  return (
    <Input
      placeholder="Искать по названию..."
      size="lg"
      startContent={<SearchIcon />}
      value={value}
      variant="flat"
      onChange={onChange}
    />
  );
});
