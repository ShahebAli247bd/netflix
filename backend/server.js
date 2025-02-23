import express from "express";
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import AuthRouters from "./routes/auth.route.js";
import MovieRouters from "./routes/movie.route.js";
import TVShowRouter from "./routes/tvshow.route.js";
import { ProtectedRoute } from "./middleware/ProtectedRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = ENV_VARS.PORT;

//Default Route
app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align:center; height:100vh; align-items:center; display:flex; justify-content:center'>Welcome to Netflix API Backend</h1>"
    );
});

//Auth Router here
app.use("/api/v1/auth", AuthRouters);

//TMDB Movie Router here
app.use("/api/v1/movie", ProtectedRoute, MovieRouters);

//TMDB TVShow Router here
app.use("/api/v1/tv", ProtectedRoute, TVShowRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});
