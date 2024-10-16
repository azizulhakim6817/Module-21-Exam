import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// upload-SingleFile-Service.................
export const uploadSingleFileService = async (req) => {
  try {
    const uploadedFile = req.files.file;

    const uploadPath = path.join(
      __dirname,
      "../../uploads",
      Date.now() + "-" + uploadedFile.name
    );

    await uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        return {
          status: true,
          data: "Error occurred while uploading the file.",
        };
      }
    });
    return { status: true, data: "File uploaded successfully!" };
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};

// Read-UploadFile-Service.................
export const readUploadFileService = (req, res) => {
  try {
    const filename = req.params.fileName;
    const filePath = path.join(__dirname, "../../uploads", filename);
    return filePath;
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};

//delete-SingleFile-Service...........
export const deleteSingleFileService = (req, res) => {
  try {
    const filename = req.params.fileName;

    const filePath = path.join(__dirname, "../../uploads", filename);
    //delet => fs.unlink...........
    if (fs.existsSync(filePath) === true) {
      fs.unlink(filePath, (err) => {
        if (err !== null) {
          return { status: false, data: "Error Deleting File!" };
        }
      });
      return { status: true, data: "File deleted successfully!" };
    } else {
      return { status: false, data: "File not found!" };
    }
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};
