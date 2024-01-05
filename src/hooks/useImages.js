import { useState, useEffect } from "react";
import { transformCountryName } from "../logic/getCountryName";

const API_KEY = import.meta.env.VITE_API_KEY;

//endpoint :`https://pixabay.com/api/?key=${API_KEY}&q=${encodedCountryName}+${imageType}&image_type=all`


export function useImages({ countries }) {
  const [images, setImages] = useState({ flagImages: {}, cityImages: {} });

  useEffect(() => {
    const getImages = (imageType) => {
      const imagePromises = countries.map((country) => {
        const encodedCountryName = transformCountryName(country.name);
        return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodedCountryName}+${imageType}&image_type=all`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response for ${country.name} was not ok`);
            }
            return response.json();
          })
          .then((data) => {
            const imageUrl = data.hits.length > 0 ? data.hits[0].webformatURL : null;
            return { country: country.name, imageUrl };
          })
          .catch((error) => {
            console.error(`Error fetching ${imageType} image for ${country.name}:`, error);
            return { country: country.name, imageUrl: null };
          });
      });

      Promise.all(imagePromises)
        .then((imagesData) => {
          const newImages = { ...images };
          imagesData.forEach((item) => {
            if (imageType === 'flag') {
              newImages.flagImages[item.country] = item.imageUrl;
            } else {
              newImages.cityImages[item.country] = item.imageUrl;
            }
          });
          setImages(newImages);
        })
        .catch((error) => {
          console.error(`Error fetching ${imageType} images:`, error);
        });
    };

    getImages('flag');
    getImages('city');
  }, [countries]);

  const { flagImages, cityImages } = images;
  return { flagImages, cityImages };
}
