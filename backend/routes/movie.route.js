import express from "express";
import {
    getMovieCategoryById,
    getMovieDetailsById,
    getMovieSimilarById,
    getMovieTrailersById,
    getTrendingMovie,
} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailersById);
router.get("/:id/details", getMovieDetailsById);
router.get("/:id/similar", getMovieSimilarById);
router.get("/:category", getMovieCategoryById);

export default router;
