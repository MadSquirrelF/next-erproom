"use client";
import { memo } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./SchemaBlock.module.scss";

import { INode, Node } from "@/src/entities/Node";
import { classNames, Mods } from "@/src/shared/utils/classNames/classNames";

interface SchemaBlockProps {
  className?: string;
  block: INode;
}

export const SchemaBlock = memo((props: SchemaBlockProps) => {
  const { className, block } = props;

  const verticalMod: Mods = {
    [styles.vertical]: block.setting.is_together,
  };

  return (
    <li className={classNames(styles.item, verticalMod, [])}>
      <Node node={block} />

      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={block.all_children_blocks.length > 0}
        timeout={300}
      >
        <ul className={styles.list}>
          {block.all_children_blocks.map((item) => (
            <SchemaBlock
              key={item.id}
              block={
                item.setting.color_block === "#f" ||
                item.setting.color_block === null
                  ? {
                      ...item,
                      setting: {
                        id: item.setting.id,
                        orgboard_block_id: item.setting.orgboard_block_id,
                        is_together: item.setting.is_together,
                        color_block: block.setting.color_block,
                        color_branch: item.setting.color_branch,
                        sort: item.setting.sort,
                      },
                    }
                  : item
              }
            />
          ))}
        </ul>
      </CSSTransition>
    </li>
  );
});
