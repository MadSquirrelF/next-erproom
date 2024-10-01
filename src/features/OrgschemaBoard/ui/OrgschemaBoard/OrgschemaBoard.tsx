"use client";

import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { SchemaBoard } from "../SchemaBoard/SchemaBoard";
import { RoutesBoard } from "../RoutesBoard/RoutesBoard";

import {
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { OrgschemaStart } from "@/src/features/OrgschemaStart/ui/OrgschemaStart";

export const OrgschemaBoard = memo(() => {
  const currentStep = useOrgschemaMenu((state) => state.currentStep);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const renderBoard = useCallback(
    (currentStep: IOrgschemaMenuSteps) => {
      switch (currentStep) {
        case IOrgschemaMenuSteps.LIST:
          return (
            <OrgschemaStart
              background={"schema"}
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
        case IOrgschemaMenuSteps.MANAGE:
          return <SchemaBoard />;

        case IOrgschemaMenuSteps.ROUTES:
          return <RoutesBoard />;

        default:
          return (
            <OrgschemaStart
              background={"schema"}
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
      }
    },
    [currentStep, activeSchemaId],
  );

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={currentStep}
        unmountOnExit
        classNames="fade"
        timeout={300}
      >
        {renderBoard(currentStep)}
      </CSSTransition>
    </SwitchTransition>
  );
});
