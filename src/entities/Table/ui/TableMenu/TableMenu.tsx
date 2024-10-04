"use client";
import { memo, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { capitalize } from "lodash";

import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  statusOptions,
} from "../../model/data/table";

import { TableSearch } from "./TableSearch/TableSearch";

import { AddIcon, ChevronDownIcon } from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";

interface TableMenuProps {
  className?: string;
  title: string;
}

export const TableMenu = memo((props: TableMenuProps) => {
  const { className, title } = props;

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-row items-center jus w-full gap-3  justify-between">
        <div className="flex flex-row items-center gap-4">
          <TableSearch value={""} onChange={() => {}} />
          <h3 className="text-lg flex-none">{title}</h3>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Dropdown size="lg">
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="lg"
                variant="flat"
              >
                Статус
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown size="lg">
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="lg"
                variant="flat"
              >
                Колонки
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" endContent={<AddIcon />} size="lg">
            Создать документ
          </Button>
        </div>
      </div>
      <div className="flex flex-row  w-full gap-3  items-center justify-between">
        <span
          className={subtitle({
            size: "tiny",
          })}
        >
          Всего 20 документов
        </span>

        <span
          className={subtitle({
            size: "tiny",
          })}
        >
          Строчек на страницу: 5
        </span>
      </div>
    </div>
  );
});
