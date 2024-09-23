"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { ChangeEventHandler, memo } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Switch } from "@nextui-org/switch";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { HexColorPicker } from "react-colorful";

import { useOrgschemaMenu } from "../../model/store/orgschemaMenu";

import {
  AddIcon,
  ColorIcon,
  CopyIcon,
  DocumentEmptyIcon,
  LinkIcon,
} from "@/src/shared/assets/icons";
import { INodeNoChildren } from "@/src/entities/Node/model/types/node";

interface BlockFormProps {
  className?: string;
  isReadOnly?: boolean;
  data?: INodeNoChildren;
  cancel: () => void;
  handleCreateBlock: () => void;
  onChangeName?: ChangeEventHandler<HTMLInputElement>;
  onChangeDescription?: ChangeEventHandler<HTMLInputElement>;
  onChangeDescriptionSecondary?: ChangeEventHandler<HTMLInputElement>;
  onChangeMail?: ChangeEventHandler<HTMLInputElement>;
  onChangeCloud?: ChangeEventHandler<HTMLInputElement>;
  onChangeParentBlock?: ChangeEventHandler<HTMLInputElement>;
  onChangeIsTogether?: (isSelected: boolean) => void;
  onChangeColor?: (newColor: string) => void;
  onChangeSort?: ChangeEventHandler<HTMLInputElement>;
}

export const BlockForm = memo((props: BlockFormProps) => {
  const {
    className,
    isReadOnly,
    data,
    cancel,
    onChangeName,
    onChangeDescription,
    onChangeDescriptionSecondary,
    onChangeMail,
    onChangeCloud,
    onChangeParentBlock,
    onChangeIsTogether,
    onChangeColor,
    onChangeSort,
    handleCreateBlock,
  } = props;

  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);
  const blockForm = useOrgschemaMenu((state) => state.blockForm);

  return (
    <form className="relative flex flex-col h-full gap-9 justify-between">
      <div className="w-full flex flex-col gap-4">
        <Input
          isReadOnly={isReadOnly}
          label="Названиие блока"
          placeholder="Введите название блока"
          type="text"
          value={data?.name}
          onChange={onChangeName}
        />
        <div className="flex flex-row gap-2">
          <Textarea
            endContent={
              <Tooltip content="Копировать описание">
                <Button
                  isIconOnly
                  isDisabled={!data?.description}
                  size="sm"
                  variant="flat"
                >
                  <CopyIcon size={20} />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            label="Описание блока"
            maxRows={3}
            placeholder="Введите описание блока"
            value={data?.description}
            onChange={onChangeDescription}
          />
          <Textarea
            endContent={
              <Tooltip content="Копировать цкп">
                <Button
                  isIconOnly
                  isDisabled={!data?.description_secondary}
                  size="sm"
                  variant="flat"
                >
                  <CopyIcon size={20} />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            label="ЦКП блока"
            maxRows={3}
            placeholder="Введите ЦКП блока"
            value={data?.description_secondary}
            onChange={onChangeDescriptionSecondary}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Input
            endContent={
              <Tooltip content="Перейти по ссылке">
                <Button
                  isIconOnly
                  isDisabled={!data?.cloud}
                  size="sm"
                  variant="flat"
                >
                  <LinkIcon />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            label="Ссылка на облако"
            placeholder="Введите ссылку"
            type="text"
            value={data?.cloud}
            onChange={onChangeCloud}
          />
          <Input
            endContent={
              <Tooltip content="Перейти по ссылке">
                <Button
                  isIconOnly
                  isDisabled={!data?.mail}
                  size="sm"
                  variant="flat"
                >
                  <LinkIcon />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            label="Ссылка на почту"
            placeholder="Введите ссылку"
            type="text"
            value={data?.mail}
            onChange={onChangeMail}
          />
        </div>
        {loadedSchema!.blocks && loadedSchema?.blocks.length === 0 ? null : (
          <Autocomplete
            isClearable
            label="Выберите родительский блок"
            placeholder="Выберите блок схемы"
            startContent={<DocumentEmptyIcon className="text-primary" />}
          >
            <AutocompleteItem
              key="Тест"
              startContent={<DocumentEmptyIcon />}
              textValue="Тест"
            >
              <div className="flex flex-col">
                <span>Тест</span>
              </div>
            </AutocompleteItem>
          </Autocomplete>
        )}
        <div className="flex flex-row w-full gap-2 items-start">
          <Input
            description="Число определяет порядок отображения блоков: чем меньше число, тем выше приоритет."
            isReadOnly={isReadOnly}
            label="Сортировка блока"
            placeholder="Введите цифру сортировки блока"
            type="number"
            value={
              data?.setting.sort === undefined
                ? String(blockForm?.sort)
                : String(data.setting.sort)
            }
            onChange={onChangeSort}
          />

          <Popover>
            <PopoverTrigger>
              <Button isIconOnly className="mt-1" size="lg" variant="flat">
                <ColorIcon
                  color={
                    blockForm?.color === undefined ? "#DA2A2A" : blockForm.color
                  }
                  size={30}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center p-4">
              <HexColorPicker
                color={data?.setting.color_block}
                onChange={onChangeColor}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Switch
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-md bg-content2 items-center",
              "justify-between cursor-pointer rounded-xl gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary",
            ),
            wrapper: "p-0 h-4 overflow-visible",
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[hover=true]:border-primary",
              //selected
              "group-data-[selected=true]:ml-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ml-4",
            ),
          }}
          onValueChange={onChangeIsTogether}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Вертикальное отображение блоков?</p>
            <p className="text-tiny text-default-400">
              Если вы выберете этот пункт, блоки под ним будут отображаться
              вертикально.
            </p>
          </div>
        </Switch>
        <Switch
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-md bg-content2 items-center",
              "justify-between cursor-pointer rounded-xl gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary",
            ),
            wrapper: "p-0 h-4 overflow-visible",
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[hover=true]:border-primary",
              //selected
              "group-data-[selected=true]:ml-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ml-4",
            ),
          }}
          onValueChange={onChangeIsTogether}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Оставить блок без цвет?</p>
            <p className="text-tiny text-default-400">
              Если вы выберете этот пункт, данный блок будет без цвет.
            </p>
          </div>
        </Switch>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Button
          fullWidth
          color="danger"
          size="lg"
          variant="faded"
          onClick={cancel}
        >
          Отменить создание
        </Button>
        <Button
          fullWidth
          color="primary"
          endContent={<AddIcon />}
          size="lg"
          onClick={handleCreateBlock}
        >
          Создать блок
        </Button>
      </div>
    </form>
  );
});
