import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { memo } from "react";

import { subtitle } from "@/components/primitives";

interface SkeletonNodeProps {
  className?: string;
}

export const SkeletonNode = memo((props: SkeletonNodeProps) => {
  const { className } = props;

  return (
    <Card
      className={`relative bg-default-200 z-10 select-none overflow-visible  h-72 w-96 mb-2`}
    >
      <CardBody className="flex p-2 flex-row gap-2">
        {/* Контент вертикальный */}
        <div className="flex flex-col flex-grow w-full gap-2">
          {/* Текст */}

          <Card
            fullWidth
            isPressable
            className="relative flex flex-grow z-10 gap-3"
          >
            <CardBody className="flex flex-col gap-1">
              <Skeleton className="w-1/2 h-7 rounded-lg" />
              <Skeleton className="w-full h-5 rounded-lg" />
              <Skeleton className="w-full h-5 rounded-lg" />
            </CardBody>
          </Card>

          {/* Пользователи */}
          <Card fullWidth>
            <CardBody className="flex flex-row gap-3 items-end justify-between">
              <div className="flex flex-col gap-2">
                <p
                  className={subtitle({
                    size: "tiny",
                    color: "default",
                  })}
                >
                  Сотрудники:
                </p>
                <Skeleton className="w-full h-6 rounded-lg" />
              </div>
            </CardBody>
          </Card>

          {/* ЦКП */}
          <Card fullWidth className="flex-grow">
            <CardBody className="flex flex-row gap-2 flex-none items-start">
              <p
                className={subtitle({
                  size: "sm",
                  color: "default",
                })}
              >
                ЦКП:
              </p>
              <Skeleton className="w-full h-5 rounded-lg" />
            </CardBody>
          </Card>
        </div>
        {/* Конец контент вертикальный */}
        {/* Кнопки */}
        <Card>
          <CardBody className="flex flex-col gap-5 items-center justify-start overflow-hidden">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-lg" />
          </CardBody>
        </Card>
        {/* Конец Кнопки */}
      </CardBody>
    </Card>
  );
});
