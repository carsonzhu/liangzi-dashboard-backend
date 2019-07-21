"use strict";
import multer from "multer";

const upload = multer({
  limits: { fileSize: process.env.MULTER_FILESIZE_LIMIT }
});

export { upload };
