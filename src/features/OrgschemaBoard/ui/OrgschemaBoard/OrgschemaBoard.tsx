"use client";

import { Card, CardBody } from "@nextui-org/card";
import { memo, useCallback } from "react";
import { Button } from "@nextui-org/button";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import {
  IOrgschemaMenuSection,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { OrgschemaStart } from "@/src/features/OrgschemaStart/ui/OrgschemaStart";
import { Node } from "@/src/entities/Node/ui/Node/Node";
import { ZoomInIcon, ZoomOutIcon } from "@/src/shared/assets/icons";
import { title } from "@/components/primitives";

interface OrgschemaBoardProps {
  className?: string;
}

export const OrgschemaBoard = memo((props: OrgschemaBoardProps) => {
  const { className } = props;

  const currentSection = useOrgschemaMenu((state) => state.currentSection);

  const currentSchema = useOrgschemaMenu((state) => state.currentSchema);
  const currentRoute = useOrgschemaMenu((state) => state.currentRoute);

  const renderBlock = useCallback(
    (currentSection: IOrgschemaMenuSection) => {
      switch (currentSection) {
        case IOrgschemaMenuSection.SCHEMAS:
          if (currentSchema) {
            return (
              <>
                <Node />
                <div
                  className={`flex z-20 absolute right-5 top-5 flex-row gap-4 items-center`}
                >
                  <Button isIconOnly color="primary">
                    <ZoomInIcon />
                  </Button>
                  <p
                    className={title({
                      size: "tiny",
                      bold: "bold",
                    })}
                  >
                    1x
                  </p>
                  <Button isIconOnly color="primary">
                    <ZoomOutIcon />
                  </Button>
                </div>
              </>
            );
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
            return (
              <>
                <Node />
                <div
                  className={`flex z-20 absolute right-5 top-5 flex-row gap-4 items-center`}
                >
                  <Button isIconOnly color="primary">
                    <ZoomInIcon />
                  </Button>
                  <p
                    className={title({
                      size: "tiny",
                      bold: "bold",
                    })}
                  >
                    1x
                  </p>
                  <Button isIconOnly color="primary">
                    <ZoomOutIcon />
                  </Button>
                </div>
              </>
            );
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
    [currentSchema, currentRoute],
  );

  return (
    <Card className="w-full h-full flex flex-row justify-center">
      <CardBody className="overflow-hidden relative h-full items-center">
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
