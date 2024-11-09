"use client";

import Link from "next/link";
import { signOut } from  "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function LeftPanel() {

    const router = useRouter();

    const handleLogout = async () => {
        console.log("Logout function called");
        try {
            await signOut({
                redirect: false,
                callbackUrl: "/login"
            });
            // Clear any local storage or cookies
            localStorage.clear();
            // Clear all cookies
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            // Force a hard reload of the page
            window.location.href = "/login";
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const Icon1 = () => {
        return (
            <>
            <svg  viewBox="0 0 40 47"  xmlns="http://www.w3.org/2000/svg">
                 <path d="M5.29396 0C2.37019 0 0 2.3673 0 5.2875V41.7125C0 44.6326 2.37019 47 5.29396 47H22.9414C25.8487 47 28.2086 44.6596 28.2354 41.7623L28.2359 41.7127V38.1877C28.2359 37.2144 27.446 36.4252 26.4712 36.4252C25.4035 36.4252 24.7317 36.1383 24.2671 35.7654C23.7777 35.3722 23.3741 34.7659 23.0647 33.9107C22.4233 32.1365 22.3539 29.7971 22.3537 27.6125C22.3537 27.1662 22.1841 26.7364 21.8791 26.4102C21.6996 26.218 21.5791 26.0878 21.4923 25.9943C21.2796 25.7647 21.2695 25.7539 21.0911 25.5861C20.9173 25.4228 20.3862 24.9163 18.3077 22.8413C17.2054 21.7408 16.5941 20.8095 16.3941 20.0981C16.3026 19.7722 16.3073 19.529 16.3574 19.3332C16.4073 19.1391 16.5296 18.8841 16.839 18.575C17.1482 18.266 17.403 18.1445 17.5962 18.0951C17.7908 18.0453 18.0336 18.0406 18.3592 18.1324C19.071 18.3329 20.0027 18.9445 21.1055 20.0467C22.3751 21.3154 23.5817 22.5071 24.6623 23.5747C26.4493 25.3396 27.8942 26.7667 28.7107 27.6405C29.3756 28.352 30.4923 28.3904 31.2047 27.7262C31.9172 27.0621 31.9558 25.9468 31.2908 25.2352C30.6212 24.5187 29.5453 23.4434 28.2349 22.1464L28.2347 14.2417L34.9202 20.919C35.9128 21.9105 36.4707 23.2554 36.4707 24.6576V45.2375C36.4707 46.2109 37.2608 47 38.2353 47C39.2099 47 40 46.2109 40 45.2375V24.6576C40 22.3205 39.0704 20.0791 37.4156 18.4263L28.2347 9.25651L28.2345 5.28736C28.2345 2.3672 25.8644 0 22.9405 0H5.29396ZM22.0556 38.5123C22.8116 39.1195 23.6972 39.5425 24.7061 39.7658V39.95H22.9417C21.9671 39.95 21.177 40.7391 21.177 41.7125V43.475H17.6477V41.7125C17.6477 39.613 18.8729 37.7993 20.6479 36.9458C21.0246 37.5213 21.4867 38.0557 22.0556 38.5123ZM18.8267 28.3079C18.8312 28.9024 18.8442 29.5449 18.8802 30.2111C17.5357 31.1643 15.8925 31.7248 14.1184 31.7248C9.57021 31.7248 5.88324 28.0423 5.88324 23.4998C5.88324 18.9572 9.57021 15.2748 14.1184 15.2748C14.4963 15.2748 14.868 15.3002 15.2325 15.3494C14.9186 15.5583 14.6222 15.8041 14.3431 16.0828C13.6552 16.77 13.1683 17.5643 12.9389 18.4572C12.71 19.3485 12.7653 20.2297 12.9962 21.0508C13.441 22.6333 14.5615 24.0854 15.8127 25.3344C17.8908 27.4088 18.4557 27.9497 18.6731 28.1537C18.6865 28.1664 18.6966 28.1758 18.7044 28.1828C18.7126 28.1904 18.7183 28.1953 18.723 28.1993L18.7322 28.2075C18.7444 28.2188 18.7557 28.231 18.8173 28.2978L18.8267 28.3079ZM7.05977 3.525H10.5891V5.28635C10.5891 8.20655 8.21889 10.5738 5.29512 10.5738H3.52931V7.04885H5.29512C6.2697 7.04885 7.05977 6.25977 7.05977 5.28635V3.525ZM17.6477 3.525H21.177V5.28635C21.177 6.25977 21.9671 7.04885 22.9417 7.04885H24.7054V10.5738H22.9417C20.0178 10.5738 17.6477 8.20655 17.6477 5.28635V3.525ZM10.5891 43.475H7.05977V41.7125C7.05977 40.7391 6.2697 39.95 5.29512 39.95H3.52931V36.425H5.29512C8.21889 36.425 10.5891 38.7924 10.5891 41.7125V43.475Z" fill="white"/>
            </svg>
            </>
            );
        }

    const Icon2 = () => {
        return (
            <>
            <svg  viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
            <path d="M0.083374 20.9166C0.083374 9.41242 9.41254 0.083252 20.9167 0.083252C32.4209 0.083252 41.75 9.41242 41.75 20.9166C41.75 21.6197 41.7153 22.3147 41.6471 22.9999H33.9375C30.1982 22.9999 27.1667 26.0314 27.1667 29.7708V40.7958C25.1936 41.4158 23.0942 41.7499 20.9167 41.7499C9.41254 41.7499 0.083374 32.4208 0.083374 20.9166ZM19.3542 24.0416H27.6875C28.55 24.0416 29.25 23.3416 29.25 22.4791C29.25 21.6166 28.55 20.9166 27.6875 20.9166H20.9167V9.97909C20.9167 9.11659 20.2167 8.41659 19.3542 8.41659C18.4917 8.41659 17.7917 9.11659 17.7917 9.97909V22.4791C17.7917 23.3416 18.4917 24.0416 19.3542 24.0416ZM43.3125 25.0833H33.9375C31.348 25.0833 29.25 27.1812 29.25 29.7708V43.3124C29.25 45.902 31.348 47.9999 33.9375 47.9999H43.3125C45.9021 47.9999 48 45.902 48 43.3124V29.7708C48 27.1812 45.9021 25.0833 43.3125 25.0833ZM42.7917 43.8333H34.4584C33.8834 43.8333 33.4167 43.3666 33.4167 42.7916C33.4167 42.2166 33.8834 41.7499 34.4584 41.7499H42.7917C43.3667 41.7499 43.8334 42.2166 43.8334 42.7916C43.8334 43.3666 43.3667 43.8333 42.7917 43.8333ZM42.7917 37.5833H34.4584C33.8834 37.5833 33.4167 37.1166 33.4167 36.5416C33.4167 35.9666 33.8834 35.4999 34.4584 35.4999H42.7917C43.3667 35.4999 43.8334 35.9666 43.8334 36.5416C43.8334 37.1166 43.3667 37.5833 42.7917 37.5833ZM42.7917 31.3333H34.4584C33.8834 31.3333 33.4167 30.8666 33.4167 30.2916C33.4167 29.7166 33.8834 29.2499 34.4584 29.2499H42.7917C43.3667 29.2499 43.8334 29.7166 43.8334 30.2916C43.8334 30.8666 43.3667 31.3333 42.7917 31.3333Z" fill="white"/>
            </svg>
            </>
            );
        }
            
    const Icon3 = () => {
        return (
            <>
            <svg  viewBox="0 0 45 47"  xmlns="http://www.w3.org/2000/svg">
            <path d="M19.964 1.71484C21.4749 0.612305 23.5251 0.612305 25.036 1.71484L43.2813 15.0291C45.6818 16.7807 44.445 20.5794 41.4756 20.5842H3.52432C0.5549 20.5794 -0.681813 16.7807 1.71865 15.0291L19.964 1.71484ZM24.9583 11.3655C24.9583 10.0078 23.8577 8.90716 22.5 8.90716C21.1423 8.90716 20.0417 10.0078 20.0417 11.3655C20.0417 12.7232 21.1423 13.8238 22.5 13.8238C23.8577 13.8238 24.9583 12.7232 24.9583 11.3655ZM20.6562 35.3341H15.7396V23.0425H20.6562V35.3341ZM29.2604 35.3341H24.3438V23.0425H29.2604V35.3341ZM38.4792 35.3341H32.9479V23.0425H38.4792V35.3341ZM39.0938 37.7925H5.90625C2.85143 37.7925 0.375 40.269 0.375 43.3237V44.5529C0.375 45.5711 1.20048 46.3966 2.21875 46.3966H42.7812C43.7995 46.3966 44.625 45.5711 44.625 44.5529V43.3237C44.625 40.269 42.1485 37.7925 39.0938 37.7925ZM12.0521 35.3341H6.52083V23.0425H12.0521V35.3341Z" fill="white"/>
            </svg>
            </>
            );
        }

    const Icon4 = () => {
        return (
            <>
            <svg  viewBox="0 0 38 46"  xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 0.5C2.5184 0.5 0 3.0184 0 6.125V39.875C0 42.9816 2.5184 45.5 5.625 45.5H35.4375C36.3695 45.5 37.125 44.7445 37.125 43.8125C37.125 42.8805 36.3695 42.125 35.4375 42.125H5.625C4.38237 42.125 3.375 41.1177 3.375 39.875H35.4375C36.3695 39.875 37.125 39.1195 37.125 38.1875V6.125C37.125 3.0184 34.6066 0.5 31.5 0.5H5.625ZM9 7.25H27C28.2427 7.25 29.25 8.25737 29.25 9.5V11.75C29.25 12.9926 28.2427 14 27 14H9C7.75737 14 6.75 12.9926 6.75 11.75V9.5C6.75 8.25737 7.75737 7.25 9 7.25Z" fill="white"/>
            </svg>
            </>
            );
        }
    
    const Icon5 = () => {
        return (
            <>
            <svg viewBox="0 0 60 49"  xmlns="http://www.w3.org/2000/svg">
            <path d="M29.9949 2.24192V20.6086L29.9934 22.1178L7.66515 22.1148L12.8332 16.9635C13.632 16.1676 13.7046 14.9224 13.0508 14.045L12.8326 13.7937C12.0336 12.9981 10.7836 12.9259 9.90262 13.5772L9.65028 13.7942L0.658955 22.7526C-0.139179 23.5478 -0.212391 24.7916 0.439919 25.669L0.657455 25.9204L9.64878 34.896C10.5264 35.7725 11.9514 35.774 12.8311 34.8999C13.6311 34.1049 13.7052 32.8599 13.0526 31.9816L12.8347 31.73L7.69515 26.5976L29.9934 26.6005L29.9949 46.7579C29.9949 48.1518 31.2587 49.2076 32.6366 48.9652L58.141 44.4786C59.2162 44.2894 60 43.3588 60 42.2713V6.41335C60 5.31564 59.2018 4.37947 58.1143 4.20159L32.6099 0.0301614C31.2398 -0.193916 29.9949 0.859051 29.9949 2.24192ZM40.4902 23.5971C42.1509 23.5971 43.4972 24.938 43.4972 26.5922C43.4972 28.2463 42.1509 29.5869 40.4902 29.5869C38.8296 29.5869 37.4833 28.2463 37.4833 26.5922C37.4833 24.938 38.8296 23.5971 40.4902 23.5971ZM26.9944 44.5205L24.6984 44.521L24.393 44.5004C23.2933 44.3516 22.4462 43.412 22.448 42.2758L22.4696 29.5741H26.9944V44.5205ZM26.9884 19.1145L26.9944 15.3051V4.17195L24.7581 4.17198C23.6203 4.17198 22.6794 5.0133 22.5288 6.10586L22.5078 6.40964L22.4877 19.1145H26.9884Z" fill="white"/>
            </svg>
            </>
            );
        }

        return (
            <>
                {/* Toggle button for mobile view */}
                <button
                    className="lg:hidden fixed top-4 left-4 z-20 bg-green-800 p-2 rounded-md text-white shadow-md"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
    
                {/* Sidebar Navigation */}
                <nav className={`bg-gradient-to-b from-[#018053] to-[#001a10] flex flex-col items-center p-6 space-y-6 w-full max-w-xs h-screen lg:h-screen rounded-tr-2xl rounded-br-2xl shadow-2xl fixed lg:relative z-10 transition-transform duration-300 
                ${ isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
                >
                    {/* Profile Photo and Welcome Message */}
                    <div className="flex items-center w-full mt-14 lg:mt-auto">
                        <img
                            src="images/avatar.jpg"
                            alt="avatar"
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-4 border border-white shadow-lg"
                        />
                        <div>
                            <p className="text-white text-xs lg:text-sm">Welcome back,</p>
                            <p className="text-white text-lg lg:text-2xl font-semibold">Jhenesis</p>
                        </div>
                    </div>
    
                    {/* Date Display */}
                    <p className="text-white text-xs lg:text-sm">November 6, 2024</p>
    
                    {/* Navigation Buttons */}
                    <div className="space-y-2 w-full flex-grow">
                        <Link
                            href="/expenses"
                            className="block w-full bg-gradient-to-br from-[#018053] to-[#001a10] rounded-xl py-2 lg:py-3 px-2 text-white shadow-lg font-medium border border-white text-center hover:opacity-75 hover:text-green-400 transition duration-300"
                        >
                            <div className="w-6"></div>
                            <div className="absolute left-20 px-1 w-8 h-6">
                                <Icon1 />
                            </div>
                            <div className="flex-grow text-center">Expenses</div>
                        </Link>
                        <Link
                            href="/payments"
                            className="block w-full bg-gradient-to-br from-[#018053] to-[#001a10] rounded-xl py-2 lg:py-3 px-2 text-white shadow-lg font-medium border border-white text-center hover:opacity-75 hover:text-green-400 transition duration-300"
                        >
                            <div className="w-6"></div>
                            <div className="absolute left-20  px-1 w-8 h-6 ">
                                <Icon2 />
                            </div>
                            <div className="flex-grow text-center">Payment</div>
                        </Link>
                        <Link
                            href="/savingGoals"
                            className="block w-full bg-gradient-to-br from-[#018053] to-[#001a10] rounded-xl py-2 lg:py-3 px-2 text-white shadow-lg font-medium border border-white text-center hover:opacity-75 hover:text-green-400 transition duration-300"
                        >
                            <div className="w-6"></div>
                            <div className="absolute left-20  px-1 w-8 h-6 ">
                                <Icon3 />
                            </div>
                            <div className="flex-grow text-center ml-8">Saving Goals</div>
                        </Link>
                        <Link
                            href="/budgetPlanner"
                            className="block w-full bg-gradient-to-br from-[#018053] to-[#001a10] rounded-xl py-2 lg:py-3 px-2 text-white shadow-lg font-medium border border-white text-center hover:opacity-75 hover:text-green-400 transition duration-300"
                        >
                            <div className="w-6"></div>
                            <div className="absolute left-20  px-1 w-8 h-6 ">
                                <Icon4 />
                            </div>
                            <div className="flex-grow text-center ml-10">Budget Planner</div>
                        </Link>
                    </div>
    
                    {/* Settings and Logout Buttons */}
                    <div className="w-full space-y-4 mt-6 lg:mt-auto">
                        <Link
                            href="/settings"
                            className="block font-medium text-white text-center hover:text-green-400 transition duration-300"
                        >
                            Settings and Privacy 
                        </Link>
                        <button onClick={() => handleLogout()} className="block w-full bg-gradient-to-br from-[#018053] to-[#001a10] rounded-xl py-2 lg:py-3 px-2 text-white shadow-lg font-medium border border-white text-center hover:opacity-75 hover:text-green-400 transition duration-300">
                            <div className="w-6"></div>
                            <div className="absolute left-20 w-8 h-6 ">
                                <Icon5 />
                            </div>
                            <div className="flex-grow text-center">Logout</div>
                        </button>
                    </div>
                </nav>
    
                {/* Screen Overlay for Mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-0 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}
            </>

    );
}