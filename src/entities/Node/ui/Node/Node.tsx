"use client";
import { Card, CardBody } from "@nextui-org/card";
import { memo, useState } from "react";
import { Button } from "@nextui-org/button";

import { subtitle, title } from "@/components/primitives";
import {
  AddIcon,
  AllUsersIcon,
  CloudFolderIcon,
  EditIcon,
  EyeOpenedIcon,
  MailIcon,
  PaperClipIcon,
  SettingsIcon,
  TreeClosedIcon,
} from "@/src/shared/assets/icons";

interface NodeProps {
  className?: string;
}

export const Node = memo((props: NodeProps) => {
  const { className } = props;

  const [selected, setSelected] = useState(false);

  return (
    <Card
      className={`relative bg-default-200 overflow-visible ${selected ? "outline-2 outline-primary" : "outline-none"} h-auto w-96 pb-4 mb-8`}
    >
      <CardBody className="flex flex-row gap-3">
        <div className="flex flex-col justify-between gap-3">
          <Card
            isPressable
            className="relative w-full z-10  gap-3 h-full"
            onClick={() => setSelected(!selected)}
          >
            <CardBody className="flex flex-col gap-2">
              <h4
                className={title({
                  size: "tiny",
                })}
              >
                IT Cхема
              </h4>
              <p
                className={subtitle({
                  size: "tiny",
                  lineCamp: "one",
                })}
              >
                Производство IT продуктов
              </p>
            </CardBody>
          </Card>
          <Button
            className="flex-none"
            color="primary"
            startContent={<AllUsersIcon />}
          >
            Добавить сотрудников
          </Button>

          <Card fullWidth className="flex-none">
            <CardBody className="flex flex-row gap-2 flex-none items-center">
              <p
                className={subtitle({
                  size: "sm",
                  color: "default",
                })}
              >
                ЦКП:
              </p>
              <p
                className={subtitle({
                  size: "tiny",
                  lineCamp: "one",
                })}
              >
                Тут будет цкп для данного блока
              </p>
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardBody className="flex flex-col gap-2 items-center justify-start overflow-hidden">
            <Button isIconOnly color="primary" size="sm" variant="flat">
              <EditIcon size={20} />
            </Button>
            <Button isIconOnly color="primary" size="sm" variant="flat">
              <PaperClipIcon size={20} />
            </Button>
            <Button isIconOnly color="primary" size="sm" variant="flat">
              <SettingsIcon size={20} />
            </Button>
            <Button isIconOnly color="primary" size="sm" variant="flat">
              <MailIcon size={20} />
            </Button>
            <Button isIconOnly color="primary" size="sm" variant="flat">
              <CloudFolderIcon size={20} />
            </Button>
          </CardBody>
        </Card>
      </CardBody>
      <div className="absolute -bottom-4 right-32 flex flex-row gap-3">
        <Button isIconOnly color="primary" radius="full" size="sm">
          <AddIcon />
        </Button>
        <Button isIconOnly color="primary" radius="full" size="sm">
          <EyeOpenedIcon />
        </Button>
        <Button isIconOnly color="primary" radius="full" size="sm">
          <TreeClosedIcon />
        </Button>
      </div>
    </Card>
  );
});
