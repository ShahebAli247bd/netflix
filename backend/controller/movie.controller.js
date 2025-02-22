import { fatchMovieApiFromTMDB } from "../services/tmdb.service.js";
import { ENV_VARS } from "./../config/envVars.js";

/**
 * getTrendingMovie
 * @param {Header Object} req
 * @param {Header Object} res
 * @return Trending Movie
 */
export const getTrendingMovie = async (req, res) => {
    try {
        const trendingMovie = await fatchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + "/trending/movie/day?language=en-US"
        );

        const getOneTrendingMovie =
            trendingMovie.results[
                Math.floor(Math.random() * data.results?.length)
            ];

        res.status(200).json({
            success: true,
            content: getOneTrendingMovie,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getMovieTrailers
 * @param {Header Object} req
 * @param {Header Object} res
 * @returns Movie trailer's by ID
 */
export const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fatchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/movie/${id}/videos?language=en-US`
        );
        res.status(200).json({
            success: true,
            trailers: data.results,
        });
    } catch (error) {
        console.log(error.status);
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getMovieDetails
 * @param {Header Object} req
 * @param {Header Object} res
 * @returns Movie Details by ID
 */

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fatchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/movie/${id}?language=en-us`
        );
        console.log(ENV_VARS.TMDB_BASE_URL);
        res.status(200).json({ success: true, details: data });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getSimilarMovie
 * @param {Header Object} req
 * @param {Header Object} res
 * @returns Similar Movie By ID
 */
export const getSimilarMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fatchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/movie/${id}/similar?language=en-US`
        );

        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getMovieByCategory
 * @param {header Object} req
 * @param {header Object} res
 * @returns Movie by Category
 */
export const getMovieByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fatchMovieApiFromTMDB(
            ENV_VARS.TMDB_BASE_URL + `/movie/${category}?language=en-Us&page=1`
        );
        res.status(200).json({ success: true, category: data.results });
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
