"use client";
import { create } from "zustand";

import { IUser } from "../data/data";

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
}

export enum IOrgschemaMenuSection {
  ROUTES = "ROUTES",
  SCHEMAS = "SCHEMAS",
  NONE = "NONE",
}

export interface IOrgschemaMenu {
  orgboardIsLoading: boolean;
  readonlyInfo: boolean;
  isMenuCollapsed: boolean;
  currentUser?: IUser;
  blockForm?: Partial<INodeData>;
  currentInfoManageScreen: IInfoManageScreen;
  currentStep: IOrgschemaMenuSteps;
  currentSection: IOrgschemaMenuSection;
  activeSchemaId: number | undefined;
  currentActionManageScreen: IActionManageScreen;
  loadedSchema: ISchema | undefined;
  selectedBlock?: INodeNoChildren;
  currentRoute: number | null;
  currentManageScreen: IManageScreen;
  schemaInputValue: string;
  zoomCount: number;

  setZoomCount: (value: number) => void;
  setSection: (section: IOrgschemaMenuSection) => void;
  setRoute: (route: number) => void;
  setStep: (step: IOrgschemaMenuSteps) => void;
  setLoadedSchema: (loadedSchema: ISchema | undefined) => void;
  setActiveSchemaId: (id: number | undefined) => void;
  setSelectedBlock: (block: INodeNoChildren | undefined) => void;
  setBlockForm: (form: Partial<INodeData> | undefined) => void;
  setManageScreen: (manageScreen: IManageScreen) => void;
  setActionManageScreen: (action: IActionManageScreen) => void;
  setInfoManageScreen: (info: IInfoManageScreen) => void;
  setOrgboardIsLoading: (isLoading: boolean) => void;
  setCurrentUser: (user: IUser | undefined) => void;
  setSchemaInputValue: (value: string) => void;
  setIsMenuCollapsed: (isMenuCollapsed: boolean) => void;
}

export const useOrgschemaMenu = create<IOrgschemaMenu>((set) => {
  const initialState = {
    ...loadStateFromLocalStorage(),
    readonlyInfo: true,
    currentInfoManageScreen: IInfoManageScreen.BLOCK,
    currentManageScreen: IManageScreen.EMPTY,
    currentActionManageScreen: IActionManageScreen.INFO,
    orgboardIsLoading: false,
    schemaInputValue: "",
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
    setOrgboardIsLoading: (isLoading) => {
      set({ orgboardIsLoading: isLoading });
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
    setCurrentUser: (user) => {
      set({ currentUser: user });
    },
    setSchemaInputValue: (value) => {
      set({ schemaInputValue: value });
    },
    setZoomCount: (newZoom) => {
      // Исправлено здесь
      set((state) => ({ ...state, zoomCount: newZoom }));
      const currentState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
      const updatedState = currentState ? JSON.parse(currentState) : {};

      updatedState.zoomCount = newZoom;
      localStorage.setItem(
        SCHEMA_MENU_LOCALSTORAGE_KEY,
        JSON.stringify(updatedState),
      );
    },
    setIsMenuCollapsed: (isMenuCollapsed) => {
      set({ isMenuCollapsed: isMenuCollapsed });
    },
  };
});
