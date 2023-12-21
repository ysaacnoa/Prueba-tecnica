

export const transformCountryName = (name) => {
  //transformaciones para mejorar la ocurrencia de nulls en al busqueda
  return name.replace(/\s+/g, '+'); 
};