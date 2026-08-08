import mongoose from "mongoose";

// 1. Define the schema for the Note model
// 2. Create a Mongoose model based on the schema

const noteSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
  }, 
  {timestamps: true}, // createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
