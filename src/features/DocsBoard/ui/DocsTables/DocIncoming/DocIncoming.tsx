import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { memo } from "react";

import { OutgoingArrayFields } from "../../../model/data/docs";

import { TableMenu } from "@/src/entities/Table/ui/TableMenu/TableMenu";
import { TableFooter } from "@/src/entities/Table/ui/TableFooter/TableFooter";

interface DocIncomingProps {
  className?: string;
}

export const DocIncoming = memo((props: DocIncomingProps) => {
  const { className } = props;

  return (
    <Table
      fullWidth
      isHeaderSticky
      isStriped
      aria-label="Таблица входящих документов"
      bottomContent={<TableFooter />}
      classNames={{
        base: "h-full pb-4",
        table: "h-full",
        wrapper: "h-full",
      }}
      topContent={<TableMenu title="Входящие документы" />}
    >
      <TableHeader>
        {OutgoingArrayFields.map((column, index) => (
          <TableColumn
            key={index}
            align={column === "Действия" ? "end" : "start"}
          >
            {column}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
          <TableCell>Тест</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});
