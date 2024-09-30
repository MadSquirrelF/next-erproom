"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SCHEMA_MENU_LOCALSTORAGE_KEY } from "@/src/shared/constants/constants";
import {
  INodeData,
  INodeNoChildren,
} from "@/src/entities/Node/model/types/node";

export enum IOrgschemaMenuSteps {
  LIST = "LIST",
  MANAGE = "MANAGE",
  ROUTES = "ROUTES",
}

export enum IActionManageScreen {
  INFO = "INFO",
  USER = "USER",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  FILE = "FILE",
}

export enum IInfoManageScreen {
  BLOCK = "BLOCK",
  USER = "USER",
}

export enum IManageScreen {
  EMPTY = "EMPTY",
  MANAGE = "MANAGE",
  CREATE = "CREATE",
  CREATE_EMPTY = "CREATE_EMPTY",
  USER = "USER",
  UPDATE = "UPDATE",
  FILE = "FILE",
}

export interface IOrgschemaMenu {
  isMenuCollapsed: boolean;
  blockForm?: Partial<INodeData>;
  currentInfoManageScreen: IInfoManageScreen;
  currentStep: IOrgschemaMenuSteps;
  activeSchemaId: number | undefined;
  currentActionManageScreen: IActionManageScreen;
  selectedBlock?: INodeNoChildren;
  currentManageScreen: IManageScreen;
  schemaName: string;
  schemaInputValue: string;

  setStep: (step: IOrgschemaMenuSteps) => void;
  setActiveSchemaId: (id: number | undefined) => void;
  setSelectedBlock: (block: INodeNoChildren | undefined) => void;
  setBlockForm: (form: Partial<INodeData> | undefined) => void;
  setManageScreen: (manageScreen: IManageScreen) => void;
  setActionManageScreen: (action: IActionManageScreen) => void;
  setInfoManageScreen: (info: IInfoManageScreen) => void;
  setSchemaInputValue: (value: string) => void;
  setIsMenuCollapsed: (isMenuCollapsed: boolean) => void;
  setSchemaName: (name: string) => void;
}

export const useOrgschemaMenu = create<IOrgschemaMenu>()(
  persist(
    (set) => {
      const initialState = {
        currentInfoManageScreen: IInfoManageScreen.BLOCK,
        currentManageScreen: IManageScreen.EMPTY,
        currentActionManageScreen: IActionManageScreen.INFO,
        schemaInputValue: "",
        currentStep: IOrgschemaMenuSteps.LIST,
        activeSchemaId: undefined,
        selectedBlock: undefined,
        blockForm: undefined,
        isMenuCollapsed: false,
        schemaName: "",
      };

      return {
        ...initialState,

        setStep: (step) => {
          set({ currentStep: step });
        },

        setSchemaName: (name) => {
          set({ schemaName: name });
        },

        setActiveSchemaId: (id) => {
          set({ activeSchemaId: id });
        },

        setSelectedBlock: (block) => {
          set({ selectedBlock: block });
        },

        setBlockForm: (form) => {
          if (form === undefined) {
            set({ blockForm: undefined });

            return;
          }
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

        setActionManageScreen: (action) => {
          set({ currentActionManageScreen: action });
        },

        setInfoManageScreen: (info) => {
          set({ currentInfoManageScreen: info });
        },

        setSchemaInputValue: (value) => {
          set({ schemaInputValue: value });
        },

        setIsMenuCollapsed: (isMenuCollapsed) => {
          set({ isMenuCollapsed });
        },
      };
    },
    {
      name: SCHEMA_MENU_LOCALSTORAGE_KEY,
      partialize: (state) => ({
        activeSchemaId: state.activeSchemaId,
        isMenuCollapsed: state.isMenuCollapsed,
      }),
    },
  ),
);
