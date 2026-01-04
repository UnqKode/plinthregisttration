"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useData } from "../../../context/form.context";
import { useEffect, useState } from "react";
import LoadingScreem from "../../../components/Loading";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const router = useRouter();
  const { formData } = useData();
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect back if formData is missing
    if (!formData?.day) {
      router.push("/"); // Redirect to home or form page is safer
    }
  }, [formData, router]);

  // Render nothing or a loader while redirecting
  if (!formData?.day) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading details...
      </div>
    );
  }

  // --- 1. Updated Price Calculations for Clarity ---
  const accommodationCost = formData.needsAccommodation
    ? 200 * formData.members.length
    : 0;
  // totalAmount from context already includes accommodation, so we subtract to show the base
  const registrationCost = parseFloat(formData.totalAmount) - accommodationCost;
  const totalBeforeDiscount = parseFloat(formData.totalAmount);

  // Calculate Discount
  const discountPercent = formData.discountPercent || 0;
  const discountAmount = (totalBeforeDiscount * discountPercent) / 100;

  const totalAfterDiscount = totalBeforeDiscount - discountAmount;
  const taxAmount = totalAfterDiscount * 0.18;
  const totalPrice = totalAfterDiscount + taxAmount;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast("Please upload your payment proof before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok || !uploadResult.url) {
        throw new Error(uploadResult.error || "Payment proof upload failed.");
      }

      const submissionData = {
        ...formData,
        paymentProofUrl: uploadResult.url,
        totalPrice: totalPrice.toString(),
        taxAmount: taxAmount.toString(),
        discountedPrice: totalAfterDiscount.toString(),
      };

      const sheetRes = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const sheetResult = await sheetRes.json();
      if (!sheetRes.ok || sheetResult.status === "error") {
        throw new Error(
          sheetResult.message || "Failed to save to Google Sheets"
        );
      }

      toast("🎉 Form submitted successfully!");
      router.push("/thankyou"); // Redirect to home or success page
    } catch (err) {
      console.error("❌ Submission error:", err);
      toast(`An error occurred: ${err.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingScreem />;
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white p-4 py-6">
        {/* Nebula Background */}
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2000&auto=format&fit=crop"
            alt="Space Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Confirm Your Registration
          </motion.h1>
          <p className="text-center text-gray-400 mb-6 text-sm">Complete your payment to secure your spot at Plinth 2026</p>

          {/* Booking Details */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 mb-6 shadow-lg shadow-purple-500/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-5 text-white border-b border-gray-700/50 pb-3 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Booking Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column: Member Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Team Lead:</span>
                  <span className="font-medium text-right">
                    {formData.members[0]?.name || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">College:</span>
                  <span className="font-medium text-right">
                    {formData.members[0]?.college || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact:</span>
                  <span className="font-medium text-right">
                    {formData.members[0]?.contact || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Day Pass:</span>
                  <span className="font-medium text-right">{formData.day}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Team Size:</span>
                  <span className="font-medium text-right">
                    {formData.members.length} member(s)
                  </span>
                </div>
                {formData.referral &&
                  <div className="flex justify-between">
                    <span className="text-gray-400">Referral Code:</span>
                    <span className="font-medium text-right">
                      {formData.referral}
                    </span>
                  </div>}
              </div>

              {/* Right Column: Price Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Accommodation:</span>
                  <span className="font-medium text-right">
                    {formData.day === "All" ? "Yes" : formData.needsAccommodation ? "Yes" : "No"}
                  </span>
                </div>
                <div className="h-px bg-gray-700/50"></div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Registration Cost:</span>
                  <span className="font-medium text-right">
                    ₹{registrationCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accommodation Cost:</span>
                  <span className="font-medium text-right">
                    ₹{accommodationCost.toFixed(2)}
                  </span>
                </div>
                {/* Discount Row (Only if applied) */}
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span className="">Discount ({discountPercent}%):</span>
                    <span className="font-medium text-right">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-md pt-2 border-t border-gray-700/50">
                  <span className="text-gray-300 font-semibold">
                    Subtotal (After Discount):
                  </span>
                  <span className="font-semibold text-white text-right">
                    ₹{totalAfterDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Taxes (18%):</span>
                  <span className="font-medium text-right">
                    ₹{taxAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-xl pt-3 border-t border-gray-600">
                  <span className="text-white font-bold">Total Price:</span>
                  <span className="font-bold text-green-400 text-right">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Members Table */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 mb-6 shadow-lg shadow-blue-500/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="text-2xl">👥</span>
              Team Members
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-400 font-semibold">
                      S.No
                    </th>
                    <th className="text-left py-3 text-gray-400 font-semibold">
                      Member
                    </th>
                    <th className="text-left py-3 text-gray-400 font-semibold">
                      College
                    </th>
                    <th className="text-left py-3 text-gray-400 font-semibold">
                      Events
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.members.map((member, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">{index + 1}</td>
                      <td className="py-3 font-medium">{member.name}</td>
                      <td className="py-3 text-gray-300">{member.college}</td>
                      <td className="py-3">
                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">
                          {formData.selectedEvents.join(", ") || "None"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* MUN Pricing Notice */}
          {formData.selectedEvents?.includes("mun") && (
            <motion.div
              className="bg-orange-500/10 backdrop-blur-xl rounded-2xl p-5 border border-orange-500/30 mb-6 shadow-lg shadow-orange-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="text-lg font-semibold text-orange-300 mb-1">Important: MUN Pricing</h3>
                  <p className="text-orange-200 text-sm">
                    Please note that <strong className="text-white">MUN (Model United Nations)</strong> is <strong className="text-white">NOT FREE</strong> and costs <strong className="text-white">₹1600</strong>. Unlike other events where the first event is free, MUN has a separate pricing structure.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- 3. Form for Payment Submission --- */}
          <form onSubmit={handleSubmit}>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* QR Code */}
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-lg shadow-green-500/10 hover:border-green-500/40 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <span className="text-2xl">💳</span>
                  Step 1: Scan QR Code
                </h2>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-400/10 to-blue-400/10 p-1 rounded-xl inline-block mb-4 group hover:from-green-400/20 hover:to-blue-400/20 transition-all duration-300">
                    <div className="bg-white p-4 rounded-lg">
                      {/* Placeholder for QR Code - Replace with actual QR */}
                      <div className="w-48 h-48 bg-white flex items-center justify-center">
                        <img
                          src={formData.referral ? "/referal.jpg" : "/qrcode.png"}
                          alt="LNMIIT Gymkhana Payment QR Code"
                          className="w-full h-full object-fill"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-mono bg-gray-800/60 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    {formData.referral ? "PLINTH PR" : "LNMGYMKHANAFUND@SBI"}
                  </p>
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Pay exactly <strong className="text-white text-lg">₹{totalPrice.toFixed(2)}</strong>
                    </p>
                    <p className="text-xs text-green-400 mt-1">Amount includes 18% GST</p>
                  </div>
                </div>
              </div>

              {/* Upload Proof */}
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <span className="text-2xl">📤</span>
                  Step 2: Upload Proof
                </h2>

                <div className="space-y-4">
                  {/* --- 4. Corrected File Input --- */}
                  <label
                    htmlFor="payment-proof"
                    className="cursor-pointer block border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-500/5"
                  >
                    <div className="space-y-3">
                      <div className="text-purple-400 text-4xl mb-2">📁</div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="bg-gray-800/60 backdrop-blur-sm text-gray-200 p-3 rounded-lg w-full border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />

                      {/* Show selected file name and remove option */}
                      {file && (
                        <div className="flex items-center justify-between text-sm bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                          <span className="truncate max-w-[70%] text-green-300 flex items-center gap-2">
                            <span>✓</span> {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFile(null)}
                            className="text-red-400 hover:text-red-300 font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-gray-300 font-medium mt-3">
                      {file ? "File selected successfully!" : "Upload your payment screenshot"}
                    </div>
                    <span className="text-gray-500 text-sm">
                      Supported formats: PNG, JPG (Max 2MB)
                    </span>
                  </label>
                  {/* --- End of Corrected Input --- */}

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-yellow-200 text-sm flex items-start gap-2">
                      <span className="text-lg">⚠️</span>
                      <span>After submitting, please wait for confirmation. Do not refresh the page.</span>
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-blue-200 text-sm flex items-start gap-2">
                      <span className="text-lg">💬</span>
                      <span>
                        Need help? Contact{" "}
                        <span className="font-semibold text-white">
                          Kaustubh Sharma
                        </span>{" "}
                        at{" "}
                        <a href="tel:7976533487" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                          7976533487
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- 5. New Submit Button --- */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button
                type="submit"
                disabled={!file || isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg py-4 rounded-xl transition-all transform
                         hover:from-green-500 hover:to-emerald-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30
                         disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
                         active:scale-[0.98]"
              >
                {isSubmitting
                  ? "⏳ Submitting, please wait..."
                  : "✨ Confirm & Submit Payment"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
