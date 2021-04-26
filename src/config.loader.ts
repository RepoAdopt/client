function getConfigValue(key: string) {
  if (process.env && process.env[`${key}`] !== undefined) {
    // get env var value
    console.log("getting env variable");
    console.log(key + ": " + process.env[`${key}`]);
    return process.env[`${key}`];
  }
  return undefined;
}

export default getConfigValue;
