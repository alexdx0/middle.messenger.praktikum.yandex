import { Block, registerComponent } from "@Core";
import * as Components from "@components";

/**
 * Функция регистрации компонентов
 */
export const RegisterComponents = () => {
  Object.entries(Components).forEach(([name, component]) => {
    registerComponent(name, component as typeof Block);
  });
};
