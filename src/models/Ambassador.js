import mongoose from "mongoose";

const AmbassadorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        contact: {
            type: String,
            required: [true, "Contact number is required"],
        },
        college: {
            type: String,
            required: [true, "College name is required"],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Ambassador || mongoose.model("Ambassador", AmbassadorSchema);
