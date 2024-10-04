import { memo } from "react";

interface DocAutographProps {
  className?: string;
}

export const DocAutograph = memo((props: DocAutographProps) => {
  const { className } = props;

  return <div>DocAutograph</div>;
});
