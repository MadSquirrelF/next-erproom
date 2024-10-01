import { memo } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";

import { useRoutes } from "../../model/hooks/useRoutes";
import { OrgschemaInfo } from "../OrgschemaInfo/OrgschemaInfo";
import { OrgschemaZoom } from "../OrgschemaZoom/OrgschemaZoom";

import { SkeletonTree } from "@/src/entities/Schema/ui/SkeletonTree/SkeletonTree";
import { OrgschemaStart } from "@/src/features/OrgschemaStart/ui/OrgschemaStart";
import { RouteTree } from "@/src/entities/Route/ui/RouteTree/RouteTree";
import { InfoIcon, ZoomInIcon } from "@/src/shared/assets/icons";

interface RoutesBoardProps {
  className?: string;
}

export const RoutesBoard = memo((props: RoutesBoardProps) => {
  const { className } = props;

  const { route, isLoading, isError, error } = useRoutes();

  if (isLoading) {
    return (
      <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
        <CardBody className="relative">
          <SkeletonTree />
        </CardBody>
      </Card>
    );
  }

  if (isError && error) {
    return (
      <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
        <CardBody className="relative">
          <OrgschemaStart
            background={"error"}
            description={`${error.message} (Возможно ошибка связана с тем, что кто-то удалил маршрут, а ID маршрута все еще сохранен у вас в браузере)`}
            titleText="Ошибка загрузки маршрута"
          />
        </CardBody>
      </Card>
    );
  }

  if (!route) {
    return (
      <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
        <CardBody className="relative">
          <OrgschemaStart
            background={"route"}
            description="Модуль дерева маршрутов документов предназначен для оптимизации обработки документов в организации. Он предоставляет структурированное представление маршрутов, позволяя легко отслеживать и настраивать процесс передачи документов между отделениями. Модуль автоматизирует маршрутизацию, снижая вероятность ошибок и ускоряя обработку. Пользователи могут отслеживать статусы документов, получать уведомления о новых поступлениях и напоминания о сроках. Интеграция с другими системами обеспечивает дополнительную эффективность и контроль, что делает модуль важным инструментом для улучшения документооборота и взаимодействия внутри компании."
            titleText="Маршруты документов"
          />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="overflow-x-auto box-border overflow-y-auto max-w-full w-full relative h-full items-center transition-all">
      <div className="absolute top-2 left-2 flex flex-row gap-2">
        <Popover showArrow offset={20} placement="bottom-start">
          <PopoverTrigger>
            <Button isIconOnly color="primary" size="lg" variant="light">
              <InfoIcon size={40} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">
            <OrgschemaInfo
              createdAt={route.created_at}
              description={route.description}
              name={route.name}
              updatedAt={route.updated_at}
            />
          </PopoverContent>
        </Popover>
        <Popover showArrow offset={20} placement="bottom-start">
          <PopoverTrigger>
            <Button isIconOnly color="primary" size="lg" variant="light">
              <ZoomInIcon size={40} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">
            <OrgschemaZoom />
          </PopoverContent>
        </Popover>
      </div>
      <CardBody className="relative flex flex-row items-center">
        <RouteTree route={route} />
      </CardBody>
    </Card>
  );
});
