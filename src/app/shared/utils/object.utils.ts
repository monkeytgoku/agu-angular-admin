import 'reflect-metadata';

export const convertObject = <T>(outputType, input): T => {
  if (input) {
    const output = new outputType();
    const convertProperties = Reflect.getMetadataKeys(output);

    for (const key of Object.keys(input)) {
      if (convertProperties.includes(key)) {
        if (Array.isArray(input[key])) {
          output[key] = convertList(Reflect.getMetadata(key, output), input[key]);
        } else {
          output[key] = convertObject(Reflect.getMetadata(key, output), input[key]);
        }
      } else {
        output[key] = input[key];
      }
    }
    return output;
  }
};

const convertList = <T>(outputType, list): T => {
  return list.map(input => convertObject(outputType, input));
};
