import { create } from "zustand";

import { ISchema } from "@/src/entities/Schema";
import { loadStateFromLocalStorage } from "@/src/shared/utils/getSchemaFromLS/getSchemaFromLS";
import { SCHEMA_MENU_LOCALSTORAGE_KEY } from "@/src/shared/constants/constants";
import {
  INodeData,
  INodeNoChildren,
} from "@/src/entities/Node/model/types/node";

export enum IOrgschemaMenuSteps {
  SECTION = "SECTION",
  LIST = "LIST",
  MANAGE = "MANAGE",
}

export enum IManageScreen {
  EMPTY = "EMPTY",
  MANAGE = "MANAGE",
  CREATE = "CREATE",
}

export enum IOrgschemaMenuSection {
  ROUTES = "ROUTES",
  SCHEMAS = "SCHEMAS",
  NONE = "NONE",
}

export interface IOrgschemaMenu {
  readonlyInfo: boolean;
  blockForm?: Partial<INodeData>;
  currentStep: IOrgschemaMenuSteps;
  currentSection: IOrgschemaMenuSection;
  activeSchemaId: number | undefined;
  loadedSchema: ISchema | undefined;
  selectedBlock?: INodeNoChildren;
  currentRoute: number | null;
  currentManageScreen: IManageScreen;

  setSection: (section: IOrgschemaMenuSection) => void;
  setRoute: (route: number) => void;
  setStep: (step: IOrgschemaMenuSteps) => void;
  setLoadedSchema: (loadedSchema: ISchema) => void;
  setActiveSchemaId: (id: number | undefined) => void;
  setSelectedBlock: (block: INodeNoChildren | undefined) => void;
  setBlockForm: (form: Partial<INodeData> | undefined) => void;
  setManageScreen: (manageScreen: IManageScreen) => void;
}

export const useOrgschemaMenu = create<IOrgschemaMenu>((set) => {
  const initialState = {
    ...loadStateFromLocalStorage(),
    readonlyInfo: true,
    currentManageScreen: IManageScreen.EMPTY,
  };

  return {
    ...initialState,
    setSection: (section) => {
      set({ currentSection: section });
      const currentState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
      const updatedState = currentState ? JSON.parse(currentState) : {};

      updatedState.currentSection = section;
      localStorage.setItem(
        SCHEMA_MENU_LOCALSTORAGE_KEY,
        JSON.stringify(updatedState),
      );
    },

    setRoute: (route) => {
      set({ currentRoute: route });
      const currentState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
      const updatedState = currentState ? JSON.parse(currentState) : {};

      updatedState.currentRoute = route;
      localStorage.setItem(
        SCHEMA_MENU_LOCALSTORAGE_KEY,
        JSON.stringify(updatedState),
      );
    },

    setStep: (step) => {
      set({ currentStep: step });
      const currentState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
      const updatedState = currentState ? JSON.parse(currentState) : {};

      updatedState.currentStep = step;
      localStorage.setItem(
        SCHEMA_MENU_LOCALSTORAGE_KEY,
        JSON.stringify(updatedState),
      );
    },

    setActiveSchemaId: (id) => {
      set({ activeSchemaId: id });
      const currentState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
      const updatedState = currentState ? JSON.parse(currentState) : {};

      updatedState.activeSchemaId = id;
      localStorage.setItem(
        SCHEMA_MENU_LOCALSTORAGE_KEY,
        JSON.stringify(updatedState),
      );
    },
    setSelectedBlock: (block) => {
      set({ selectedBlock: block });
    },
    setLoadedSchema: (loadedSchema) => {
      set({ loadedSchema });
    },
    setBlockForm: (form) => {
      set((state) => ({
        blockForm: {
          ...state.blockForm,
          ...form,
        },
      }));
    },
    setManageScreen: (manageScreen) => {
      set({ currentManageScreen: manageScreen });
    },
  };
});
