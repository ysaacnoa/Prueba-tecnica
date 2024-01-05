import { useState, useEffect } from "react";
import { transformCountryName } from "../logic/getCountryName";

const API_KEY = import.meta.env.VITE_API_KEY;

//endpoint :`https://pixabay.com/api/?key=${API_KEY}&q=${encodedCountryName}+${imageType}&image_type=all`

export function useImages({ countries }) {
  const [flagImages, setFlagImages] = useState({});
  const [cityImages, setCityImages] = useState({});

  useEffect(() => {
    const getImages = async (imageType) => {
      const setImageState = imageType === 'flag' ? setFlagImages : setCityImages;
      const storageKey = imageType === 'flag' ? 'flagImages' : 'cityImages';
      
      const storedImages = localStorage.getItem(storageKey);
      if (storedImages) {
        setImageState(JSON.parse(storedImages));
        return;
      }

      try {
        const imagePromises = countries.map(async (country) => {
          try {
            const encodedCountryName = transformCountryName(country.name);
            const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodedCountryName}+${imageType}&image_type=all`);
            if (!response.ok) {
              throw new Error(`Network response for ${country.name} was not ok`);
            }
            const data = await response.json();
            const imageUrl = data.hits.length > 0 ? data.hits[0].webformatURL : null;
            return { country: country.name, imageUrl };
          } catch (error) {
            console.error(`Error fetching ${imageType} image for ${country.name}:`, error);
            return { country: country.name, imageUrl: null };
          }
        });

        const imagesData = await Promise.allSettled(imagePromises);
        const imagesObject = imagesData.reduce((acc, item) => {
          acc[item.country] = item.imageUrl;
          return acc;
        }, {});

        setImageState(imagesObject);
      } catch (error) {
        console.error(`Error fetching ${imageType} images:`, error);
      }
    };

    getImages('flag');
    getImages('city');
  }, [countries]);

  return { flagImages, cityImages };
}