"use client";
import { memo } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { Button } from "@nextui-org/button";

import { Steps } from "../Steps/Steps";
import { IFlowStep } from "../../model/types/route";

import styles from "./FirstStep.module.scss";

import { Node } from "@/src/entities/Node";
import { useOrgschemaMenu } from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { StepIcon } from "@/src/shared/assets/icons";

interface FirstStepProps {
  className?: string;
  routeFlow: IFlowStep;
}

export const FirstStep = memo((props: FirstStepProps) => {
  const { routeFlow } = props;

  const selectedFlowStep = useOrgschemaMenu((state) => state.selectedFlowStep);
  const setSelectedFlowStep = useOrgschemaMenu(
    (state) => state.setSelectedFlowStep,
  );
  const isMenuCollapsed = useOrgschemaMenu((state) => state.isMenuCollapsed);
  const setIsMenuCollapsed = useOrgschemaMenu(
    (state) => state.setIsMenuCollapsed,
  );

  const handleSelectFlowStepById = (id: number) => {
    if (isMenuCollapsed) {
      setIsMenuCollapsed(false);
    }
    if (id === selectedFlowStep?.id) {
      setSelectedFlowStep(undefined);
    } else {
      setSelectedFlowStep(routeFlow);
    }
  };

  return (
    <li className={styles.item}>
      <Node isReadOnly node={routeFlow.before_block} />

      <div className={styles.selectStep}>
        {selectedFlowStep && selectedFlowStep.id === routeFlow.id ? (
          <Button
            className="absolute -bottom-16 left-[20%]"
            color="danger"
            size="sm"
            variant="faded"
            onClick={() => handleSelectFlowStepById(routeFlow.id)}
          >
            Отменить выбор
          </Button>
        ) : (
          <Button
            className="absolute -bottom-16 left-[20%]"
            color="primary"
            size="sm"
            startContent={<StepIcon />}
            variant={"shadow"}
            onClick={() => handleSelectFlowStepById(routeFlow.id)}
          >
            Выбрать шаг
          </Button>
        )}
        <button
          className="w-full h-full"
          type="button"
          onClick={() => handleSelectFlowStepById(routeFlow.id)}
        >
          <div
            className={clsx(styles.line, {
              [styles.active]: selectedFlowStep?.id === routeFlow.id,
            })}
          />
        </button>
      </div>

      <Node isReadOnly node={routeFlow.after_block} />
      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={routeFlow.all_flow_step_next.length !== 0}
        timeout={300}
      >
        <ul>
          <Steps routeFlow={routeFlow.all_flow_step_next[0]} />
        </ul>
      </CSSTransition>
    </li>
  );
});
