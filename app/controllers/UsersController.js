import {
  StuentLogoutService,
  StudentLoginService,
  StudentProfileReadService,
  StudentregisterService,
  updateStudentService,
} from "./../service/UserServices.js";

//! Stuent Register service
export const register = async (req, res) => {
  let result = await StudentregisterService(req);
  return res.json(result);
};

//! Stuent Login Service
export const login = async (req, res) => {
  let result = await StudentLoginService(req, res);
  return res.json(result);
};

//! Stuent Porfiel Read Service
export const profileRead = async (req, res) => {
  let result = await StudentProfileReadService(req);
  return res.json(result);
};

//! update Student Service Service
export const updateStudent = async (req, res) => {
  let result = await updateStudentService(req);
  return res.json(result);
};

//! Logut Service
export const logout = async (req, res) => {
  let result = await StuentLogoutService(res);
  return res.json(result);
};
