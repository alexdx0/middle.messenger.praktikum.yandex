import { FormInput } from "@components/FormInput";

// TODO remove
export const formDataLogger = (refs: Record<string, FormInput>, e: MouseEvent) => {
  e.preventDefault();

  const formData = Object.fromEntries(Object.entries(refs)
    .map(([name, input]) => [name, input.value()]));

  console.log(formData);

  if (Object.values(formData).some(x => !x)) {
    e.stopPropagation();
  }
};
