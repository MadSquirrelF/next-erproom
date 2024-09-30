"use client";
import { Button } from "@nextui-org/button";
import { memo } from "react";

import { useOrgschemaBoardStore } from "../../model/store/orgschemaBoardStore";

import { ZoomInIcon, ZoomOutIcon } from "@/src/shared/assets/icons";

interface OrgschemaZoomProps {
  className?: string;
}

export const OrgschemaZoom = memo((props: OrgschemaZoomProps) => {
  const { className } = props;

  const zoomCount = useOrgschemaBoardStore((state) => state.zoomCount);
  const setZoomCount = useOrgschemaBoardStore((state) => state.setZoomCount);
  const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

  const handleZoomIn = () => {
    if (zoomCount >= 2) {
      return;
    }
    const newZoomCount = roundToTwoDecimals(zoomCount + 0.2);

    setZoomCount(Math.min(newZoomCount, 2));
  };

  const handleZoomOut = () => {
    if (zoomCount <= 0.5) {
      return;
    }
    const newZoomCount = roundToTwoDecimals(zoomCount - 0.1);

    setZoomCount(Math.max(newZoomCount, 0.5));
  };

  return (
    <div className="flex flex-col gap-3 justify-center item-center">
      <h4 className="w-full text-center font-bold">Zoom схемы</h4>
      <div className="flex flex-row gap-1 items-center">
        <Button
          isIconOnly
          color="primary"
          isDisabled={zoomCount === 2}
          size="lg"
          variant="light"
          onClick={handleZoomIn}
        >
          <ZoomInIcon size={40} />
        </Button>

        <p className="font-bold text-lg select-none w-14 text-center">
          {zoomCount}x
        </p>

        <Button
          isIconOnly
          color="primary"
          isDisabled={zoomCount === 0.5}
          size="lg"
          variant="light"
          onClick={handleZoomOut}
        >
          <ZoomOutIcon size={40} />
        </Button>
      </div>
    </div>
  );
});
