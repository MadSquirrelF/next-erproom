import { memo } from "react";

interface DocFieldsProps {
  className?: string;
}

export const DocFields = memo((props: DocFieldsProps) => {
  const { className } = props;

  return <div>DocFields</div>;
});
