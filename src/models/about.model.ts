import { model, Schema } from "mongoose";

export const ABOUT_DB_REF = "abouts";

export interface IAbout {
  heading: string;
  description: string;
  status: string;
  slug: string;
}

const aboutSchema = new Schema<IAbout>(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

export const AboutModel = model(ABOUT_DB_REF, aboutSchema);
