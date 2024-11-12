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
const Icon1 = () => {
  return (
    <>
  <svg width="30" height="30" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.5 0.75C45.378 0.75 58.25 13.6218 58.25 29.5C58.25 45.378 45.378 58.25 29.5 58.25C13.6218 58.25 0.75 45.378 0.75 29.5C0.75 13.6218 13.6218 0.75 29.5 0.75ZM39.6496 19.3503L39.4078 19.1415C38.6574 18.5848 37.6276 18.5779 36.8703 19.1209L36.6004 19.3503L29.5 26.4496L22.3997 19.3503L22.1579 19.1415C21.4075 18.5848 20.3777 18.5779 19.6204 19.1209L19.3503 19.3503L19.1415 19.5921C18.5848 20.3425 18.5779 21.3723 19.1209 22.1296L19.3503 22.3997L26.4496 29.5L19.3503 36.6004L19.1415 36.8422C18.5848 37.5925 18.5779 38.6224 19.1209 39.3796L19.3503 39.6496L19.5921 39.8583C20.3425 40.4152 21.3723 40.4221 22.1296 39.879L22.3997 39.6496L29.5 32.5504L36.6004 39.6496L36.8422 39.8583C37.5925 40.4152 38.6224 40.4221 39.3796 39.879L39.6496 39.6496L39.8583 39.4078C40.4152 38.6574 40.4221 37.6276 39.879 36.8703L39.6496 36.6004L32.5504 29.5L39.6496 22.3997L39.8583 22.1579C40.4152 21.4075 40.4221 20.3777 39.879 19.6204L39.6496 19.3503Z" fill="white"/>
</svg>


    </>
  );
}


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-[#018053] to-black p-8 rounded-lg shadow-lg  relative h-2/2 w-1/3">
        <h3 className="text-lg font-medium text-white mb-4">Payment Details</h3>

        <div className="flex justify-center gap-4 mb-6">
          <div className="w-[70px]">
            <select
              className="w-full h-[50px] text-center bg-transparent text-white text-[18px] font-medium font-['Poppins'] border border-white rounded-[10px] focus:outline-none"
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

          <div className="absolute top-4 right-4">
        <button
          className="px-4 py-2 "
          onClick={handleClose}
        >
          <Icon1></Icon1>
        </button>
      </div>


          <div className="w-[150px]">
            <select
              className="w-full h-[50px] bg-transparent text-center text-white text-[18px] font-medium font-['Poppins'] border border-white rounded-[10px] focus:outline-none"
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
              className="w-full h-[50px] bg-transparent text-center text-white text-[18px] font-medium font-['Poppins'] border border-white rounded-[10px] focus:outline-none"
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
            className="w-full h-[50px] text-center bg-transparent text-white text-[18px] font-bold font-['Poppins'] border border-white rounded-[10px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            className="w-full h-[50px] text-center bg-transparent text-white text-[18px] font-medium font-['Poppins'] border border-white rounded-[10px] focus:outline-none"
          />
        </div>

        
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg ml-72"
            onClick={() => handleSavePayment(amount, note, `${day} ${month} ${year}`)}
          >
            Add Payment
          </button>
        </div>
      </div>
    
  );
};

export default PopupModal;