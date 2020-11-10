export const isCoordsLoaded = (input) => {
  const coords = input.coords || input;
  return coords.lat !== null && coords.lng !== null;
};

export const isAddressMatchesLoaded = (input) => {
  const addressMatches = input.addressMatches || input;
  return addressMatches.length > 0;
};

export const isSelectedIndexLoaded = (input) => {
  const selectedAddressIndex =
    input.selectedAddressIndex !== undefined
      ? input.selectedAddressIndex
      : input;
  return selectedAddressIndex !== null;
};
