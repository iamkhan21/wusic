export const debounce = (func: Function, delay: number) => {
  let inDebounce: NodeJS.Timeout;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export const throttle = (func: Function, limit: number) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

function addLeadingZero(num: number): string {
  return `${num}`.padStart(2, "0");
}

export const secondsToHRtime = (seconds: number): string => {
  if (!seconds) return "Loading...";

  const h = addLeadingZero(Math.floor(seconds / 3600));
  const m = addLeadingZero(Math.floor((seconds % 3600) / 60));
  const s = addLeadingZero(Math.floor((seconds % 3600) % 60));

  return `${h}:${m}:${s}`;
};
