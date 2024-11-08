"use client";

import LeftPanel from "@/components/left-panel";
import { useState } from "react";
import { useSession } from "next-auth/react";

// Add type for the event
interface SelectChangeEvent {
  target: {
    value: string;
  };
}

// Calendar Component
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daySet, setDaySet] = useState(0);
  const { data: session, status } = useSession();

  // Get the current month and year
  const month = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  // Array of all months for the dropdown
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

  // Array of day names
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Calculate the days in the current month
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

  // Group days into sets of 7 (for a week view)
  const daySets = [];
  for (let i = 0; i < daysOfMonth.length; i += 7) {
    daySets.push(daysOfMonth.slice(i, i + 7));
  }

  // Handle month change from dropdown
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = months.indexOf(event.target.value);
    const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
    setCurrentDate(newDate);
    setDaySet(0);
  };

  // Handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    const newDate = new Date(newYear, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setDaySet(0);
  };

  // Generate array of years (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Handle previous and next set navigation
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
            {/* Month Dropdown */}
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

            {/* Year Dropdown */}
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

      {/* Current Date (live) */}
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
        <div className="bg-gradient-to-b from-green-900 to-zinc-900 max-w-screen-2xl h-70 mt-5 ml-5 rounded-2xl   ">
          <Calendar />
        </div>

        <div className="flex-1 flex flex-row gap-4 p-4 overflow-hidden">
          {/*Updated Left Section */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#005C3B] mb-2">
                Add Payment
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="bg-gradient-to-b from-green-900 to-zinc-900 text-white p-4 rounded-xl">
                <h3 className="text-lg font-medium mb-2">MCWD</h3>
                <p className="text-2xl font-bold">₱2,565.00</p>
                <p className="text-sm text-gray-300">October 04</p>
              </div>

              <div className="bg-gradient-to-b from-green-900 to-zinc-900 text-white p-4 rounded-xl">
                <h3 className="text-lg font-medium mb-2">PLDT</h3>
                <p className="text-2xl font-bold">₱3,599.00</p>
                <p className="text-sm text-gray-300">October 04</p>
              </div>

              <div className="bg-gradient-to-b from-green-900 to-zinc-900 text-white p-4 rounded-xl">
                <h3 className="text-lg font-medium mb-2">VECO</h3>
                <p className="text-2xl font-bold">₱5,678.00</p>
                <p className="text-sm text-gray-300">October 04</p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#005C3B] mb-2">
                Payment History
              </h2>
              <p className="text-gray-600">Month of September</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#005C3B]">MCWD</h3>
                <p className="text-lg font-bold text-[#005C3B]">₱2,346.65</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#005C3B]">PLDT</h3>
                <p className="text-lg font-bold text-[#005C3B]">₱3,599.00</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#005C3B]">VECO</h3>
                <p className="text-lg font-bold text-[#005C3B]">₱4,823.53</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#005C3B]">INSULAR LIFE</h3>
                <p className="text-lg font-bold text-[#005C3B]">₱2,500.00</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#005C3B]">
                  ST. PETER LIFE PLAN
                </h3>
                <p className="text-lg font-bold text-[#005C3B]">₱1,500.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}