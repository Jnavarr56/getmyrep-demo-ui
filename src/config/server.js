import PropTypes from "prop-types";

export const ADDRESS_MATCHES_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/geocode"
    : process.env.ADDRESS_MATCHES_API_URL;

export const COORDS_SHAPE = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});
export const ADDRESS_DATA_SHAPE = PropTypes.shape({
  address: PropTypes.string,
  coords: COORDS_SHAPE,
});
export const ADDRESS_MATCHES_SHAPE = PropTypes.arrayOf(ADDRESS_DATA_SHAPE);
