import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  theme: {
    type: String,
    default: "Default Theme",
  },
  primary: {
    type: String,
    required: true,
  },
  secondary: {
    type: String,
    required: true,
  },
  success: {
    type: String,
    required: true,
  },
  danger: {
    type: String,
    required: true,
  },
  warning: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

export default mongoose.model("themes", ThemeSchema);