/**
 * Caches returned data of a method, so subsequent calls with the same arguments are faster.
 * *Only works for primitive arguments.*
 */
export function cachedResult(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  const cacheProperty = '_cache';
  const callee: Function = descriptor.value;

  // create cache in function object
  if (!callee[cacheProperty]) callee[cacheProperty] = {};

  // reference function cache
  const cache = callee[cacheProperty];

  // Rewrite the callee
  descriptor.value = function(...args) {
    try {
      // check if arguments are primitive
      args.forEach(function(arg): void {
        if (arg === Object(arg)) {
          throw new Error(
            'Cache decorator can only be used with primitive arguments.'
          );
        }
      });

      // create a cache key from arguments
      const cacheKey = args.join('__');

      // if the cache key has been written to the callee cache, return the result
      if (cache[cacheKey]) {
        return cache[cacheKey];
      }

      // get the result from the callee and save it to it's cache
      const result = callee.apply(this, args);
      cache[cacheKey] = result;

      // return the result
      return result;
    } catch (error) {
      throw error;
    }
  };

  return descriptor;
}
