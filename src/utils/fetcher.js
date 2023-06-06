/* eslint-disable no-useless-catch */
import axios from "axios";

const fetcher = async (opts) => {
  try {
    const response = await axios({ ...opts });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default fetcher;
