"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import React, { ReactNode } from "react";

export interface IBreadcrumbItem {
  startContent: ReactNode;
  text: string;
  href: string;
}

interface IBreadcrumbsClient {
  items: IBreadcrumbItem[];
  size: "sm" | "md" | "lg" | undefined;
}

const BreadcrumbsClient = (props: IBreadcrumbsClient) => {
  const { items, size } = props;

  return (
    <div>
      <Breadcrumbs size={size} variant="solid">
        {items.map((item, index) => {
          return (
            <BreadcrumbItem
              key={index}
              href={item.href}
              startContent={item.startContent}
            >
              {item.text}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsClient;
