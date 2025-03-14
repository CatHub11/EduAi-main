import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Experience } from "./components/Experience";
import NavbarDefault from "./components/Layout/Navbar/Navbar";
import Leftcardlayout from "./components/Layout/Cards/Leftcardlayout";
import Rightcardlayout from "./components/Layout/Cards/Rightcardlayout";
import Calender from "./components/Calendar/Calendar";
// import ChatFooter from "./components/Layout/SearchBar/SearchQuizLayout";
import Chatbot from "./Api/ChatbotApi";
import Aurora from "./components/Animations/Aurora";

function App() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <>
      <div className="relative max-w-full w-full h-20">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.5}
          speed={0.5}
          className="absolute top-0 left-0 w-full h-full"
        />
        <NavbarDefault onCalendarClick={handleCalendarToggle} />
      </div>

      <div className="flex m-4 h-full relative">
        {showCalendar ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-4xl transform transition-all duration-500 scale-95 opacity-0 animate-fadeIn">
              <Calendar />
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handleCalendarToggle}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <Leftcardlayout />
            <Experience />
            <Rightcardlayout />
          </>
        )}
      </div>
    </>
  );
}

export default App;
