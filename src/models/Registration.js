import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
});

const RegistrationSchema = new mongoose.Schema(
    {
        day: { type: String, required: true },
        members: { type: [MemberSchema], required: true },
        selectedEvents: { type: [String], default: [] },
        referral: { type: String, default: "" },
        needsAccommodation: { type: Boolean, default: false },
        totalAmount: { type: String, required: true },
        paymentProofUrl: { type: String, required: true },
        taxAmount: { type: String },
        discountedPrice: { type: String },
        totalPrice: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Registration ||
    mongoose.model("Registration", RegistrationSchema);
