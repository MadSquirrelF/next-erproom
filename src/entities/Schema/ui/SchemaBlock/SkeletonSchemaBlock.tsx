import { memo } from "react";

import { ISkeletonSchamaBlock } from "../../model/data/data";

import styles from "./SchemaBlock.module.scss";

import { classNames } from "@/src/shared/utils/classNames/classNames";
import { SkeletonNode } from "@/src/entities/Node/ui/Node/SkeletonNode";

interface SkeletonSchemaBlockProps {
  className?: string;
  block: ISkeletonSchamaBlock;
}

export const SkeletonSchemaBlock = memo((props: SkeletonSchemaBlockProps) => {
  const { className, block } = props;

  return (
    <li className={classNames(styles.item, {}, [])}>
      <SkeletonNode />
      <ul className={styles.list}>
        {block.children &&
          block.children.length !== 0 &&
          block.children.map((item) => (
            <SkeletonSchemaBlock key={item.id} block={item} />
          ))}
      </ul>
    </li>
  );
});
