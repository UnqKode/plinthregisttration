"use client";
import { useRouter } from "next/navigation";
import { Particles } from "../../../components/ui/particles";
import { useData } from "../../../context/form.context";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { formData } = useData();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!formData?.day) {
      router.back();
    }
  }, [formData, router]);

  if (!formData?.day) {
    return null;
  }

  const taxAmount = formData.totalAmount * 0.18;
  const totalPrice = formData.totalAmount + taxAmount;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 py-8">
      <div className="fixed inset-0 z-5 w-full h-screen">
        <Particles />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Payment Page</h1>

        {/* Booking Details */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
            Booking Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="font-medium">
                  {formData.members[0]?.name || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">College:</span>
                <span className="font-medium">
                  {formData.members[0]?.college || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contact:</span>
                <span className="font-medium">
                  {formData.members[0]?.contact || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-medium">
                  {formData.members[0]?.email || "—"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Day Pass:</span>
                <span className="font-medium">{formData.day}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxes (18%):</span>
                <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-gray-700 pt-3">
                <span className="text-gray-300 font-semibold">
                  Total Price:
                </span>
                <span className="font-bold text-green-400">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Members</h2>

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
                        {formData.selectedEvents.join(", ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Scan QR Code to Pay
            </h2>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                {/* Placeholder for QR Code - Replace with actual QR */}
                <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-black">
                  QR Code
                </div>
              </div>
              <p className="text-lg font-mono bg-gray-800 p-3 rounded border border-gray-700">
                LNMGYMKHANAFUND@SBI
              </p>
            </div>
          </div>

          {/* Upload Proof */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Upload Payment Proof
            </h2>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="payment-proof"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <label htmlFor="payment-proof" className="cursor-pointer block">
                  <div className="text-gray-400 mb-2">
                    {file ? file.name : "No file chosen"}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                    Upload Proof
                  </button>
                </label>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-200 text-sm">
                  Please wait for 2-3 seconds after clicking "Upload Proof" for
                  the process to complete.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300 text-sm">
                  If you have any issues regarding taxes or discounts, please
                  contact{" "}
                  <span className="font-semibold text-white">
                    Ayush Singh Chauhan
                  </span>{" "}
                  at{" "}
                  <span className="font-semibold text-white">9125466700</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
