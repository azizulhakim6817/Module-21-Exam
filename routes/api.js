import express from "express";
const router = express.Router();
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as UsersController from "../app/controllers/UsersController.js";
import * as FileController from "../app/controllers/FileController.js";

// Users..............................................................
router.post("/student-register", UsersController.register);
router.post("/student-login", UsersController.login);
router.get(
  "/student-profile-read",
  AuthMiddleware,
  UsersController.profileRead
);
router.get("/logout", AuthMiddleware, UsersController.logout);
router.post(
  "/updateStudent/:id",
  AuthMiddleware,
  UsersController.updateStudent
);

//file upload .............
router.post("/upload-single-file", FileController.uploadSingleFile);
router.get("/read-file/:fileName", FileController.readUploadFile);
router.delete("/delete-single-file/:fileName", FileController.deleteSingleFile);

export default router;
