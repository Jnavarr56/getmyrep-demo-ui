import axios from "axios";
import { ADDRESS_MATCHES_API_URL } from "../../config/server";

export const fetchAddressMatches = async (coords) => {
  return axios
    .get(ADDRESS_MATCHES_API_URL, { params: coords })
    .then(({ data }) => data.address_matches);
};
