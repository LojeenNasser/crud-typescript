import UserModel from "../models/user"; 

export const findUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error: any) {
    throw new Error("Error fetching user: " + (error as Error).message);
  }
};
