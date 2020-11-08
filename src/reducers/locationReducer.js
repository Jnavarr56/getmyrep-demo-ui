export const initialState = {
  coords: { lat: null, lng: null },
  addressMatches: [],
  selectedAddressIndex: null,
};

export const reducer = (state, action) => {
  const { addressMatches, selectedAddressIndex } = action;

  let key, reset;

  switch (action.type) {
    case "SET_COORDS":
      key = "coords";
      break;
    case "RESET_COORDS":
      key = "coords";
      reset = true;
      break;
    case "SET_ADDRESS_AND_MATCHES":
      return { ...state, addressMatches, selectedAddressIndex };
    default:
      throw new Error("Invalid reducer action type");
  }

  const toAlter = { ...initialState };
  toAlter[key] = reset ? initialState[key] : action[key];
  return toAlter;
};
