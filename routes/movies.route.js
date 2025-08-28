import express from "express";
import {
  getMovie,
  // getMovieFile,
  movieCreate,
  movieDelete,
  movieUpdate,
  postMovie,
  uploadFile,
} from "../controllers/movie.controller.js";

const router = express.Router();


//the first get route, will only get triggered.
// router.get("/:id", getMovieFile);
router.get("/getMovie", getMovie);


// router.post("/", uploadFile, movieCreate);

router.post("/postMovie", postMovie);

router.put("/:id", movieUpdate);

router.delete("/:id", movieDelete);

export default router;
