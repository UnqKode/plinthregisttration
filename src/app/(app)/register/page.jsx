"use client";
import { useRouter } from "next/navigation";
import { Particles } from "../../../components/ui/particles"; // Assuming this path is correct for your project
import { useEffect, useState } from "react";
import { Orbitron } from "next/font/google";
import { useData } from "../../../context/form.context";
import toast from "react-hot-toast";

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
  const { setFormData } = useData();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [referral, setReferral] = useState("");
  const [comments, setComments] = useState("");

  // --- 1. NEW STATE for Accommodation ---
  const [needsAccommodation, setNeedsAccommodation] = useState(false);
  const [codes, setCodes] = useState();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await fetch("/api/fetchcode");
        const data = await res.json();

        if (data.success) {
          setCodes(data.data);
          console.log("Datav FEtched");
        } else {
          console.error("API Error:", data.error);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  const events = [
    // PHEONIX
    {
      id: "nitro_racing",
      name: "Nitro Racing",
      icon: "🏎️",
      price: 199,
      club: "PHEONIX",
      description:
        "Build, race, and conquer the track with your custom RC car.",
    },
    {
      id: "robocup",
      name: "Robocup",
      icon: "🤖",
      price: 199,
      club: "PHEONIX",
      description:
        "Autonomous robots clash in the ultimate test of soccer skills.",
    },
    {
      id: "roborace",
      name: "Roborace",
      icon: "🚗",
      price: 199,
      club: "PHEONIX",
      description:
        "Navigate a treacherous course with your line-following bot.",
    },
    {
      id: "moto_boat",
      name: "Moto Boat",
      icon: "🚤",
      price: 199,
      club: "PHEONIX",
      description: "Rule the waves in a high-speed RC boat racing challenge.",
    },
    {
      id: "robo_transporter",
      name: "Robo Transporter",
      icon: "🤖",
      price: 199,
      club: "PHEONIX",
      description:
        "Design a bot to efficiently pick, place, and transport items.",
    },
    {
      id: "rc_plane",
      name: "RC Plane",
      icon: "✈️",
      price: 199,
      club: "PHEONIX",
      description:
        "Take to the skies and show off your aerial acrobatic skills.",
    },
    {
      id: "drone_racing",
      name: "Drone Racing",
      icon: "🚁",
      price: 199,
      club: "PHEONIX",
      description: "FPV racing through a complex 3D obstacle course.",
    },
    {
      id: "micro_mouse",
      name: "Micro Mouse",
      icon: "🐭",
      price: 199,
      club: "PHEONIX",
      description:
        "Can your smart mouse solve and escape the maze the fastest?",
    },
    {
      id: "maze_solver",
      name: "Maze Solver",
      icon: "🧩",
      price: 199,
      club: "PHEONIX",
      description:
        "Program an autonomous bot to find its way out of a complex maze.",
    },
    {
      id: "tech_expo",
      name: "Tech Expo",
      icon: "🔬",
      price: 199,
      club: "PHEONIX",
      description:
        "Showcase your innovative technical project and wow the judges.",
    },
    {
      id: "robowars",
      name: "Robowars",
      icon: "⚔️",
      price: 199,
      club: "PHEONIX",
      description:
        "Sparks will fly! Battle it out in the ultimate robotics combat arena.",
    },

    // CYBROS
    {
      id: "alice_bob",
      name: "Alice, Bob, Go!",
      icon: "💻",
      price: 199,
      club: "CYBROS",
      description: "A team-based competitive programming relay. Speed is key!",
    },
    {
      id: "coding_cascade",
      name: "Coding Cascade",
      icon: "🧠",
      price: 199,
      club: "CYBROS",
      description:
        "Solve a series of problems where the output of one is the input for the next.",
    },
    {
      id: "cp_duels",
      name: "CP Duels",
      icon: "⚔️",
      price: 199,
      club: "CYBROS",
      description:
        "Go head-to-head in a fast-paced 1v1 competitive programming battle.",
    },
    {
      id: "enigma",
      name: "Enigma",
      icon: "🕵️‍♂️",
      price: 199,
      club: "CYBROS",
      description:
        "A cryptic hunt that will test your logic, security, and lateral thinking.",
    },
    {
      id: "iudp",
      name: "IUPC",
      icon: "💡",
      price: 199,
      club: "CYBROS",
      description:
        "The classic Inter-University Programming Contest. Glory awaits.",
    },

    // ASTRO
    {
      id: "astromemia",
      name: "Astromemia",
      icon: "🌌",
      price: 199,
      club: "ASTRO",
      description:
        "Combine your love for space and memes in this cosmic creative contest.",
    },
    {
      id: "starpix",
      name: "StarPix",
      icon: "📸",
      price: 199,
      club: "ASTRO",
      description:
        "Astro-photography contest. Capture the beauty of the cosmos.",
    },
    {
      id: "bhahmaand",
      name: "Bhahmaand",
      icon: "🪐",
      price: 199,
      club: "ASTRO",
      description:
        "Test your cosmic knowledge in the ultimate space-themed quiz.",
    },

    // E-CELL
    {
      id: "sharktank",
      name: "SharkTank",
      icon: "🦈",
      price: 199,
      club: "E-CELL",
      description:
        "Pitch your groundbreaking startup idea to a panel of expert 'sharks'.",
    },
    {
      id: "ideathon",
      name: "Ideathon",
      icon: "💡",
      price: 199,
      club: "E-CELL",
      description:
        "Brainstorm and develop innovative solutions to real-world problems.",
    },

    // ESPORTS
    {
      id: "clash_royals",
      name: "Clash Royals",
      icon: "⚔️",
      price: 199,
      club: "ESPORTS",
      description:
        "The bridge is yours. Compete in this fast-paced mobile strategy duel.",
    },
    {
      id: "fifa",
      name: "FIFA",
      icon: "⚽",
      price: 199,
      club: "ESPORTS",
      description:
        "Virtual pitch, real glory. Settle the score in the classic football sim.",
    },
    {
      id: "smashkarts",
      name: "SmashKarts",
      icon: "🚗",
      price: 199,
      club: "ESPORTS",
      description:
        "Frantic kart racing with power-ups and mayhem. Last one standing wins.",
    },
    {
      id: "bgmi",
      name: "BGMI",
      icon: "🎮",
      price: 199,
      club: "ESPORTS",
      description:
        "Drop, loot, and survive. Battle to be the last squad standing.",
    },
    {
      id: "valorant",
      name: "Valorant",
      icon: "🔫",
      price: 199,
      club: "ESPORTS",
      description:
        "Tactical 5v5 shooter. Clove-clutching, spike-planting action.",
    },

    // QUIZZINGA
    {
      id: "ipl_auction",
      name: "IPL Auction",
      icon: "🏏",
      price: 199,
      club: "QUIZZINGA",
      description:
        "Build your dream team with a limited budget in this strategic mock auction.",
    },
    {
      id: "cryptex",
      name: "Cryptex",
      icon: "🧠",
      price: 199,
      club: "QUIZZINGA",
      description:
        "A challenging cryptic crossword and puzzle hunt for word-nerds.",
    },
    {
      id: "brand_wagon",
      name: "Brand Wagon",
      icon: "📊",
      price: 199,
      club: "QUIZZINGA",
      description:
        "How well do you know your logos, slogans, and ad jingles? Test it here.",
    },

    // DEBATE SOCIETY
    {
      id: "mun",
      name: "MUN",
      icon: "🗣️",
      price: 199,
      club: "DEBATE SOCIETY",
      description:
        "Model United Nations. Debate global issues and forge alliances.",
    },
    {
      id: "change_my_mind",
      name: "CHANGE MY MIND",
      icon: "💬",
      price: 199,
      club: "DEBATE SOCIETY",
      description: "A 1-on-1 informal debate. Can you defend your hot takes?",
    },
    {
      id: "graffiti_wall",
      name: "GRAFFITI WALL",
      icon: "🎨",
      price: 199,
      club: "DEBATE SOCIETY",
      description:
        "Express your views on a topic... with spray paint and stencils.",
    },
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
    if (day === "All") {
      return 999; // Price for all 3 days.
    }
    if (day === "DAY1" || day === "DAY2" || day === "DAY3") {
      return 499; // Price for a single day
    }
    return 0; // No day selected
  };

  const basePricePerMember = getBasePrice();
  const eventPricePerMember =
    (selectedEvents.length > 0
      ? selectedEvents.length - 1
      : selectedEvents.length) * 199;

  // --- 2. CORE LOGIC CHANGE (with Accommodation) ---
  const baseTotal = (basePricePerMember + eventPricePerMember) * members.length;
  const accommodationCost =
    day === "All" ? 0 : needsAccommodation ? 200 * members.length : 0;

  // The total is now (base + events) * number of members + accommodation
  const totalAmount = baseTotal + accommodationCost;
  // --- END OF LOGIC CHANGE ---

  const validatedFinalData = (data) => {
    // === 1️⃣ BASIC VALIDATION ===
    if (!data.day) {
      toast("⚠️ Please select a day pass before proceeding.");
      return false;
    }

    if (!data.members || data.members.length === 0) {
      toast("👥 Please add at least one team member.");
      return false;
    }

    if (data.referral) {
      if (!codes.includes(data.referral)) {
        toast("Invalid Referral Code");
        return false;
      }
    }

    // === 2️⃣ TEAM MEMBER VALIDATION ===
    for (let i = 0; i < data.members.length; i++) {
      const member = data.members[i];
      const missingFields = [];

      if (!member.name) missingFields.push("Name");
      if (!member.college) missingFields.push("College");
      if (!member.contact) missingFields.push("Contact Number");
      if (!member.email) missingFields.push("Email");

      if (missingFields.length > 0) {
        toast(
          `⚠️ Incomplete information for Member ${
            i + 1
          }.\n\nMissing fields: ${missingFields.join(
            ", "
          )}.\n\nPlease fill them before submitting.`
        );
        return false;
      }

      if (!/^(?:\+91)?\d{10}$/.test(member.contact)) {
        toast(
          `📞 Invalid contact number for Member ${
            i + 1
          }. Please enter a valid phone number.`
        );
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
        toast(
          `📧 Invalid email format for Member ${
            i + 1
          }. Please enter a valid email address.`
        );
        return false;
      }
    }

    if (!data.selectedEvents || data.selectedEvents.length === 0) {
      toast("🎯 Please select at least one event to participate in.");
      return false;
    }

    if (!data.totalAmount || isNaN(Number(data.totalAmount))) {
      toast("💰 Invalid total amount. Please recheck your selections.");
      return false;
    }

    if (Number(data.totalAmount) <= 0) {
      toast("💸 Total amount cannot be zero or negative.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      day,
      members,
      teamSize: members.length.toString(),
      selectedEvents,
      referral,
      comments,
      needsAccommodation: day === "All" ? false : needsAccommodation, // ✅ fixed case
      totalAmount: totalAmount.toString(),
    };

    if (!validatedFinalData(finalData)) {
      return;
    }

    setFormData(finalData);
    // console.log("Saved in context", finalData);
    router.push("/confirmRegistration");
    toast("Team registered successfully!");
  };

  const backPage = () => {
    router.back();
  };

  const getUniqueClubs = (events) => {
    const clubs = events.map((event) => event.club);
    return [...new Set(clubs)]; // Creates an array of unique club names
  };

  const uniqueClubs = getUniqueClubs(events);

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-black flex items-center justify-center py-12 px-4">
      {/* Animated Grid Background */}
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-5 w-full h-screen">
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
            Register for LNMIIT Plinth 2026
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
              <option value="DAY1">Day 1 ( Less goo - 23rd Jan) </option>
              <option value="DAY2">Day 2 ( Fun starts - 24th jan) </option>
              <option value="DAY3">Day 3( Pronite - 🍻25th jan ) </option>
              <option value="All">
                3 days power pass ( Fun day everyday ){" "}
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

            <div className="space-y-6">
              {uniqueClubs.map((club) => (
                <div key={club} className="space-y-4">
                  {/* Club Header */}
                  <h3 className="text-xl font-semibold text-cyan-300 tracking-wider">
                    {club}
                  </h3>

                  {/* Grid for this club's events */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {events
                      .filter((event) => event.club === club) // Filter events for this club
                      .map((event) => (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => toggleEvent(event.id)}
                          className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                            selectedEvents.includes(event.id)
                              ? "border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 shadow-lg shadow-cyan-500/20"
                              : "border-gray-700/50 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60 hover:shadow-md"
                          }`}
                        >
                          {/* Subtle gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative flex items-start gap-4">
                            {/* Icon with animated background */}
                            <div
                              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                selectedEvents.includes(event.id)
                                  ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 scale-110"
                                  : "bg-gray-700/50 group-hover:bg-gray-700 group-hover:scale-105"
                              }`}
                            >
                              <span className="text-2xl">{event.icon}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-base mb-1.5 group-hover:text-cyan-300 transition-colors">
                                {event.name}
                              </h4>
                              <p className="text-sm text-gray-400 transition-all duration-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 mb-0 group-hover:mb-2">
                                {event.description}
                              </p>

                              {/* Price / Status */}
                              <p
                                className={`text-xs font-semibold transition-colors ${
                                  selectedEvents.includes(event.id)
                                    ? "text-cyan-300"
                                    : "text-gray-400 group-hover:text-blue-300"
                                }`}
                              >
                                {selectedEvents.length > 1
                                  ? `+₹${event.price} (per member)`
                                  : `Select One For Free`}
                              </p>
                            </div>

                            {/* Checkmark with animation */}
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                selectedEvents.includes(event.id)
                                  ? "bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-lg shadow-cyan-500/40 scale-100 rotate-0"
                                  : "bg-gray-700/30 scale-0 rotate-45"
                              }`}
                            >
                              <span
                                className={`text-sm font-bold transition-all ${
                                  selectedEvents.includes(event.id)
                                    ? "text-gray-900"
                                    : "text-gray-500"
                                }`}
                              >
                                ✓
                              </span>
                            </div>
                          </div>

                          {/* Bottom accent line for selected state */}
                          {selectedEvents.includes(event.id) && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>
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

          {/* --- 3. Price Summary (Updated with Accommodation) --- */}
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
              {/* --- NEW: Show the base total --- */}
              <div className="flex items-center justify-between text-md pt-1 border-t border-gray-700/50">
                <span className="text-gray-300 font-semibold">
                  Registration Total
                </span>
                <span className="text-white font-semibold">₹{baseTotal}</span>
              </div>
            </div>

            {/* --- NEW ACCOMMODATION CHECKBOX --- */}
            <label className="flex items-center gap-3 cursor-pointer p-3 mb-4 bg-gray-900/50 border border-gray-700 rounded-xl transition-all hover:border-gray-600">
              <input
                type="checkbox"
                disabled={day === "All"}
                checked={day === "All"? true : needsAccommodation}
                onChange={(e) => setNeedsAccommodation(e.target.checked)}
                className={`h-4 w-4 rounded bg-gray-800 border-gray-600 text-cyan-400 focus:ring-cyan-500 
    ${day === "All" ? "opacity-50 cursor-not-allowed" : ""}`}
              />

              <div className="flex-1">
                <span className="text-white font-semibold text-sm">
                  Add Accommodation?
                </span>
                <p className="text-xs text-gray-400">
                  Adds ₹200 per member (Total: ₹{200 * members.length})
                </p>
              </div>
            </label>
            {/* --- END NEW --- */}

            <div className="h-px bg-gray-700 mb-3" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-lg">Total Amount</span>
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ₹{totalAmount}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Price is calculated as (Registration Total) + Accommodation.
            </p>
          </div>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => backPage()}
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
