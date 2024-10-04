import { memo } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";

import { subtitle } from "@/components/primitives";
import {
  AllUsersIcon,
  DateCrateIcon,
  DocsIcon,
  DocTextIcon,
  PaperClipIcon,
  TrashIcon,
} from "@/src/shared/assets/icons";

interface DocStatisticsProps {
  className?: string;
}

export const DocStatistics = memo((props: DocStatisticsProps) => {
  const { className } = props;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h3 className={subtitle()}>Статистика</h3>

      <div className="flex flex-col gap-3 w-full h-full">
        <div className="flex flex-row gap-4 h-full justify-between">
          <Card className="w-full">
            <CardHeader className="">
              <h3
                className={subtitle({
                  size: "md",
                  color: "default",
                })}
              >
                Последний отправленый документ
              </h3>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              <div className="flex flex-row gap-3 items-center">
                <DocTextIcon size={40} />
                <span>Название последнего документа</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <DocsIcon size={40} />
                <span>Тип последнего документа</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <AllUsersIcon size={40} />
                <span>Имя пользователя, кому отправлен документ</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <DateCrateIcon size={40} />
                <span>Название последнего документа</span>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full">
            <CardHeader className="">
              <h3
                className={subtitle({
                  size: "md",
                  color: "default",
                })}
              >
                Последний полученный документ
              </h3>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              <div className="flex flex-row gap-3 items-center">
                <DocTextIcon size={40} />
                <span>Название последнего документа</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <DocsIcon size={40} />
                <span>Тип последнего документа</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <AllUsersIcon size={40} />
                <span>Имя пользователя, кому отправлен документ</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <DateCrateIcon size={40} />
                <span>Название последнего документа</span>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full">
            <CardHeader className="">
              <h3
                className={subtitle({
                  size: "md",
                  color: "default",
                })}
              >
                Данные статистики
              </h3>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              <div className="flex flex-row gap-3 items-center">
                <DocTextIcon size={40} />
                <span>Название последнего документа</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <DocsIcon size={40} />
                <span>Тип последнего документа</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <AllUsersIcon size={40} />
                <span>Имя пользователя, кому отправлен документ</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <DateCrateIcon size={40} />
                <span>Название последнего документа</span>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="w-full h-full">
          <CardHeader className="w-full items-center justify-between">
            <h3
              className={subtitle({
                size: "md",
                color: "default",
              })}
            >
              Рабочая папка модуля
            </h3>

            <Button isIconOnly color="primary" variant="solid">
              <PaperClipIcon size={30} />
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="w-full flex flex-row gap-4">
            <Card isFooterBlurred className="border-none h-40 w-40" radius="lg">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://nextui.org/images/card-example-4.jpeg"
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Название файла</p>
                <Button isIconOnly color="danger" size="sm">
                  <TrashIcon />
                </Button>
              </CardFooter>
            </Card>
            <Card isFooterBlurred className="border-none h-40 w-40" radius="lg">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://nextui.org/images/card-example-2.jpeg"
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Название файла</p>
                <Button isIconOnly color="danger" size="sm">
                  <TrashIcon />
                </Button>
              </CardFooter>
            </Card>
            <Card isFooterBlurred className="border-none h-40 w-40" radius="lg">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://nextui.org/images/card-example-3.jpeg"
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Название файла</p>
                <Button isIconOnly color="danger" size="sm">
                  <TrashIcon />
                </Button>
              </CardFooter>
            </Card>
            <Card isFooterBlurred className="border-none h-40 w-40" radius="lg">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://nextui.org/images/card-example-4.jpeg"
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Название файла</p>
                <Button isIconOnly color="danger" size="sm">
                  <TrashIcon />
                </Button>
              </CardFooter>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
});
