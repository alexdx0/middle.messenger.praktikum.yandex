/**
 * Функция для отслеживания клика вне HTML-элемента и выполнения коллбэка по этому событию.
 * @param element HTML-элемент, клики вне которого необходимо обработать
 * @param onClickOutside Коллбэк, выполняемый при клике вне HTML-элемента {@link element}
 * @returns Функция отписки от события, которую нужно вызвать для удаления обработчиков
 */
// TODO remove
export const UseClickOutside = (element: HTMLElement | null, onClickOutside: () => void) => {
  const handler = (e: MouseEvent) => {
    if (!element?.contains(e.target as HTMLElement) && !(e.target as HTMLElement).contains(element)) {
      onClickOutside();
    }
  };
  function disposer() {
    document.removeEventListener("click", handler);
  }
  document.addEventListener("click", handler);
  return disposer;
};
