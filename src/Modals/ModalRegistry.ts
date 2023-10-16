import { InfoModalParams } from "@models/InfoModalParams";

import { InfoModal } from "./InfoModal";

export const ModalRegistry = {
  "info-modal": InfoModal,
};
export interface ModalRegistryTypes {
  "info-modal": InfoModalParams,
}

export type ModalKey = Extract<keyof ModalRegistryTypes, string>;
