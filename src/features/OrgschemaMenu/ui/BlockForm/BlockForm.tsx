"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { ChangeEventHandler, Key, memo, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Switch } from "@nextui-org/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { HexColorPicker } from "react-colorful";
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { CSSTransition } from "react-transition-group";

import { useOrgschemaMenu } from "../../model/store/orgschemaMenu";
import { useOrgschemaMenuManage } from "../../model/hooks/useOrgschemaMenuManage";

import {
  AddIcon,
  ColorIcon,
  CopyIcon,
  DocsIcon,
  LinkIcon,
} from "@/src/shared/assets/icons";
import {
  INodeData,
  INodeNoChildren,
} from "@/src/entities/Node/model/types/node";
import { title } from "@/components/primitives";

interface BlockFormProps {
  className?: string;
  cancelTitle: string;
  handleTitle: string;
  isReadOnly?: boolean;
  isPending: boolean;
  type: string;
  formTitle: string;
  data?: INodeNoChildren;
  cancel: () => void;
  handleBlock: () => void;
  onChangeName?: ChangeEventHandler<HTMLInputElement>;
  onChangeDescription?: ChangeEventHandler<HTMLInputElement>;
  onChangeDescriptionSecondary?: ChangeEventHandler<HTMLInputElement>;
  onChangeMail?: ChangeEventHandler<HTMLInputElement>;
  onChangeCloud?: ChangeEventHandler<HTMLInputElement>;
  onChangeParentBlock?: (id: Key | null) => void;
  onChangeIsTogether?: (isSelected: boolean) => void;
  onClearColor?: (isSelected: boolean) => void;
  onChangeColor?: (newColor: string) => void;
  onChangeSort?: ChangeEventHandler<HTMLInputElement>;
}

export const BlockForm = memo((props: BlockFormProps) => {
  const {
    className,
    type,
    isPending,
    isReadOnly,
    data,
    formTitle,
    cancelTitle,
    handleTitle,
    cancel,
    onChangeName,
    onChangeDescription,
    onChangeDescriptionSecondary,
    onChangeMail,
    onChangeCloud,
    onClearColor,
    onChangeParentBlock,
    onChangeIsTogether,
    onChangeColor,
    onChangeSort,
    handleBlock,
  } = props;

  const blockForm = useOrgschemaMenu((state) => state.blockForm);
  const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const { data: blocks } = useOrgschemaMenuManage();

  const isParentBlockHidden =
    !blocks ||
    (type === "update" && selectedBlock?.parent_id === 0) ||
    blocks.length < 2;

  useEffect(() => {
    if (selectedBlock && onChangeParentBlock) {
      onChangeParentBlock(String(selectedBlock.id));
    }
  }, [selectedBlock]);

  const newBlockForm: Partial<INodeData> = {
    id: data?.id,
    parent_id: data?.parent_id,
    name: data?.name,
    description: data?.description,
    description_secondary: data?.description_secondary,
    cloud: data?.cloud,
    mail: data?.mail,
    sort: data?.setting.sort,
    color: data?.setting.color_block,
    is_together: data?.setting.is_together ? 1 : 0,
    isColorClear:
      data?.setting.color_block === null || data?.setting.color_block === "#f"
        ? true
        : false,
  };

  useEffect(() => {
    if (data) {
      setBlockForm(newBlockForm);
    }
  }, [data]);

  const handleOpenLink = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleCopyText = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Текст скопирован!");
    }
  };

  const validateEditForm = () => {
    if (isEqual(blockForm, newBlockForm)) {
      return false;
    }

    return true;
  };

  const validateCreateForm = () => {
    if (
      !blockForm?.name ||
      !blockForm?.description ||
      !blockForm?.description_secondary
    ) {
      return false;
    }

    return true;
  };

  const handleForm = () => {
    if (type === "update") {
      const result = validateEditForm();

      if (result) {
        handleBlock();

        return;
      }

      return toast.error("Блок не был изменен!");
    } else if (type === "create") {
      const result = validateCreateForm();

      if (result) {
        handleBlock();

        return;
      }

      return toast.error("Введите обязательные поля!");
    }
  };

  return (
    <form className="relative flex flex-col flex-grow gap-9 justify-between">
      <div className="w-full flex flex-col gap-4">
        <h4
          className={title({
            size: "tiny",
            bold: "bold",
          })}
        >
          {formTitle}
        </h4>
        <Input
          isReadOnly={isReadOnly}
          isRequired={type === "create"}
          label="Названиие блока"
          placeholder="Введите название блока"
          size="sm"
          type="text"
          value={blockForm?.name}
          onChange={onChangeName}
        />
        <div className="flex flex-row gap-2">
          <Textarea
            endContent={
              <Tooltip content="Копировать описание">
                <Button
                  isIconOnly
                  isDisabled={!blockForm?.description}
                  size="sm"
                  variant="flat"
                  onClick={() => handleCopyText(blockForm?.description)}
                >
                  <CopyIcon size={20} />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            isRequired={type === "create"}
            label="Описание блока"
            maxRows={3}
            placeholder="Введите описание блока"
            size="sm"
            value={blockForm?.description}
            onChange={onChangeDescription}
          />
          <Textarea
            endContent={
              <Tooltip content="Копировать цкп">
                <Button
                  isIconOnly
                  isDisabled={!blockForm?.description_secondary}
                  size="sm"
                  variant="flat"
                  onClick={() =>
                    handleCopyText(blockForm?.description_secondary)
                  }
                >
                  <CopyIcon size={20} />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            isRequired={type === "create"}
            label="ЦКП блока"
            maxRows={3}
            placeholder="Введите ЦКП блока"
            size="sm"
            value={blockForm?.description_secondary}
            onChange={onChangeDescriptionSecondary}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Input
            endContent={
              <Tooltip content="Перейти по ссылке">
                <Button
                  isIconOnly
                  isDisabled={!blockForm?.cloud}
                  size="sm"
                  variant="flat"
                  onClick={() => handleOpenLink(blockForm?.cloud)}
                >
                  <LinkIcon />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            label="Ссылка на облако"
            placeholder="Введите ссылку"
            size="sm"
            type="text"
            value={blockForm?.cloud}
            onChange={onChangeCloud}
          />
          <Input
            endContent={
              <Tooltip content="Перейти по ссылке">
                <Button
                  isIconOnly
                  isDisabled={!blockForm?.mail}
                  size="sm"
                  variant="flat"
                  onClick={() => handleOpenLink(blockForm?.mail)}
                >
                  <LinkIcon />
                </Button>
              </Tooltip>
            }
            isReadOnly={isReadOnly}
            label="Ссылка на почту"
            placeholder="Введите ссылку"
            size="sm"
            type="text"
            value={blockForm?.mail}
            onChange={onChangeMail}
          />
        </div>
        {isParentBlockHidden ? null : (
          <Autocomplete
            isClearable
            disabledKeys={type === "update" ? [String(selectedBlock?.id)] : []}
            label="Родительский блок"
            placeholder="Выберите родительский блок"
            selectedKey={String(blockForm?.parent_id)}
            size="sm"
            onSelectionChange={onChangeParentBlock}
          >
            {blocks ? (
              blocks.map((block) => (
                <AutocompleteItem
                  key={block.id}
                  startContent={<DocsIcon />}
                  textValue={block.name}
                >
                  <div className="flex flex-col gap-1">
                    <span>{block.name}</span>
                  </div>
                </AutocompleteItem>
              ))
            ) : (
              <AutocompleteItem
                key="Пусто"
                startContent={<DocsIcon />}
                value="Пусто"
              >
                <div className="flex flex-col gap-1">
                  <span>Пусто</span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
        <div className="flex flex-row w-full gap-2 items-center">
          <Input
            isReadOnly={isReadOnly}
            label="Сортировка блока"
            placeholder="Введите цифру сортировки блока"
            size="sm"
            type="number"
            value={!blockForm?.sort ? "1" : String(blockForm.sort)}
            onChange={onChangeSort}
          />

          <CSSTransition
            unmountOnExit
            classNames="slide-animation"
            in={!blockForm?.isColorClear}
            timeout={300}
          >
            <Popover>
              <PopoverTrigger>
                <Button isIconOnly variant="flat">
                  <ColorIcon
                    color={
                      !blockForm?.color || blockForm.color === "#f"
                        ? "#DA2A2A"
                        : blockForm.color
                    }
                    size={30}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-center justify-center p-4">
                <HexColorPicker
                  color={
                    !blockForm?.color || blockForm.color === "#f"
                      ? "#DA2A2A"
                      : blockForm.color
                  }
                  onChange={onChangeColor}
                />
              </PopoverContent>
            </Popover>
          </CSSTransition>
        </div>

        <Switch
          color="primary"
          isSelected={blockForm?.is_together === 1}
          size="sm"
          onValueChange={onChangeIsTogether}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Вертикальное отображение блоков</p>
          </div>
        </Switch>

        <Switch
          color="primary"
          isSelected={blockForm && blockForm.isColorClear === true}
          size="sm"
          onValueChange={onClearColor}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Без цвета</p>
          </div>
        </Switch>
        {/* <p>{blockForm?.color}</p> */}
      </div>

      <div className="flex flex-col w-full gap-2">
        <Button
          fullWidth
          color="danger"
          size="lg"
          variant="faded"
          onClick={cancel}
        >
          {cancelTitle}
        </Button>
        <Button
          fullWidth
          color="primary"
          endContent={<AddIcon />}
          size="lg"
          onClick={handleForm}
        >
          {handleTitle}
        </Button>
      </div>
    </form>
  );
});
