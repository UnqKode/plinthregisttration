import { z } from "zod";

export const MemberSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    college: z.string().min(2, "College name is too short").max(200),
    contact: z.string()
        .min(10, "Contact must be valid")
        .max(15)
        .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
    email: z.string().email("Invalid email address"),
});

export const RegistrationSchema = z.object({
    day: z.string().min(1, "Day selection is required"),
    members: z.array(MemberSchema).min(1, "At least one member is required"),
    selectedEvents: z.array(z.string()).optional(),
    referral: z.string().max(50).optional().or(z.literal("")),
    needsAccommodation: z.boolean().optional(),
    totalAmount: z.string().or(z.number()),
    paymentProofUrl: z.string().url("Invalid payment proof URL"),
    // Additional fields that might be passed
    taxAmount: z.string().or(z.number()).optional(),
    totalPrice: z.string().or(z.number()).optional(),
});
