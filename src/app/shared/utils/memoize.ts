export const memoize = (fnc) => {
  const cache = new Map();
  return (...args) => {
    const cachedResult = cache.get(args);
    if (cachedResult) {
      return cachedResult;
    } else {
      const result = fnc(args);
      cache.set(args, result);
    }
  };
};
