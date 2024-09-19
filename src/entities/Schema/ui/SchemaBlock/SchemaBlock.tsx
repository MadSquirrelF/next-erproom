"use client";
import { memo } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./SchemaBlock.module.scss";

import { INode, Node } from "@/src/entities/Node";

interface SchemaBlockProps {
  className?: string;
  block: INode;
}

export const SchemaBlock = memo((props: SchemaBlockProps) => {
  const { className, block } = props;

  return (
    <li className={styles.item}>
      <Node node={block} />

      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={block.all_children_blocks.length > 0}
        timeout={300}
      >
        <ul className={styles.list}>
          {block.all_children_blocks.map((item) => (
            <SchemaBlock key={item.id} block={item} />
          ))}
        </ul>
      </CSSTransition>
    </li>
  );
});
