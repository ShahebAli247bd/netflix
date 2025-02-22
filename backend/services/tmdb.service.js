import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fatchMovieApiFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + ENV_VARS.TMDB_TOKEN,
        },
    };

    const response = await axios.get(url, options);
    return response.data;
};
