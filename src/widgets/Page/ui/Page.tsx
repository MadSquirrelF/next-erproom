import clsx from "clsx";
import { memo, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  classname?: string;
}

export const Page = memo((props: PageProps) => {
  const { classname, children } = props;

  return (
    <main
      className={clsx(
        "flex-grow h-[calc(100vh-65px)] flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-3 z-10",
        classname,
      )}
    >
      {children}
    </main>
  );
});
