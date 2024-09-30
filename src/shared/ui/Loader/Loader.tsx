import clsx from "clsx";
import { memo } from "react";

interface ILoaderProps {
  classname?: string;
}

export const Loader = memo((props: ILoaderProps) => {
  const { classname } = props;

  return (
    <div
      className={clsx("h-20 w-20 flex items-center justify-center", classname)}
    >
      <span className="relative w-[78px] h-[78px] rounded-full box-border bg-white border-[8px] border-default dark:border-white overflow-hidden after:content-[''] after:absolute after:left-0 after:top-[-50%] after:w-full after:h-full after:bg-default after:z-10 after:border-b-[8px] after:border-black after:animate-eyeShade before:content-[''] before:absolute before:left-[20px] before:bottom-[15px] before:w-[32px] before:z-[2] before:h-[32px] before:bg-[#111] before:rounded-full before:animate-eyeMove" />
    </div>
  );
});
