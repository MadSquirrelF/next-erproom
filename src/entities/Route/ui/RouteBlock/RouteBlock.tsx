import { memo } from "react";
import { CSSTransition } from "react-transition-group";

import { IFlowStep } from "../../model/types/route";

import styles from "./RouteBlock.module.scss";

import { Node } from "@/src/entities/Node";

interface RouteBlockProps {
  className?: string;
  routeFlow: IFlowStep;
}

export const RouteBlock = memo((props: RouteBlockProps) => {
  const { className, routeFlow } = props;

  return (
    <li className={styles.item}>
      <Node isDisabled node={routeFlow.before_block} />

      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={routeFlow.all_flow_step_next.length === 0}
        timeout={300}
      >
        <div className={styles.list}>
          <Node isDisabled node={routeFlow.after_block} />
        </div>
      </CSSTransition>

      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={routeFlow.all_flow_step_next.length > 0}
        timeout={300}
      >
        <ul className={styles.list}>
          {routeFlow.all_flow_step_next.map((step) => (
            <RouteBlock key={step.id} routeFlow={step} />
          ))}
        </ul>
      </CSSTransition>
    </li>
  );
});
