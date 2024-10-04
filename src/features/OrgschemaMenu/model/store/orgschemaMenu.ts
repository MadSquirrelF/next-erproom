"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SCHEMA_MENU_LOCALSTORAGE_KEY } from "@/src/shared/constants/constants";
import {
  INodeData,
  INodeNoChildren,
} from "@/src/entities/Node/model/types/node";
import {
  IFlowStep,
  IFlowStepFormData,
} from "@/src/entities/Route/model/types/route";

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

export enum IRouteScreen {
  EMPTY = "EMPTY",
  LIST = "LIST",
  CREATE = "CREATE",
  CREATE_EMPTY = "CREATE_EMPTY",
  UPDATE = "UPDATE",
  MANAGE = "MANAGE",
}

export interface IOrgschemaMenu {
  isMenuCollapsed: boolean;
  blockForm?: Partial<INodeData>;
  flowStepForm?: Partial<IFlowStepFormData>;
  currentInfoManageScreen: IInfoManageScreen;
  currentStep: IOrgschemaMenuSteps;
  currentRouteScreen: IRouteScreen;
  activeSchemaId: number | undefined;
  activeRouteId: number | undefined;
  currentActionManageScreen: IActionManageScreen;
  selectedBlock?: INodeNoChildren;
  selectedFlowStep?: IFlowStep;
  currentManageScreen: IManageScreen;
  isRouteEmpty: boolean;
  schemaName: string;
  routeName: string;
  routeDescription: string;
  schemaInputValue: string;

  setIsRouteEmpty: (isRouteEmpty: boolean) => void;
  setStep: (step: IOrgschemaMenuSteps) => void;
  setActiveSchemaId: (id: number | undefined) => void;
  setActiveRouteId: (id: number | undefined) => void;
  setSelectedBlock: (block: INodeNoChildren | undefined) => void;
  setBlockForm: (form: Partial<INodeData> | undefined) => void;
  setManageScreen: (manageScreen: IManageScreen) => void;
  setActionManageScreen: (action: IActionManageScreen) => void;
  setInfoManageScreen: (info: IInfoManageScreen) => void;
  setSchemaInputValue: (value: string) => void;
  setIsMenuCollapsed: (isMenuCollapsed: boolean) => void;
  setSchemaName: (name: string) => void;
  setRouteName: (name: string) => void;
  setSelectedFlowStep: (flowStep: IFlowStep | undefined) => void;
  setRouteDescription: (description: string) => void;
  setFlowStepForm: (form: Partial<IFlowStepFormData> | undefined) => void;
  setCurrentRouteScreen: (routeScreen: IRouteScreen) => void;
}

export const useOrgschemaMenu = create<IOrgschemaMenu>()(
  persist(
    (set) => {
      const initialState = {
        currentInfoManageScreen: IInfoManageScreen.BLOCK,
        currentManageScreen: IManageScreen.MANAGE,
        currentActionManageScreen: IActionManageScreen.INFO,
        schemaInputValue: "",
        currentStep: IOrgschemaMenuSteps.LIST,
        activeSchemaId: undefined,
        selectedBlock: undefined,
        blockForm: undefined,
        flowStepForm: undefined,
        activeRouteId: undefined,
        isMenuCollapsed: false,
        schemaName: "",
        currentRouteScreen: IRouteScreen.LIST,
        routeName: "",
        routeDescription: "",
        selectedFlowStep: undefined,
        isRouteEmpty: false,
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

        setActiveRouteId: (id) => {
          set({ activeRouteId: id });
        },

        setSelectedBlock: (block) => {
          set({ selectedBlock: block });
        },

        setIsRouteEmpty: (isRouteEmpty) => {
          set({ isRouteEmpty: isRouteEmpty });
        },

        setSelectedFlowStep: (flowStep) => {
          set({ selectedFlowStep: flowStep });
        },

        setRouteName: (name) => {
          set({ routeName: name });
        },

        setRouteDescription: (description) => {
          set({ routeDescription: description });
        },

        setCurrentRouteScreen: (screen) => {
          set({ currentRouteScreen: screen });
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

        setFlowStepForm: (form) => {
          if (form === undefined) {
            set({ flowStepForm: undefined });

            return;
          }
          set((state) => ({
            flowStepForm: {
              ...state.flowStepForm,
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
        isMenuCollapsed: state.isMenuCollapsed,
      }),
    },
  ),
);
