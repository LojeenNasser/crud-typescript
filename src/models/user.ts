import mongoose, { Schema, Document, Model } from "mongoose";

interface UserModel extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel: Model<UserModel> = mongoose.model<UserModel>("User", userSchema);
export default UserModel;
