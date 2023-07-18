import { object, string, array, number, boolean, date } from 'yup';

export const rentFormFieldsValidationSchema = object({
  category: string().required('Select a category.'),
  address: object()
    .shape({
      placeName: string().optional().required('A placeName is required'),
      countryCode: string().optional().required('A countryCode is required'),
      country: string().optional().required('A country is required'),
      location: object()
        .shape({
          coordinates: array(number().required()).required(
            'Coordinates are required'
          ),
        })
        .optional()
        .required('Location is required'),
      mapboxId: string().optional().required('A mapboxId is required'),
    })
    .optional()
    .required('Address is required'),
  guestCount: number().positive().required(),
  roomCount: number().positive().required(),
  bathroomCount: number().positive().required(),
  imageSrc: string().url('Image url not valid').required('Upload an image'),
  title: string().required('Add a title to property'),
  description: string().required('Add a descrption to property.'),
  price: number()
    .min(5, 'Minimum of 5$ per night.')
    .required('Put a price to your listing.'),
});

export const searchFormFieldsValidationSchema = object({
  address: object()
    .shape({
      placeName: string().optional().required('A placeName is required'),
      countryCode: string().optional().required('A countryCode is required'),
      country: string().optional().required('A country is required'),
      location: object()
        .shape({
          coordinates: array(number().required()).required(
            'Coordinates are required'
          ),
        })
        .optional()
        .required('Location is required'),
      mapboxId: string().optional().required('A mapboxId is required'),
    })
    .optional()
    .required('Address is required'),
  guestCount: number().positive().required(),
  roomCount: number().positive().required(),
  bathroomCount: number().positive().required(),
  startDate: date().optional().required('Select a start date.'),
  endDate: date().optional().required('Select an end date.'),
});
