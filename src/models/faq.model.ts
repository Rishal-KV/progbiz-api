import { model, Schema } from "mongoose";

export const FAQ_DB_REF = "faqs";

export interface IFaq {
  question: string;
  answer: string;
  status: string;
  slug: string;
}

const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const FaqModel = model<IFaq>(FAQ_DB_REF, faqSchema);
