"use client";

import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Card, CardBody } from "@nextui-org/card";

import {
  IOrgschemaMenuSection,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { OrgschemaStart } from "@/src/features/OrgschemaStart/ui/OrgschemaStart";
import { SchemaTree } from "@/src/entities/Schema/ui/SchemaTree/SchemaTree";

interface OrgschemaBoardProps {
  className?: string;
}

export const OrgschemaBoard = memo((props: OrgschemaBoardProps) => {
  const { className } = props;

  const currentSection = useOrgschemaMenu((state) => state.currentSection);

  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);
  const currentRoute = useOrgschemaMenu((state) => state.currentRoute);

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
    <Card className="overflow-x-auto overflow-y-auto w-full  relative h-full items-center">
      <CardBody>
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
