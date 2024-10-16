import usersModel from "../model/usersModel.js";
import mongoose from "mongoose";
import { EncodeToken } from "./../utility/tokenUtility.js";
import md5 from "md5";
import bcrypt from "bcrypt";
import studentUserModul from "../model/usersModel.js";
const ObjectId = mongoose.Types.ObjectId;

//StudentregisterService................................................
export const StudentregisterService = async (req) => {
  try {
    let reqBody = req.body;

    //md5 ........................................
    reqBody.password = md5(reqBody.password);

    // Hash the password using bcrypt ............
    /* const saltRounds = 10;
    reqBody.password = await bcrypt.hash(reqBody.password, saltRounds); */

    let data = await usersModel.create(reqBody);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//StudentLoginService....................................................
export const StudentLoginService = async (req, res) => {
  try {
    let { email, password } = req.body;

    let data = await studentUserModul.aggregate([
      { $match: { email, password } },
      { $project: { _id: 1, email: 1 } },
    ]);

    if (data.length > 0) {
      let token = EncodeToken(data[0]["email"]);

      // Set cookie
      let options = {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("Token", token, options);
      return { status: "success", token: token, data: data[0] };
    } else {
      return { status: "unauthorized", data: data };
    }
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//StudentProfileReadService.........................................
export const StudentProfileReadService = async (req) => {
  let email = req.headers.email;
  try {
    let MatchStage = {
      $match: {
        email,
      },
    };

    let project = {
      $project: {
        email: 1,
        firstName: 1,
        lastName: 1,
        img: 1,
        phone: 1,
      },
    };

    let data = await studentUserModul.aggregate([MatchStage, project]);

    return { status: "success", data: data[0] };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//update data ......................................................
export const updateStudentService = async (req) => {
  let id = req.params.id;
  let query = { _id: id };
  let updateData = req.body;

  try {
    let data = await studentUserModul.updateOne(query, updateData);
    return { status: "Success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

//StuentLogoutService....................................................
export const StuentLogoutService = async (res) => {
  try {
    res.clearCookie("Token");
    return { status: "success" };
  } catch (error) {
    return { status: "error", error: error.toString() };
  }
};
