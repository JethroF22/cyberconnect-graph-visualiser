export const ethereumAddressRegexPattern = /^0x[a-fA-F0-9]{40}$/;

export const validateAddresses = (value: string): boolean => {
  if (value.match(ethereumAddressRegexPattern)) return true;

  return false;
};
