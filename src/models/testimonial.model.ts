import { model, Schema } from "mongoose";

export const TESTIMONIAL_DB_REF = "testimonials";

export interface ITestimonial {
  name: string;
  role: string;
  quote: string;
  status: string;
  slug: string;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const TestimonialModel = model<ITestimonial>(
  TESTIMONIAL_DB_REF,
  testimonialSchema
);
