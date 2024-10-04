"use client";
import { Button } from "@nextui-org/button";
import {
  ChangeEventHandler,
  FormEvent,
  Key,
  memo,
  useEffect,
  useState,
} from "react";
import { Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/autocomplete";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  ScrollShadow,
  SharedSelection,
  Skeleton,
} from "@nextui-org/react";
import toast from "react-hot-toast";

import {
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../../../model/store/orgschemaMenu";
import { useUpdateStepsData } from "../../../model/hooks/useUpdateStepsData";

import {
  AddIcon,
  ChevronDownIcon,
  CopyIcon,
  DocCloudIcon,
  DocSendIcon,
  DocsIcon,
  FailEmojiIcon,
  OrgSchemaIcon,
  RefreshIcon,
  SuccessEmojiIcon,
} from "@/src/shared/assets/icons";
import { subtitle, title } from "@/components/primitives";
import {
  getDisabledStepsKeys,
  getDocumentStatusWithColor,
} from "@/src/shared/utils/routeFunctions/routeFunctions";
import { IFlowStepFormData } from "@/src/entities/Route/model/types/route";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";
import { INodeShort } from "@/src/entities/Node/model/types/node";

interface FlowStepFormProps {
  className?: string;
  type: "create" | "update" | "create_first";
  formTitle: string;
  cancelTitle: string;
  handleTitle: string;
  cancel: () => void;
  handleFlowStep: () => void;
  onChangeFailStatus: (keys: SharedSelection) => void;
  onChangeSuccesStatus: (keys: SharedSelection) => void;
  onChangeDescription: ChangeEventHandler<HTMLInputElement>;
  onChangeSuccesStep: (id: Key | null) => void;
  onChangeFailStep: (id: Key | null) => void;
  onChangeParentBlock: (id: Key | null) => void;
  onChangeChildBlock: (id: Key | null) => void;
}

export const FlowStepForm = memo((props: FlowStepFormProps) => {
  const {
    className,
    cancel,
    handleFlowStep,
    onChangeFailStatus,
    onChangeDescription,
    onChangeSuccesStatus,
    onChangeSuccesStep,
    onChangeFailStep,
    onChangeParentBlock,
    type,
    onChangeChildBlock,
    cancelTitle,
    handleTitle,
    formTitle,
  } = props;

  const {
    AllSteps,
    IsLoadingAllSteps,
    IsErrorAllSteps,
    ErrorAllSteps,
    AllBlocks,
    isLoadingAllBlocks,
    isErrorAllBlocks,
    ErrorAllBlocks,
  } = useUpdateStepsData();

  const flowStepForm = useOrgschemaMenu((state) => state.flowStepForm);
  const setFlowStepForm = useOrgschemaMenu((state) => state.setFlowStepForm);
  const selectedFlowStep = useOrgschemaMenu((state) => state.selectedFlowStep);
  const setActiveRouteId = useOrgschemaMenu((state) => state.setActiveRouteId);
  const setSelectedFlowStep = useOrgschemaMenu(
    (state) => state.setSelectedFlowStep,
  );
  const setStep = useOrgschemaMenu((state) => state.setStep);
  const [isParentBlockSelectonDisable, setIsParentBlockSelectonDisable] =
    useState(false);

  const [isNextSuccessStepDisable, setIsNextSuccessStepDisable] =
    useState(false);

  const [isNextFailStepDisable, setIsNextFailStepDisable] = useState(false);

  const handleBackToOrgSchema = () => {
    setStep(IOrgschemaMenuSteps.LIST);
    setActiveRouteId(undefined);
    setFlowStepForm(undefined);
    setSelectedFlowStep(undefined);
  };

  const validateForm = (type: "create" | "update" | "create_first") => {
    switch (type) {
      case "create":
        if (
          !flowStepForm?.description ||
          !flowStepForm.orgboard_block_id ||
          !flowStepForm.orgboard_block_end_id
        ) {
          return false;
        }

        return true;

      case "create_first":
        if (
          !flowStepForm?.description ||
          !flowStepForm.orgboard_block_id ||
          !flowStepForm.orgboard_block_end_id
        ) {
          return false;
        }

        return true;

      case "update":
        if (
          !flowStepForm?.description ||
          !flowStepForm.orgboard_block_id ||
          !flowStepForm.orgboard_block_end_id
        ) {
          return false;
        }

        return true;

      default:
        if (
          !flowStepForm?.description ||
          !flowStepForm.orgboard_block_id ||
          !flowStepForm.orgboard_block_end_id
        ) {
          return false;
        }

        return true;
    }
  };

  const onSubmitFlowStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm(type)) {
      return;
    }

    handleFlowStep();
  };

  const handleCopyText = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Текст скопирован!");
    }
  };

  const newFlowStepForm: Partial<IFlowStepFormData> = {
    description: selectedFlowStep?.description,
    orgboard_block_id: selectedFlowStep?.orgboard_block_id,
    orgboard_block_end_id: selectedFlowStep?.orgboard_block_end_id,
    success_step: selectedFlowStep?.setting.success_step,
    fail_step: selectedFlowStep?.setting.fail_step,
    success_status: selectedFlowStep?.setting.success_status,
    fail_status: selectedFlowStep?.setting.fail_status,
    first_step: selectedFlowStep?.first_step,
  };

  useEffect(() => {
    if (type === "update" && selectedFlowStep) {
      setFlowStepForm(newFlowStepForm);
    }
  }, [type, selectedFlowStep]);

  useEffect(() => {
    if (
      type === "create" &&
      selectedFlowStep &&
      selectedFlowStep.all_flow_step_next.length > 0
    ) {
      cancel();
    }
    if (type === "create" && selectedFlowStep) {
      setFlowStepForm({
        orgboard_block_id: selectedFlowStep.orgboard_block_end_id,
        success_status: 3,
        fail_status: 5,
        first_step: false,
      });
      setIsParentBlockSelectonDisable(true);
      setIsNextSuccessStepDisable(true);
      setIsNextFailStepDisable(true);
    }

    if (type === "create_first") {
      setFlowStepForm({
        success_status: 3,
        fail_status: 5,
        first_step: true,
      });
    }
    //?????????
  }, [type, selectedFlowStep]);

  if (IsErrorAllSteps || isLoadingAllBlocks) {
    return (
      <div className="relative flex flex-col flex-grow gap-9 w-full justify-between">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-1/2 rounded-2xl h-2" />
          <Skeleton className="w-full rounded-2xl h-20" />
          <Skeleton className="w-full rounded-2xl h-20" />
          <Skeleton className="w-full rounded-2xl h-20" />
          <Skeleton className="w-full rounded-2xl h-20" />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Skeleton className="w-full rounded-2xl h-12" />
          <Skeleton className="w-full rounded-2xl h-12" />
        </div>
      </div>
    );
  }
  if (!AllBlocks || AllBlocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
        <div className="flex flex-col gap-2 w-full items-center justify-center h-full">
          <ErrorBg className="text-danger" size={400} />
          <p
            className={subtitle({
              size: "sm",
              color: "default",
              align: "center",
            })}
          >
            Похоже, что ни одна из оргсхем еще не имеет блоков.
            <p
              className={subtitle({
                size: "tiny",
                align: "center",
              })}
            >
              Вернитесь на вкладку оргсхемы и создайте там пару подразделений,
              чтобы начать работать с маршрутами
            </p>
          </p>
        </div>

        <Button
          fullWidth
          color="danger"
          size="lg"
          startContent={<OrgSchemaIcon />}
          onClick={handleBackToOrgSchema}
        >
          Вернуться назад
        </Button>
      </div>
    );
  }

  // Группируем блоки по scheme_name
  const groupedBlocks = AllBlocks.reduce<Record<string, INodeShort[]>>(
    (acc, block) => {
      const schemeName = block.scheme_name.name;

      if (!acc[schemeName]) {
        acc[schemeName] = [];
      }
      acc[schemeName].push(block);

      return acc;
    },
    {},
  );

  return (
    <form
      className="relative h-full flex flex-col flex-grow gap-9 justify-between"
      onSubmit={onSubmitFlowStep}
    >
      <ScrollShadow
        hideScrollBar
        className="h-[90%] w-full flex flex-col gap-4"
      >
        <h4
          className={title({
            size: "tiny",
            bold: "bold",
          })}
        >
          {formTitle}
        </h4>
        <Textarea
          isRequired
          endContent={
            <Tooltip content="Копировать описание">
              <Button
                isIconOnly
                isDisabled={!flowStepForm?.description}
                size="sm"
                variant="flat"
                onClick={() => handleCopyText(flowStepForm?.description)}
              >
                <CopyIcon size={20} />
              </Button>
            </Tooltip>
          }
          label="Описание шага"
          maxRows={3}
          placeholder="Введите описание шага"
          size="sm"
          value={flowStepForm?.description}
          onChange={onChangeDescription}
        />
        <div className="flex flex-col gap-2">
          <Autocomplete
            isClearable
            isRequired
            disabledKeys={[String(flowStepForm?.orgboard_block_end_id)]}
            isDisabled={isParentBlockSelectonDisable || type === "update"}
            label="Начальный блок"
            placeholder="Выберите начальный блок"
            selectedKey={String(flowStepForm?.orgboard_block_id)}
            size="sm"
            onSelectionChange={onChangeParentBlock}
          >
            {Object.keys(groupedBlocks).map((schemeName) => (
              <AutocompleteSection
                key={schemeName}
                showDivider
                title={schemeName}
              >
                {groupedBlocks[schemeName].map((block) => (
                  <AutocompleteItem
                    key={String(block.id)}
                    startContent={<OrgSchemaIcon />}
                    textValue={block.name}
                  >
                    <div className="flex flex-col gap-1">
                      <span>{block.name}</span>
                    </div>
                  </AutocompleteItem>
                ))}
              </AutocompleteSection>
            ))}
          </Autocomplete>
        </div>

        <div className="flex flex-col gap-2">
          <Autocomplete
            isClearable
            isRequired
            disabledKeys={[String(flowStepForm?.orgboard_block_id)]}
            isDisabled={type === "update"}
            label="Конечный блок"
            placeholder="Выберите конечный блок"
            selectedKey={String(flowStepForm?.orgboard_block_end_id)}
            size="sm"
            onSelectionChange={onChangeChildBlock}
          >
            {Object.keys(groupedBlocks).map((schemeName) => (
              <AutocompleteSection
                key={schemeName}
                showDivider
                title={schemeName}
              >
                {groupedBlocks[schemeName].map((block) => (
                  <AutocompleteItem
                    key={String(block.id)}
                    startContent={<OrgSchemaIcon />}
                    textValue={block.name}
                  >
                    <div className="flex flex-col gap-1">
                      <span>{block.name}</span>
                    </div>
                  </AutocompleteItem>
                ))}
              </AutocompleteSection>
            ))}
          </Autocomplete>
        </div>

        <p
          className={subtitle({
            size: "tiny",
          })}
        >
          Настройки документооборота
        </p>

        {IsLoadingAllSteps ? (
          <Skeleton className="rounded-lg w-full h-12" />
        ) : !AllSteps || AllSteps.length === 0 ? null : (
          <Autocomplete
            isClearable
            disabledKeys={[
              ...getDisabledStepsKeys(AllSteps, selectedFlowStep?.id),
              String(selectedFlowStep?.id),
            ]}
            isDisabled={isNextSuccessStepDisable}
            label="Следующий шаг при успехе"
            placeholder="Выберите следующий шаг при успехе"
            selectedKey={String(flowStepForm?.success_step)}
            size="sm"
            onSelectionChange={onChangeSuccesStep}
          >
            {AllSteps.map((step) => (
              <AutocompleteItem
                key={String(step.id)}
                startContent={<DocsIcon />}
                textValue={step.description}
              >
                <div className="flex flex-col gap-1">
                  <span>{step.description}</span>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}

        <div className="flex flex-col gap-1">
          <p
            className={subtitle({
              size: "tiny",
            })}
          >
            При успехе, документ примет статус:
          </p>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                className="w-full flex-none"
                color={
                  flowStepForm?.success_status
                    ? getDocumentStatusWithColor(flowStepForm?.success_status)
                        .color
                    : "default"
                }
                endContent={
                  <ChevronDownIcon className="text-small flex-none" />
                }
                size="lg"
                startContent={<DocsIcon className="flex-none" size={24} />}
                variant="flat"
              >
                {flowStepForm?.success_status
                  ? getDocumentStatusWithColor(flowStepForm?.success_status)
                      .status
                  : "Статус"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Success status selection"
              selectedKeys={[String(flowStepForm?.success_status)]}
              selectionMode="single"
              variant="faded"
              onSelectionChange={onChangeSuccesStatus}
            >
              <DropdownSection showDivider title="Ожидание">
                <DropdownItem
                  key="1"
                  className="text-secondary"
                  color="secondary"
                  description="Сохраним документ в облаке"
                  startContent={<DocCloudIcon className="text-secondary" />}
                >
                  Сохранен
                </DropdownItem>
                <DropdownItem
                  key="2"
                  className="text-primary"
                  color="primary"
                  description="Документ отправлен по маршруту"
                  startContent={<DocSendIcon className="text-primary" />}
                >
                  Отправлен
                </DropdownItem>
                <DropdownItem
                  key="3"
                  className="text-warning"
                  color="warning"
                  description="Документ находится в процессе согласования"
                  startContent={<RefreshIcon className="text-warning" />}
                >
                  В процессе
                </DropdownItem>
              </DropdownSection>
              <DropdownSection showDivider title="Успех">
                <DropdownItem
                  key="4"
                  className="text-success"
                  color="success"
                  description="Документ подписан"
                  startContent={<SuccessEmojiIcon className="text-success" />}
                >
                  Согласован
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Неудача">
                <DropdownItem
                  key="5"
                  className="text-danger"
                  color="danger"
                  description="Документ будет отменен"
                  startContent={<FailEmojiIcon className="text-danger" />}
                >
                  Отменен
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>

        {IsLoadingAllSteps ? (
          <Skeleton className="rounded-lg w-full h-12" />
        ) : !AllSteps || AllSteps.length === 0 ? null : (
          <Autocomplete
            isClearable
            disabledKeys={[String(selectedFlowStep?.id)]}
            isDisabled={isNextFailStepDisable || type === "update"}
            label="Следующий шаг при неудаче"
            placeholder="Выберите следующий шаг при неудаче"
            selectedKey={String(flowStepForm?.fail_step)}
            size="sm"
            onSelectionChange={onChangeFailStep}
          >
            {AllSteps.map((step) => (
              <AutocompleteItem
                key={String(step.id)}
                startContent={<DocsIcon />}
                textValue={step.description}
              >
                <div className="flex flex-col gap-1">
                  <span>{step.description}</span>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
        <div className="flex flex-col gap-1">
          <p
            className={subtitle({
              size: "tiny",
            })}
          >
            При неудаче, документ примет статус:
          </p>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                className="w-full flex-none"
                color={
                  flowStepForm?.fail_status
                    ? getDocumentStatusWithColor(flowStepForm?.fail_status)
                        .color
                    : "default"
                }
                endContent={
                  <ChevronDownIcon className="text-small flex-none" />
                }
                size="lg"
                startContent={<DocsIcon className="flex-none" size={24} />}
                variant="flat"
              >
                {flowStepForm?.fail_status
                  ? getDocumentStatusWithColor(flowStepForm?.fail_status).status
                  : "Статус"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Fail status selection"
              selectedKeys={[String(flowStepForm?.fail_status)]}
              selectionMode="single"
              variant="faded"
              onSelectionChange={onChangeFailStatus}
            >
              <DropdownSection showDivider title="Ожидание">
                <DropdownItem
                  key="1"
                  className="text-secondary"
                  color="secondary"
                  description="Сохраним документ в облаке"
                  startContent={<DocCloudIcon className="text-secondary" />}
                >
                  Сохранен
                </DropdownItem>
                <DropdownItem
                  key="2"
                  className="text-primary"
                  color="primary"
                  description="Документ отправлен по маршруту"
                  startContent={<DocSendIcon className="text-primary" />}
                >
                  Отправлен
                </DropdownItem>
                <DropdownItem
                  key="3"
                  className="text-warning"
                  color="warning"
                  description="Документ находится в процессе согласования"
                  startContent={<RefreshIcon className="text-warning" />}
                >
                  В процессе
                </DropdownItem>
              </DropdownSection>
              <DropdownSection showDivider title="Успех">
                <DropdownItem
                  key="4"
                  className="text-success"
                  color="success"
                  description="Документ подписан"
                  startContent={<SuccessEmojiIcon className="text-success" />}
                >
                  Согласован
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Неудача">
                <DropdownItem
                  key="5"
                  className="text-danger"
                  color="danger"
                  description="Документ будет отменен"
                  startContent={<FailEmojiIcon className="text-danger" />}
                >
                  Отменен
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </ScrollShadow>

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
          isDisabled={!validateForm(type)}
          size="lg"
          type="submit"
        >
          {handleTitle}
        </Button>
      </div>
    </form>
  );
});
