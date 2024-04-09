type ListenerCallback = (...args: any[]) => void;

const listeners: { [event: string]: ListenerCallback[] } = {};

const subscribe = (event: string, callback: ListenerCallback) => {
  if (!listeners[event]) {
    listeners[event] = [];
  }
  listeners[event].push(callback);
};

const publish = (event: string, ...args: any[]) => {
  if (listeners[event]) {
    listeners[event].forEach(callback => callback(...args));
  }
};

export { subscribe, publish };