const logError = (err: Error, propertyName: string): void => {
  console.log(`${propertyName} has ${err}.`);
};

export default logError;
