import { Button } from "@nextui-org/button";
import { ChangeEvent, FormEvent, memo } from "react";
import { Input, Textarea } from "@nextui-org/input";

import { AddIcon, EditIcon } from "@/src/shared/assets/icons";

interface CreateRouteFormProps {
  className?: string;
  type: "create" | "update";
  cancel: () => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  routeName: string;
  routeDescription: string;
  onChangeRouteDescription: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRouteName: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CreateRouteForm = memo((props: CreateRouteFormProps) => {
  const {
    className,
    type,
    routeName,
    routeDescription,
    onChangeRouteDescription,
    onChangeRouteName,
    cancel,
    submit,
  } = props;

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={submit}>
      <Input
        isRequired
        label="Введите название маршрута"
        size="lg"
        value={routeName}
        onChange={onChangeRouteName}
      />
      <Textarea
        isRequired
        label="Введите описание маршрута"
        maxRows={4}
        size="lg"
        value={routeDescription}
        onChange={onChangeRouteDescription}
      />
      <div className="flex flex-row w-full gap-2">
        <Button
          fullWidth
          color="danger"
          size="lg"
          variant="faded"
          onClick={cancel}
        >
          Отменить
        </Button>
        <Button
          fullWidth
          color="primary"
          endContent={type === "create" ? <AddIcon /> : <EditIcon />}
          isDisabled={!routeName || !routeDescription}
          size="lg"
          type="submit"
        >
          {type === "create" ? "Создать маршрут" : "Изменить маршрут"}
        </Button>
      </div>
    </form>
  );
});
