

export const transformCountryName = (name) => {
  const encodedCountryName = encodeURIComponent(name.replace(/\s+/g, '+'));
  return encodedCountryName;
};