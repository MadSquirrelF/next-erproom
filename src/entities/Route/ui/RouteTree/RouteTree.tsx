"use client";
import { memo } from "react";

import { IRoute } from "../../model/types/route";
import { RouteBlock } from "../RouteBlock/RouteBlock";

import { useOrgschemaBoardStore } from "@/src/features/OrgschemaBoard/model/store/orgschemaBoardStore";
import { subtitle, title } from "@/components/primitives";

interface RouteTreeProps {
  className?: string;
  route: IRoute;
}

export const RouteTree = memo((props: RouteTreeProps) => {
  const { className, route } = props;

  const zoomCount = useOrgschemaBoardStore((state) => state.zoomCount);

  if (!route.flowSteps || route.flowSteps.length === 0) {
    return (
      <div className="flex items-center flex-col justify-center w-full h-full text-center">
        <h5
          className={title({
            size: "sm",
            color: "blue",
          })}
        >
          Шаги маршрута не найдены.
        </h5>
        <p className={subtitle()}>
          Создайте шаги, чтобы отобразить их на маршруте.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="relative flex flex-row items-center"
      style={{
        transform: `scale(${zoomCount})`,
        transformOrigin: "left center",
        transition: "transform 0.2s",
      }}
    >
      <RouteBlock routeFlow={route.flowSteps[0]} />
    </ul>
  );
});
