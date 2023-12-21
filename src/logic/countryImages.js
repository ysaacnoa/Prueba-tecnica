

export const getFlagImages = async (countries, setFlagImages, transformCountryName, apiKey) => {
  try {
    const storedFlagImages = localStorage.getItem('flagImages');
    if (storedFlagImages) {
      setFlagImages(JSON.parse(storedFlagImages));
    } else {
      const flagImagePromises = countries.map(async (country) => {
        try {
          const encodedCountryName = encodeURIComponent(transformCountryName(country.name));
          const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodedCountryName}+flag&image_type=all`);
          if (!response.ok) {
            throw new Error(`Network response for ${country.name} was not ok`);
          }
          const data = await response.json();
          const imageUrl = data.hits.length > 0 ? data.hits[0].webformatURL : null;
          return { country: country.name, imageUrl };
        } catch (error) {
          console.error(`Error fetching flag image for ${country.name}:`, error);
          return { country: country.name, imageUrl: null };
        }
      });

      const flagImagesData = await Promise.all(flagImagePromises);
      const imagesObject = flagImagesData.reduce((acc, item) => {
        acc[item.country] = item.imageUrl;
        return acc;
      }, {});

      setFlagImages(imagesObject);
      localStorage.setItem('flagImages', JSON.stringify(imagesObject));
    }
  } catch (error) {
    console.error('Error fetching flag images:', error);
  }
};


export const getCityImages = async (countries, setCityImages, transformCountryName, apiKey) => {
  try {
    const cityImagePromises = countries.map(async (country) => {
      try {
        const encodedCountryName = encodeURIComponent(transformCountryName(country.name));
        const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodedCountryName}+city&image_type=all`);
        if (!response.ok) {
          throw new Error(`Network response for ${country.name} was not ok`);
        }
        const data = await response.json();
        const imageUrl = data.hits.length > 0 ? data.hits[0].webformatURL : null;
        return { country: country.name, imageUrl };
      } catch (error) {
        console.error(`Error fetching city image for ${country.name}:`, error);
        return { country: country.name, imageUrl: null };
      }
    });

    const cityImagesData = await Promise.all(cityImagePromises);
    const imagesObject = cityImagesData.reduce((acc, item) => {
      acc[item.country] = item.imageUrl;
      return acc;
    }, {});

    setCityImages(imagesObject);
  } catch (error) {
    console.error('Error fetching city images:', error);
  }
};