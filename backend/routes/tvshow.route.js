import express from "express";
import {
    getTrendingTVShow,
    getTVShowCategoryById,
    getTVShowDetailsById,
    getTVShowSimilarById,
    getTVShowTrailerById,
} from "./../controller/tvshow.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTVShow);
router.get("/:id/trailer", getTVShowTrailerById);
router.get("/:id/similar", getTVShowSimilarById);
router.get("/:id/details", getTVShowDetailsById);
router.get("/:category", getTVShowCategoryById);

export default router;
