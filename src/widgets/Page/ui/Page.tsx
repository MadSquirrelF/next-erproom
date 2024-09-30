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
        "flex-grow h-[calc(100vh-65px)] overflow-y-auto px-3 z-10 pt-3",
        classname,
      )}
    >
      {children}
    </main>
  );
});
