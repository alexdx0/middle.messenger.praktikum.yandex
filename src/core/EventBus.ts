export type Listener<T extends unknown[] = unknown[]> = (...args: T) => void;

// TODO types
export default class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, unknown[]>> {
  private listeners: { [key in E]?: Array<Listener<M[E]>> } = {};

  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach(listener => listener(...args));
  }
}
