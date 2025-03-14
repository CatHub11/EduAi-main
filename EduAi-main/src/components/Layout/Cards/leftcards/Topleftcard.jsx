import { useState } from "react";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import Card3D from "../../Card3D/Card3D";
import ShinyText from "../../../Animations/ShinnyBorder";
import { BookOutlined } from "@ant-design/icons";
import Study from "../../../../assets/studying.jpg";
import { Button, Flex } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

// Localizer for BigCalendar
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse: (dateString) => new Date(dateString),
  startOfWeek: () => startOfWeek(new Date()),
  getDay: (date) => date.getDay(),
  locales,
});

const Calendar = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [activeDay, setActiveDay] = useState(format(today, "yyyy-MM-dd"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  const [newTask, setNewTask] = useState("");

  // Function to generate random tasks
  function generateTasks() {
    const taskOptions = [
      "Research",
      "Group Study",
      "Wireframe",
      "Meeting",
      "Review",
    ];
    return taskOptions
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
  }

  // Generate days with tasks
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    const fullDate = format(date, "yyyy-MM-dd");

    return {
      day: format(date, "d"),
      name: format(date, "EEE"),
      fullDate,
      tasks: events[fullDate] || generateTasks(),
    };
  });

  // Convert tasks into calendar events
  const handleDateClick = (fullDate, tasks) => {
    setActiveDay(fullDate);
    setIsModalOpen(true);

    const selectedDate = new Date(fullDate);
    const taskEvents = tasks.map((task, index) => ({
      title: task,
      start: setHours(setMinutes(selectedDate, index * 30), 9), // 9:00 AM, 9:30 AM, etc.
      end: setHours(setMinutes(selectedDate, index * 30 + 30), 9),
    }));

    setEvents((prevEvents) => ({ ...prevEvents, [fullDate]: tasks }));
  };

  // Handle adding new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    setEvents((prevEvents) => {
      const updatedTasks = [...(prevEvents[activeDay] || []), newTask];

      return { ...prevEvents, [activeDay]: updatedTasks };
    });

    setNewTask("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Upcoming Tasks</h1>
      </div>
      <div className="flex gap-4 items-center overflow-auto working-dates">
        {days.map(({ day, name, fullDate, tasks }) => (
          <div
            key={fullDate}
            className={`p-4 h-40 rounded-xl text-center cursor-pointer transition-all border-2 transform hover:scale-105 shadow-md ${
              activeDay === fullDate
                ? "bg-green-100 border-green-500"
                : "border-transparent"
            }`}
            onClick={() => handleDateClick(fullDate, tasks)}
          >
            <div className="text-lg font-bold text-gray-800 mb-2">{day}</div>
            <div className="text-sm text-gray-600 mb-3">{name}</div>
            <div>
              {tasks.map((task, index) => (
                <span
                  key={index}
                  className={`inline-block px-3 py-1 rounded-full text-xs mt-1 ${
                    task === "Research"
                      ? "bg-blue-100 text-blue-700"
                      : task === "Wireframe"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for React Big Calendar */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Selected Date: {format(new Date(activeDay), "PPPP")}
              </h2>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Add Task Input */}
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                className="border text-gray-800 border-gray-300 rounded-lg p-2 w-full"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>

            {/* React Big Calendar */}
            <div className="h-[300px] overflow-hidden rounded-md"> {/* Adjust height */}
              <BigCalendar
                localizer={localizer}
                events={Object.entries(events).flatMap(([date, tasks]) =>
                  tasks.map((task, index) => ({
                    title: task,
                    start: setHours(setMinutes(new Date(date), index * 30), 9),
                    end: setHours(setMinutes(new Date(date), index * 30 + 30), 9),
                  }))
                )}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%", color: "#333" }}
                className="bg-white text-gray-800 p-4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Topleftcard = () => {
  return (
    <Card3D title="Calendar" icon={<BookOutlined />}>
      {/* Add Calendar inside the card */}
      <div className="mt-4">
        <div className="overflow-hidden rounded-lg shadow-md w-[300px] h-[300px]"> {/* Adjust width and height */}
          <Calendar />
        </div>
      </div>
      
      <div>
        <Flex
          vertical
          gap="small"
          style={{
            width: "100%",
          }}
        >
          {/* Here you can add additional content if needed */}
        </Flex>
      </div>
    </Card3D>
  );
};

export default Topleftcard;
