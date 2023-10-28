const { DEV } = import.meta.env;

export const isDev = (): boolean => {
  return DEV;
};
