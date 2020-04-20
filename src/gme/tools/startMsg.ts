function startEvent(action: string, ...actions: any[]) {
  window.dispatchEvent(new CustomEvent(action, {
    detail: {
      arg1: actions[0],
      arg2: actions[1]
    }
  }));
}

export default startEvent;