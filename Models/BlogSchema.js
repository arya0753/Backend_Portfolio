import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // fixed typo: `require` → `required`
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // store only filename here
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Virtual field for full photo URL
PostSchema.virtual("photoUrl").get(function () {
  if (!this.photo) return null;

  const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`;
  return `${BASE_URL}/uploads/${this.photo}`;
});

// ✅ Ensure virtuals are included in JSON responses
PostSchema.set("toJSON", { virtuals: true });
PostSchema.set("toObject", { virtuals: true });

export default mongoose.model("Post", PostSchema);
