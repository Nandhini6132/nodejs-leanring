import multer from "multer";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import movie from "../modules/movie.module.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads";
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Save with original file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const uploadFile = upload.single("file");

// Simulate a database
const filesDB = [];

export const movieCreate = (req, res) => {
  console.log("File db:", filesDB);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Save file details to "database"
  filesDB.push({
    id: filesDB.length + 1,
    path: req.file.path,
    originalName: req.file.originalname,
  });

  res.status(200).json({
    message: "File uploaded",
    fileName: req.file.originalname,
    filePath: req.file.path,
    id: filesDB.length + 1,
  });
};

// export const getMovieFile = (req, res) => {
//     const fileId = parseInt(req.params.id);
//     console.log("Requested File ID:", fileId);
//     console.log("File db:", filesDB);

//     // Find file by ID
//     const file = filesDB.find(f => f.id === fileId);
//     if (!file) {
//         return res.status(404).send("File not found.");
//     }

//     // Send file as response
//     res.sendFile(path.resolve(file.path)); // Resolve the path to an absolute path
// };

export const postMovie = async (req, res) => {
  console.log(req.body);
  const newMovie = new movie({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const movie = await newMovie.save();
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getMovie = async(req, res) => {
  try {
    const allMovies=await movie.find()
    res.json(allMovies)
  } catch (error) {
    res.status(500).json()
  }
};

export const movieUpdate = async(req, res) => {
    try{
        const particularMovie=await movie.findById(req.params.id)

    if(particularMovie!==null){
        const updatedMovie=await movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
        })
        res.json(updatedMovie)
        console.log(updatedMovie,'updatedMovie')
    }else{
        res.status(404).json({message: 'Movie not found'})
    }
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const movieDelete = (req, res) => {
  res.send("Delete Movie");
};
