import React, { useState } from "react";
import { connectMongoDB } from "@/lib/mongodb";

interface PopupModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (amount: string, note: string, date: string) => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, handleClose, handleSave }) => {
  if (!isOpen) return null;

  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", 
    "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("JANUARY");
  const [year, setYear] = useState(currentYear.toString());

  const handleSavePayment = async (newAmount: string, newNote: string, newDate: string) => {
    console.log("Saving payment", newAmount, newNote, newDate); // Check if this logs correctly
    setAmount(newAmount);
    setNote(newNote);

    const date = `${day} ${month} ${year}`;
    await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: newAmount, note: newNote, date }),
    }).then((res) => {
        if (res.ok) {
            console.log("Payment saved successfully");
        } else {
            console.log("Failed to save payment");
        }
    });

    handleSave(newAmount, newNote, date); // Pass data back to parent
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] md:w-[600px] lg:w-[700px] relative">
        <h3 className="text-lg font-medium text-[#005C3B] mb-4">Add Payment</h3>

        <div className="flex justify-center gap-4 mb-6">
          <div className="w-[70px]">
            <select
              className="w-full h-[50px] bg-transparent text-[#005C3B] text-[18px] font-medium font-['Poppins'] border border-[#005C3B] rounded-[10px] focus:outline-none"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[150px]">
            <select
              className="w-full h-[50px] bg-transparent text-[#005C3B] text-[18px] font-medium font-['Poppins'] border border-[#005C3B] rounded-[10px] focus:outline-none"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[100px]">
            <select
              className="w-full h-[50px] bg-transparent text-[#005C3B] text-[18px] font-medium font-['Poppins'] border border-[#005C3B] rounded-[10px] focus:outline-none"
              value ={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₱ 0.00"
            className="w-full h-[50px] bg-transparent text-[#005C3B] text-[18px] font-medium font-['Poppins'] border border-[#005C3B] rounded-[10px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            className="w-full h-[50px] bg-transparent text-[#005C3B] text-[18px] font-medium font-['Poppins'] border border-[#005C3B] rounded-[10px] focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={() => handleSavePayment(amount, note, `${day} ${month} ${year}`)}
          >
            Add Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;