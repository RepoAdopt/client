function getConfigValue(key: string) {
  let value = "";
  if (process.env && process.env[`${key}`] !== undefined) {
    // get env var value
    return process.env[`${key}`];
  }
  return value;
}

export default getConfigValue;
