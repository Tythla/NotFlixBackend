import { Router } from "express";
import {
  getPopularMovies,
  getMovieDetail,
  getMovieImages,
  getMovieCasts,
  getMovieVideos,
} from "./movieService";

const router = Router();

router.get("/popular", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  try {
    const data = await getPopularMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular movies", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getMovieDetail(parseInt(id));
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching movie details for ID ${id}`, error });
  }
});

router.get("/:id/images", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getMovieImages(parseInt(id));
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching movie images for ID ${id}`, error });
  }
});

router.get("/:id/casts", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getMovieCasts(parseInt(id));
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching movie casts for ID ${id}`, error });
  }
});

router.get("/:id/videos", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getMovieVideos(parseInt(id));
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching movie videos for ID ${id}`, error });
  }
});

export default router;
