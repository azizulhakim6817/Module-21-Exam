import {
  deleteSingleFileService,
  readUploadFileService,
  uploadSingleFileService,
} from "../service/FileService.js";

export const uploadSingleFile = async (req, res) => {
  let result = await uploadSingleFileService(req);
  return res.status(200).json(result);
};

export const readUploadFile = (req, res) => {
  let result = readUploadFileService(req, res);
  return res.sendFile(result);
};

export const deleteSingleFile = (req, res) => {
  let result = deleteSingleFileService(req, res);
  return res.status(200).json(result);
};
