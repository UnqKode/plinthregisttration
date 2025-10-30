"use client";
import { useRouter } from "next/navigation";
import { Particles } from "../../../components/ui/particles"; // Assuming this path is correct for your project
import { useState } from "react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});


export default function Page() {
  const router = useRouter();
  const [day, setDay] = useState("");
  const [members, setMembers] = useState([
    { name: "", college: "", contact: "", email: "" },
  ]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [referral, setReferral] = useState("");
  const [comments, setComments] = useState("");

  const events = [
    { id: "coding", name: "Coding Cascade", icon: "💻", price: 149 },
    { id: "hackathon", name: "24-Hour Hackathon", icon: "🔥", price: 149 },
    { id: "robo", name: "Robo Race Championship", icon: "🤖", price: 149 },
    { id: "quiz", name: "Tech Quiz Master", icon: "🧠", price: 149 },
    { id: "drone", name: "Drone Racing League", icon: "🚁", price: 149 },
    { id: "ai", name: "AI/ML Workshop", icon: "🤖", price: 149 },
    { id: "gaming", name: "E-Sports Tournament", icon: "🎮", price: 149 },
  ];

  const addMember = () => {
    setMembers([...members, { name: "", college: "", contact: "", email: "" }]);
  };

  const removeMember = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const toggleEvent = (eventId) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  // --- Price Calculation (Updated to be Per-Member) ---
  const getBasePrice = () => {
    if (day === "all") {
      return 1499; // Price for all 3 days
    }
    if (day === "day1" || day === "day2" || day === "day3") {
      return 649; // Price for a single day
    }
    return 0; // No day selected
  };

  const basePricePerMember = getBasePrice();
  const eventPricePerMember = selectedEvents.length * 149;

  // --- CORE LOGIC CHANGE ---
  // The total is now (base + events) * number of members
  const totalAmount =
    (basePricePerMember + eventPricePerMember) * members.length;
  // --- END OF LOGIC CHANGE ---

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      day,
      members,
      selectedEvents,
      referral,
      comments,
      totalAmount, // Added total amount to the log
    });
    alert("Form submitted successfully!");
  };


  const backPage = () =>{
    router.back();
  }

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-black flex items-center justify-center py-12 px-4">
      {/* Animated Grid Background */}
      <div className="fixed top-0 z-5 h-screen w-screen">
        <Particles />
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />


      {/* Form Container */}
      <div className="relative z-10 bg-gradient-to-br from-black/5 to-white/10 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-[0_0_80px_rgba(0,255,136,0.1)]">
        {/* Header */}
        <div className={`text-center mb-8 ${orbitron.className}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 bg-white bg-clip-text text-transparent">
            FEST BOOKING FORM
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-gray-200 mx-auto mb-4 rounded-full" />
          <p className="text-gray-400 text-sm">
            Register for LNMIIT Plinth 2025
          </p>
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Day Pass Selection */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-gray-300">01</span> Day Pass
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
              required
            >
              <option value="">Select Day (Required)</option>
              <option value="day1">
                Day 1 - Opening Ceremony (₹649/member)
              </option>
              <option value="day2">Day 2 - Tech Events (₹649/member)</option>
              <option value="day3">Day 3 - Grand Finale (₹649/member)</option>
              <option value="all">
                All 3 Days - Grand Pass (₹1499/member)
              </option>
            </select>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

          {/* Members Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-gray-300">02</span> Team Members
              </label>
              <span className="text-sm text-gray-500">
                {members.length} member(s)
              </span>
            </div>

            {members.map((member, index) => (
              <div
                key={index}
                className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">
                    Member {index + 1}
                  </h4>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg flex items-center justify-center text-red-400 transition-colors text-xl"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Abc"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      College Name *
                    </label>
                    <input
                      type="text"
                      placeholder="LNMIIT"
                      value={member.college}
                      onChange={(e) =>
                        handleMemberChange(index, "college", e.target.value)
                      }
                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={member.contact}
                      onChange={(e) =>
                        handleMemberChange(index, "contact", e.target.value)
                      }
                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="plinth@example.com"
                      value={member.email}
                      onChange={(e) =>
                        handleMemberChange(index, "email", e.target.value)
                      }
                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addMember}
              className="w-full border-2 border-dashed border-gray-700 hover:border-white rounded-2xl py-4 text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span> Add Another Member
            </button>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

          {/* Event Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-gray-300">03</span> Select Events
              </label>
              <span className="text-sm text-gray-500">
                {selectedEvents.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => toggleEvent(event.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    selectedEvents.includes(event.id)
                      ? "border-white bg-gray-400/10"
                      : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-3 ">
                    <span className="text-2xl">{event.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {event.name}
                      </h4>
                      <p className="text-blue-300 text-xs font-semibold">
                        +₹{event.price} (per member)
                      </p>
                    </div>
                    {selectedEvents.includes(event.id) && (
                      <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Event prices are applied per team member.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

          {/* Referral Code */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-gray-300">04</span> Referral Code{" "}
              <span className="text-sm text-gray-500 font-normal">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter referral code for discount"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors"
            />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

          {/* Additional Comments */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-gray-300">05</span> Additional Comments
            </label>
            <textarea
              placeholder="Any special requests, dietary requirements, or notes..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

          {/* --- Price Summary (Updated for Per-Member) --- */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-2xl p-6">
            <div className="space-y-2 mb-4">
              {basePricePerMember > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Base Pass (per member)</span>
                  <span className="text-white font-semibold">
                    ₹{basePricePerMember}
                  </span>
                </div>
              )}
              {eventPricePerMember > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Add'l Events (per member)
                  </span>
                  <span className="text-white font-semibold">
                    ₹{eventPricePerMember}
                  </span>
                </div>
              )}

              {/* Added Subtotal and Member count for clarity */}
              <div className="flex items-center justify-between text-sm pt-1 border-t border-gray-700/50">
                <span className="text-gray-400 font-semibold">
                  Subtotal (per member)
                </span>
                <span className="text-white font-semibold">
                  ₹{basePricePerMember + eventPricePerMember}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Team Members</span>
                <span className="text-white font-semibold">
                  × {members.length}
                </span>
              </div>
            </div>
            <div className="h-px bg-gray-700 mb-3" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-lg">Total Amount</span>
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ₹{totalAmount}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Price is calculated as (Pass + Events) × Members.
            </p>
          </div>
          <div className="flex justify-center items-center gap-5">

          <button
            onClick={()=>backPage()}
            type="button"
            className="w-12 h-12 flex items-center justify-center bg-black/60 backdrop-blur-xl border border-white rounded-full text-gray-400 hover:text-gray-300 hover:border-white/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all duration-300 ease-in-out"
          >
            {/* Heroicon (Outline): Arrow Left */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          {/* Submit Button */}
          <button
            type="submit"
            className="relative w-full group overflow-hidden rounded-2xl"
          >
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-xl opacity-100 group-hover:opacity-100 transition-opacity"
              style={{
                background:
                  "linear-gradient(45deg, #00ff88, #00ccff, #0088ff, #00ff88)",
                backgroundSize: "300% 300%",
                animation: "gradient 3s linear infinite",
              }}
            />

            <div className="relative bg-black rounded-xl px-8 py-4 m-[2px]">
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                SUBMIT REGISTRATION
              </span>
            </div>
            <div></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
          </button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By submitting, you agree to our terms and conditions.
          </p>
        </form>
      </div>

      {/* Footer */}
      <p className="fixed bottom-4 text-center text-gray-600 text-xs">
        Powered by{" "}
        <span className="text-gray-300 font-semibold">Plinth 2025</span>
      </p>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
