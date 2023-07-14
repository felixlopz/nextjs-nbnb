import { Address, Location } from '@/types/address';
import {
  ContextEntity,
  GeocoderDataTypes,
  GeocoderFeature,
} from '@/types/geocoder';

//  "address": {
//     "street": "Porto, Porto, Portugal",
//     "suburb": "",
//     "government_area": "Cedofeita, Ildefonso, Sé, Miragaia, Nicolau, Vitória",
//     "market": "Porto",
//     "country": "Portugal",
//     "country_code": "PT",
//     "location": {
//       "type": "Point",
//       "coordinates": [
//         {
//           "$numberDouble": "-8.61308"
//         },
//         {
//           "$numberDouble": "41.1413"
//         }
//       ],
//       "is_location_exact": false
//     }
//   },

export const getLocationFromGoecoderFeatureCenter = (
  center: number[]
): Location => {
  const [lng, lat] = center;
  return {
    coordinates: [lat, lng],
    isExactLocation: false,
  };
};

export const getAddressFromGeocoderFeature = (
  feature: GeocoderFeature
): Address => {
  const baseAddress: Address = {
    country: '',
    countryCode: '',
    location: {
      coordinates: [0, 0],
      isExactLocation: false,
    },
    mapboxId: '',
    placeName: '',
  };

  const location = getLocationFromGoecoderFeatureCenter(feature.center);

  const [type] = feature.id.split('.');
  if (type !== GeocoderDataTypes.country) {
    Object.assign(baseAddress, {
      [type]: feature['text_en-US'],
    });
  }

  if (feature.context == null) {
    const countryCode = feature.properties.short_code || '_';
    const country = feature['place_name_en-US'];
    Object.assign(baseAddress, { country, countryCode });
  } else {
    feature.context.forEach((ctx: ContextEntity) => {
      const [type] = ctx.id.split('.');

      if (type === GeocoderDataTypes.country) {
        Object.assign(baseAddress, {
          countryCode: ctx.short_code,
        });
      }
      Object.assign(baseAddress, {
        [type]: ctx['text_en-US'],
      });
    });
  }

  return {
    ...baseAddress,
    placeName: feature['place_name_en-US'],
    location,
    mapboxId: feature.id,
  };
};
