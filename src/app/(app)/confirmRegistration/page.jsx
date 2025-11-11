"use client";
import { useRouter } from "next/navigation";
import { Particles } from "../../../components/ui/particles";
import { useData } from "../../../context/form.context";
import { useEffect, useState } from "react";
import LoadingScreem from "../../../components/Loading";
import toast from "react-hot-toast";
import qr from "../../../../public/lnmgymkhanaqr.png";

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
  const totalBeforeTax = parseFloat(formData.totalAmount); // This is the subtotal
  const taxAmount = totalBeforeTax * 0.18;
  const totalPrice = totalBeforeTax + taxAmount;

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
      // Step 1: Upload proof to Cloudinary
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

      // console.log("✅ Cloudinary URL:", uploadResult.url);

      // Step 2: Prepare data for Google Sheets
      const submissionData = {
        ...formData,
        paymentProofUrl: uploadResult.url,
        totalPrice: totalPrice.toString(),
        taxAmount: taxAmount.toString(),
      };

      // console.log("📤 Sending to Google Sheets:", submissionData);

      // Step 3: Send to Google Sheets via Next.js API proxy
      const sheetRes = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const sheetResult = await sheetRes.json();
      // console.log("📥 Response from sheets:", sheetResult);

      if (!sheetRes.ok || sheetResult.status === "error") {
        throw new Error(
          sheetResult.message || "Failed to save to Google Sheets"
        );
      }

      // console.log("✅ Successfully saved to Google Sheets");
      toast("🎉 Form submitted successfully!");
      router.push("/"); // Redirect to home or success page
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
      <div className="min-h-screen bg-black text-white p-4 py-8">
        <div className="fixed inset-0 z-0 w-full h-screen">
          <Particles />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Payment Page</h1>

          {/* Booking Details */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
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
                    {formData.needsAccommodation ? "Yes" : "No"}
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
                <div className="flex justify-between text-md pt-2 border-t border-gray-700/50">
                  <span className="text-gray-300 font-semibold">
                    Total Before Tax:
                  </span>
                  <span className="font-semibold text-white text-right">
                    ₹{totalBeforeTax.toFixed(2)}
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
          </div>

          {/* Members Table */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
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
          </div>

          {/* --- 3. Form for Payment Submission --- */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* QR Code */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  1. Scan QR Code to Pay
                </h2>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    {/* Placeholder for QR Code - Replace with actual QR */}
                    <div className="w-48 h-48 bg-white flex items-center justify-center">
                      <img
                        src="/qrcode.png"
                        alt="LNMIIT Gymkhana Payment QR Code"
                        className="w-full h-full object-fill"
                      />
                    </div>
                  </div>
                  <p className="text-lg font-mono bg-gray-800 p-3 rounded border border-gray-700">
                    LNMGYMKHANAFUND@SBI
                  </p>
                  <p className="text-sm text-gray-400 mt-4">
                    Pay the <strong className="text-white">Total Price</strong>{" "}
                    of{" "}
                    <strong className="text-green-400">
                      ₹{totalPrice.toFixed(2)}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Upload Proof */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  2. Upload Payment Proof
                </h2>

                <div className="space-y-4">
                  {/* --- 4. Corrected File Input --- */}
                  <label
                    htmlFor="payment-proof"
                    className="cursor-pointer block border-2 border-dashed border-gray-700 rounded-lg p-8 text-center transition-colors hover:border-gray-500"
                  >
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="bg-gray-800 text-gray-200 p-2 rounded w-full"
                      />

                      {/* Show selected file name and remove option */}
                      {file && (
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <span className="truncate max-w-[70%]">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFile(null)}
                            className="text-red-400 hover:text-red-300 underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-blue-400 font-semibold mb-2">
                      {file ? file.name : "Click above to select proof"}
                    </div>
                    <span className="text-gray-400 text-sm">
                      Max Limit 2MB (PNG, JPG)
                    </span>
                  </label>
                  {/* --- End of Corrected Input --- */}

                  <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                    <p className="text-yellow-200 text-sm">
                      After submitting, please wait for confirmation. Do not
                      refresh the page.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      Facing Problem? Contact{" "}
                      <span className="font-semibold text-white">
                        Kaustubh Sharm
                      </span>{" "}
                      at{" "}
                      <span className="font-semibold text-white">
                        7976533487
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- 5. New Submit Button --- */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!file || isSubmitting}
                className="w-full bg-green-600 text-white font-bold text-lg py-4 rounded-xl transition-all
                         hover:bg-green-500
                         disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Submitting, please wait..."
                  : "Confirm & Submit Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
