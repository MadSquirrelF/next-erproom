import { create } from "zustand";

import { ISchema } from "@/src/entities/Schema";
import { loadStateFromLocalStorage } from "@/src/shared/utils/getSchemaFromLS/getSchemaFromLS";
import { SCHEMA_MENU_LOCALSTORAGE_KEY } from "@/src/shared/constants/constants";

export enum IOrgschemaMenuSteps {
  SECTION = "SECTION",
  LIST = "LIST",
  MANAGE = "MANAGE",
}

export enum IOrgschemaMenuSection {
  ROUTES = "ROUTES",
  SCHEMAS = "SCHEMAS",
  NONE = "NONE",
}

export interface IOrgschemaMenu {
  currentStep: IOrgschemaMenuSteps;
  currentSection: IOrgschemaMenuSection;
  activeSchemaId: number | undefined;
  loadedSchema: ISchema | undefined;
  selectedBlockId: number | undefined;
  currentRoute: number | null;

  setSection: (section: IOrgschemaMenuSection) => void;
  setRoute: (route: number) => void;
  setStep: (step: IOrgschemaMenuSteps) => void;
  setLoadedSchema: (loadedSchema: ISchema) => void;
  setActiveSchemaId: (id: number) => void;
  setSelectedBlockId: (id: number | undefined) => void;
}

export const useOrgschemaMenu = create<IOrgschemaMenu>((set) => {
  const initialState = {
    ...loadStateFromLocalStorage(), // Загружаем состояние из localStorage
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
    setSelectedBlockId: (id) => {
      set({ selectedBlockId: id });
    },
    setLoadedSchema: (loadedSchema) => {
      set({ loadedSchema });

      const currentState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
      const updatedState = currentState ? JSON.parse(currentState) : {};

      updatedState.loadedSchema = loadedSchema;
      localStorage.setItem(
        SCHEMA_MENU_LOCALSTORAGE_KEY,
        JSON.stringify(updatedState),
      );
    },
  };
});
