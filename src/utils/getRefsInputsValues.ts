import { FormInput } from "@components/FormInput";

/**
 * Функция получения значений ref-полей
 * @param refs Объект с именовынными рефами инпутов
 * @returns Объект со значениями инпутов
 */
export function getRefsInputsValues<T extends string>(refs: Record<T, FormInput>) {
  return Object.fromEntries(Object.entries(refs)
    .map(([name, input]) => [name, (input as FormInput).value()])) as Record<keyof typeof refs, string>;
}
