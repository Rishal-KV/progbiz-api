import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export type TUserRole = "user" | "vendor" | "admin" | "city_admin" | "support";

export interface IUser {
  email: string;
  password: string;

  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

export const USER_DB_REF = "admins";
export const UserModel = mongoose.model(USER_DB_REF, userSchema);
