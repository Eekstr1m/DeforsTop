import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
// export const upload = multer({ storage });

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const imageFolderName = req.body.title.split(" ").join("_");
      // const path = `uploads/${req.body.title}`;
      const path = `public/assets/${imageFolderName}`;
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
