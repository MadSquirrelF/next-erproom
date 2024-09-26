"use client";

import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Card, CardBody } from "@nextui-org/card";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

import { OrgschemaInfo } from "../OrgschemaInfo/OrgschemaInfo";
import { OrgschemaZoom } from "../OrgschemaZoom/OrgschemaZoom";

import {
  IOrgschemaMenuSection,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { OrgschemaStart } from "@/src/features/OrgschemaStart/ui/OrgschemaStart";
import { SchemaTree } from "@/src/entities/Schema/ui/SchemaTree/SchemaTree";
import { InfoIcon, MenuIcon, ZoomInIcon } from "@/src/shared/assets/icons";

interface OrgschemaBoardProps {
  className?: string;
}

export const OrgschemaBoard = memo((props: OrgschemaBoardProps) => {
  const { className } = props;

  const currentSection = useOrgschemaMenu((state) => state.currentSection);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const setIsMenuCollapsed = useOrgschemaMenu(
    (state) => state.setIsMenuCollapsed,
  );
  const isMenuCollapsed = useOrgschemaMenu((state) => state.isMenuCollapsed);
  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);
  const currentRoute = useOrgschemaMenu((state) => state.currentRoute);
  const orgboardIsLoading = useOrgschemaMenu(
    (state) => state.orgboardIsLoading,
  );
  const renderBlock = useCallback(
    (currentSection: IOrgschemaMenuSection) => {
      switch (currentSection) {
        case IOrgschemaMenuSection.SCHEMAS:
          if (loadedSchema) {
            return <SchemaTree />;
          }

          return (
            <OrgschemaStart
              background={IOrgschemaMenuSection.SCHEMAS}
              description="Схема организации — это визуальное представление структуры компании,
            демонстрирующее иерархию и взаимосвязи между различными отделами и
            сотрудниками. Она помогает понять распределение ролей и
            обязанностей, а также облегчает процесс коммуникации внутри
            организации. Используя данную схему, вы сможете быстро
            ориентироваться в структуре компании, выявлять ключевых сотрудников
            и их функции, а также эффективно планировать ресурсы и управлять
            проектами."
              titleText="Схема организации"
            />
          );
        case IOrgschemaMenuSection.ROUTES:
          if (currentRoute) {
            return <SchemaTree />;
          }

          return (
            <OrgschemaStart
              background={IOrgschemaMenuSection.ROUTES}
              description="Маршруты заявлений и документов — это визуальное представление процессов обработки заявлений и документов внутри организации.Данная схема демонстрирует последовательность шагов, которые проходят документы от момента их подачи до окончательного решения. Она помогает понять, кто отвечает за каждый этап обработки, а также какие взаимосвязи существуют между различными подразделениями."
              titleText="Маршруты заявлений"
            />
          );
        default:
          return (
            <OrgschemaStart
              background={IOrgschemaMenuSection.NONE}
              description="Пожалуйста, выберите одну из доступных секций в меню справа, чтобы получить доступ к интересующей вас информации. Каждая секция содержит полезные данные и инструменты, которые помогут вам эффективно использовать наш веб-приложение. ->"
              titleText="Выбор секции"
            />
          );
      }
    },
    [currentRoute, loadedSchema],
  );

  return (
    <Card className="overflow-x-auto overflow-y-auto w-full relative h-full items-center transition-all">
      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={loadedSchema !== undefined}
        timeout={300}
      >
        <div className="absolute top-2 left-2">
          <Popover showArrow offset={20} placement="bottom-start">
            <PopoverTrigger>
              <Button isIconOnly color="primary" size="lg" variant="light">
                <InfoIcon size={40} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-3">
              <OrgschemaInfo />
            </PopoverContent>
          </Popover>
        </div>
      </CSSTransition>

      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={loadedSchema !== undefined}
        timeout={300}
      >
        <div className="absolute top-2 right-20">
          <Popover showArrow offset={20} placement="bottom-end">
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
      </CSSTransition>

      <Tooltip color="primary" content="Меню" placement="bottom">
        <Button
          isIconOnly
          className="absolute top-2 z-30 right-4"
          color="primary"
          size="lg"
          variant="light"
          onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
        >
          <MenuIcon size={40} />
        </Button>
      </Tooltip>

      <CardBody className="relative">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentSection}
            unmountOnExit
            classNames="fade"
            timeout={300}
          >
            {renderBlock(currentSection)}
          </CSSTransition>
        </SwitchTransition>
      </CardBody>
    </Card>
  );
});
