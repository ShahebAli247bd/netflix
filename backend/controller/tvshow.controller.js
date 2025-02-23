import { ENV_VARS } from "../config/envVars.js";
import { fetchMovieApiFromTMDB } from "../services/tmdb.service.js";

/**
 * getTrendingTVShow
 * @param {Header Object} req
 * @param {Header Object} res
 * @return Trending tv show
 */
export const getTrendingTVShow = async (req, res) => {
    try {
        const data = await fetchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/trending/tv/day?language=en-US`
        );
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getTrailerByIdTVShow
 * @param {Header Object} req
 * @param {Header Object} res
 * @returns Trailer By ID TV Show
 */
export const getTVShowTrailerById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/tv/${id}/videos?langauge=en-US`
        );
        console.log(data);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getSimilarByIdTVShow
 * @param {Header Object} req
 * @param {Header Object} res
 * @returns Similar TV Show by ID
 */
export const getTVShowSimilarById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/tv/${id}/similar?language=en-US`
        );
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getTVShowDetailsById
 * @param {*} req
 * @param {*} res
 * @returns details by id
 */
export const getTVShowDetailsById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/tv/${id}?language=en-US`
        );
        console.log(data);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getTVShowCategoryById
 * @param {*} req
 * @param {*} res
 * @returns category by id
 */
export const getTVShowCategoryById = async (req, res) => {
    const { category } = req.params;
    console.log(category);
    try {
        const data = await fetchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/tv/${category}?language=en-US`
        );
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
