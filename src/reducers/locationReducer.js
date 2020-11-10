export const initialState = {
  coords: { lat: null, lng: null },
  addressMatches: [],
  selectedAddressIndex: null,
};

export const reducer = (state, action) => {
  const { type, coords, addressMatches, selectedAddressIndex } = action;

  switch (type) {
    case "SET_COORDS":
      return { ...state, coords };
    case "RESET_COORDS":
      return { ...state, coords: initialState.coords };
    case "SET_ADDRESS_AND_MATCHES":
      return { ...state, addressMatches, selectedAddressIndex };
    default:
      throw new Error("Invalid reducer action type");
  }
};
