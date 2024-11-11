// Payments.tsx
"use client";

import LeftPanel from "@/components/left-panel";
import PaymentInfo from "@/components/paymentInfo";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import PaymentHistory from "@/components/paymentHistory";
import Calendar from "@/components/calendar";
import PopupModal from "@/components/popupModal";

export default function Payments() {
  const { status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Payment saved!");
    handleModalToggle(); // Close the modal after saving
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="w-[320px] flex-shrink-0">
        <LeftPanel />
      </div>

      <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-100">
        <div className="bg-gradient-to-b from-green-900 to-zinc-900 max-w-screen-2xl h-70 mt-5 ml-5 rounded-2xl">
          <Calendar /> {/* Use the Calendar component here */}
        </div>

        <div className="flex-1 flex flex-row gap-4 p-4 overflow-hidden">
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#005C3B] mb-2">Add Payment</h2>
              <div
                className="w-8 h-8 bg-[#005C3B] rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleModalToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>

            {/* Left Section Div */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <PaymentInfo />font
            </div>
          </div>

          {/* Payment History */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl -bold text-[#005C3B] mb-2">
                Payment History
              </h2>
              <p className="text-gray-600">Month of September</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              <PaymentHistory />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add Payment */}
      <PopupModal 
        isOpen={isModalOpen} 
        handleClose={handleModalToggle} 
        handleSave={handleSave} // Pass the handleSave function
      />
    </div>
  );
}