export interface GeocoderFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  'text_en-US': string;
  'language_en-US': string;
  'place_name_en-US': string;
  text: string;
  language: string;
  place_name: string;
  center: number[];
  bbox: number[];
  geometry: Geometry;
  context?: ContextEntity[] | null;
}
export interface Properties {
  mapbox_id: string;
  short_code?: string;
}
export interface Geometry {
  type: string;
  coordinates?: number[] | null;
}
export interface ContextEntity {
  id: string;
  mapbox_id: string;
  wikidata: string;
  'text_en-US': string;
  'language_en-US': string;
  text: string;
  language: string;
  short_code?: string | null;
}

export enum GeocoderDataTypes {
  country = 'country',
  region = 'region',
  place = 'place',
  district = 'district',
  postcode = 'postcode',
  locality = 'locality',
  neighborhood = 'neighborhood',
}
