"use client";

import LeftPanel from "@/components/left-panel";
import PaymentInfo from "@/components/paymentInfo";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import PaymentHistory from "@/components/paymentHistory";

interface SelectChangeEvent {
  target: {
    value: string;
  };
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daySet, setDaySet] = useState(0);
  const { data: session, status } = useSession();

  const month = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i + 1
    );
    return {
      number: i + 1,
      dayName: dayNames[date.getDay()],
    };
  });

  const daySets = [];
  for (let i = 0; i < daysOfMonth.length; i += 7) {
    daySets.push(daysOfMonth.slice(i, i + 7));
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = months.indexOf(event.target.value);
    const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
    setCurrentDate(newDate);
    setDaySet(0);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    const newDate = new Date(newYear, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setDaySet(0);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const handlePrevSet = () => {
    setDaySet((prev) => Math.max(prev - 1, 0));
  };

  const handleNextSet = () => {
    setDaySet((prev) => Math.min(prev + 1, daySets.length - 1));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="calendar p-6">
      <div className="header mb-0 flex justify-end">
        <div className="p-0 float-right">
          <h6 className="text-white font-sans">SCHEDULE</h6>
          <div className="flex items-center gap-4 mb-4">
            <select
              value={month}
              onChange={handleMonthChange}
              className="px-4 py-2 rounded-lg bg-gradient-to-b from-green-900 to-zinc-900 text-white border border-[#006B46] focus:outline-none focus:ring-2 focus:ring-[#00824F]"
            >
              {months.map((m) => (
                <option key={m} value={m} className="bg-[#004830]">
                  {m}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={handleYearChange}
              className="px-4 py-2 rounded-lg bg-gradient-to-b from-green-900 to-zinc-900 text-white border border-[#006B46] focus:outline-none focus:ring-2 focus:ring-[#00824F]"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-[#004830]">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="text-white live-date text-xl font-semibold mb-4">
        <p>Today: {currentDate.toDateString()}</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daySets[daySet]?.map((day) => (
          <button
            key={day.number}
            className="p-2 rounded-lg text-white bg-[#004830] hover:bg-[#006B46] transition-colors duration-200 flex flex-col items-center"
          >
            <span className="text-lg font-medium">{day.number} </span>
            <span className="text-xs mt-1">{day.dayName} </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevSet}
          className="text-white px-4 py-2 rounded-full border border-[#006B46] hover:bg-[#004830] transition-colors duration-200"
        >
          &lt; Prev
        </button>
        <button
          onClick={handleNextSet}
          className="text-white px-4 py-2 rounded-full border border-[#006B46] hover:bg-[#004830] transition-colors duration-200"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

// Payments Component
export default function Payments() {
  const { status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
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
          <Calendar />
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

            <div className="flex-1 overflow-y-auto space-y-4">
              <PaymentInfo />
              <PaymentInfo />
              <PaymentInfo />
              <PaymentInfo />
              <PaymentInfo />
              <PaymentInfo />
            </div>
          </div>

          {/* Payment History */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#005C3B] mb-2">
                Payment History
              </h2>
              <p className="text-gray-600">Month of September</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              <PaymentHistory />
              <PaymentHistory />
              <PaymentHistory />
              <PaymentHistory />
              <PaymentHistory />
              <PaymentHistory />
              <PaymentHistory />
              <PaymentHistory />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for add payment */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-lg font-medium text-[#005C3B]">Add Payment</h3>
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter payment details"
              />
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-[#005C3B] text-white rounded-lg"
                onClick={handleModalToggle}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#00824F] text-white rounded-lg">
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
