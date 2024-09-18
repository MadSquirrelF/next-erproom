import { create } from "zustand";

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
  currentSchema: string;
  currentRoute: string;

  setSection: (section: IOrgschemaMenuSection) => void;
  setSchema: (schema: string) => void;
  setRoute: (route: string) => void;
  setStep: (step: IOrgschemaMenuSteps) => void;
}

export const useOrgschemaMenu = create<IOrgschemaMenu>((set) => ({
  currentSection: IOrgschemaMenuSection.NONE,
  currentSchema: "",
  currentRoute: "",
  currentStep: IOrgschemaMenuSteps.SECTION,

  setSection: (section) => set({ currentSection: section }),
  setSchema: (schema) => set({ currentSchema: schema }),
  setRoute: (route) => set({ currentRoute: route }),
  setStep: (step) => set({ currentStep: step }),
}));
