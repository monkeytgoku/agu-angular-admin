/**
 * Defines the adatper function to modify the API response suitable for the app
 * target: the prototype of the class
 * key: the name of the property
 * @param adapterFunc - function to be called
 */
export function Adapter(adapterFunc) {
  return (target: any, key: string, descriptor: any) => {
    console.log('Adapter decorator::', target, key, descriptor);
    descriptor.value = adapterFunc || null;
    return descriptor;
  };
}
