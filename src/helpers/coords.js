export const isCoordsLoaded = ({ coords }) => {
  return coords.lat !== null && coords.lng !== null;
};

export const isAddressMatchesLoaded = ({ addressMatches }) => {
  return addressMatches.length > 0;
};
