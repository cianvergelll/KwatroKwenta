import React from 'react';
import LeftPanel from "@/components/left-panel"

const AddIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 51 51" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="ml-2"
  >
    <path 
      d="M25.4999 0.083252C39.537 0.083252 50.9166 11.4627 50.9166 25.4999C50.9166 39.537 39.537 50.9166 25.4999 50.9166C11.4627 50.9166 0.083252 39.537 0.083252 25.4999C0.083252 11.4627 11.4627 0.083252 25.4999 0.083252ZM25.4999 12.7916C24.5348 12.7916 23.7373 13.5087 23.611 14.4392L23.5937 14.6978V23.5937H14.6978C13.6451 23.5937 12.7916 24.4472 12.7916 25.4999C12.7916 26.465 13.5087 27.2626 14.4392 27.3889L14.6978 27.4062H23.5937V36.302C23.5937 37.3548 24.4472 38.2083 25.4999 38.2083C26.465 38.2083 27.2626 37.491 27.3889 36.5607L27.4062 36.302V27.4062H36.302C37.3548 27.4062 38.2083 26.5527 38.2083 25.4999C38.2083 24.5349 37.491 23.7373 36.5607 23.611L36.302 23.5937H27.4062V14.6978C27.4062 13.6451 26.5527 12.7916 25.4999 12.7916Z" 
      fill="white"
    />
  </svg>
);

export default function SavingGoals () {
  return (
    <div className="flex h-screen">
      <LeftPanel />
      
      {/* Middle Panel */}
      <div className="flex-1 bg-white p-8">
        
        {/* Form Container*/}
        <div className="w-full max-w-lg rounded-lg bg-gradient-to-r from-[#018053] to-black p-6">
          <h2 className="text-2xl text-white font-semibold mb-4">Create saving goals</h2>
          
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Goal name"
              className="w-full rounded-md bg-white/10 bg-opacity-50 p-3 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
            <input
              type="number"
              placeholder="Target amount"
              min="0"
              step="1"
              className="w-full rounded-md bg-white/10 p-3 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <textarea
              placeholder="Add note..."
              className="w-full rounded-md bg-white/10 p-3 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/30"
              rows={3}
            />
            <button className="flex items-center justify-between w-full rounded-md bg-white/20 hover:bg-white/30 px-4 py-3 text-white transition-colors">
              <span>Add saving goals</span>
              <AddIcon />
            </button>
          </form>
        </div>
        

        {/* Saving Goals */}
        <div className=" -mt-10 relative h-64 flex justify-center items-center">
  {/* Container for circles */}
  <div className="  left-12 relative w-[450px] h-64">

    {/* New Laptop Circle */}
    <div className="absolute -left-28 top-1/2 -translate-y-6 z-30 w-32 h-32 rounded-full bg-emerald-800 flex flex-col items-center justify-center text-white">
      <div className="text-xs">Total</div>
      <div className="font-semibold">₱6,000.00</div>
      <div className="text-xs text-emerald-300">₱15,000.00</div>
    </div>

    {/* ADV Circle */}
    <div className="absolute top-1/2 translate-y-4 z-20 w-40 h-40 rounded-full bg-yellow-600 flex flex-col items-center justify-center text-white">
      <div className="text-xs">Total</div>
      <div className="font-semibold">₱95,000.00</div>
      <div className="text-xs text-yellow-200">₱150,000.00</div>
    </div>

    {/* Computer Circle */}
    <div className="absolute left-36 top-1/2 -translate-y-6 z-30 w-32 h-32 rounded-full bg-blue-700 flex flex-col items-center justify-center text-white">
      <div className="text-xs">Total</div>
      <div className="font-semibold">₱18,000.00</div>
      <div className="text-xs text-blue-200">₱46,000.00</div>
    </div>

    {/* New Phone Circle */}
    <div className="absolute left-64 top-1/2 translate-y-4 z-20 w-28 h-28 rounded-full bg-red-700 flex flex-col items-center justify-center text-white">
      <div className="text-xs">Total</div>
      <div className="font-semibold">₱5,000.00</div>
      <div className="text-xs text-red-200">₱11,000.00</div>
    </div>
  </div>
</div>
</div>

{/* Right Panel */}
<div className="w-96 bg-white p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Goal overview</h2>
        </div>

        <div className="space-y-6">
          {/* Progress Circle w/ txt */}
          <div className="relative mx-auto w-48 h-48 mb-8">
            {/* Background Circle */}
            <div className="w-full h-full rounded-full bg-amber-100" />
            
            {/* Progress Fill */}
            <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-yellow-600 rounded-b-full">
              <div className="absolute inset-x-0 bottom-3 px-4">
                <div className="flex justify-between items-baseline text-center">
                  <div className="text-sm font-medium text-white">25% full</div>
                  <div className="text-xs text-amber-200 truncate">
                    ₱90,000
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Buy ADV 150</h3>
            <div className="space-y-2">
              <div className="bg-yellow-600 rounded-md p-3 text-white">
                Date started: September 24, 2024
              </div>
              <div className="bg-yellow-600 rounded-md p-3 text-white">
                Amount deposited: ₱30,000
              </div>
              <div className="bg-yellow-600 rounded-md p-3 text-white">
                Target amount: ₱120,000
              </div>
              <div className="bg-yellow-600 rounded-md p-3 text-white">
                Note: Buy an ADV for my transportation and a gift for my self!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}