/** Получение даты из строки */
export const toDate = (value: Date | string): Date => {
  const date = new Date(value);
  return date.getFullYear() > 1 ? date : new Date();
};

export const formatDate = (value?: Date | string) => {
  if (!value) {
    return "";
  }
  const date = toDate(value);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const formatTime = (value?: Date | string) => {
  if (!value) {
    return "";
  }
  const date = toDate(value);
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDateTime = (value?: Date | string) => {
  if (!value) {
    return "";
  }
  return `${formatDate(value)} ${formatTime(value)}`;
};
