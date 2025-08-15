import { model, Schema } from "mongoose";

export const HERO_DB_REF = "heros";

export interface IHero {
  title: string;
  subtitle: string;
  image: {
    public_id: string;
    secure_url: string;
  };
  status: string;
  oldImagePublicId?: string;
  slug: string;
}

const heroSchema = new Schema<IHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const HeroModel = model<IHero>(HERO_DB_REF, heroSchema);
