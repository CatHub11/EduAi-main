import { useState } from "react";
import { format, addDays, startOfWeek, getDay } from "date-fns";
import { Modal, Button, TimePicker } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse: (dateString) => new Date(dateString),
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const Calendar = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [activeDay, setActiveDay] = useState(format(today, "yyyy-MM-dd"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false); // New state for event modal
  const [events, setEvents] = useState({});
  const [newTask, setNewTask] = useState("");
  const [taskTime, setTaskTime] = useState(null);
  const [viewType, setViewType] = useState("day"); // day, week, month view
  const [selectedSlot, setSelectedSlot] = useState(null); // for selected time slot
  const [selectedEvent, setSelectedEvent] = useState(null); // New state for the selected event

  function generateTasks() {
    const taskOptions = ["Research", "Group Study", "Wireframe", "Meeting", "Review"];
    return taskOptions.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
  }

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

  const handleDateClick = (fullDate, tasks) => {
    setActiveDay(fullDate);
    setIsModalOpen(true);
    setEvents((prevEvents) => ({ ...prevEvents, [fullDate]: tasks }));
  };

  const handleAddTask = () => {
    if (newTask.trim() === "" || !taskTime) return;

    const formattedTime = format(taskTime.toDate(), "hh:mm a");
    const taskWithTime = `${newTask} at ${formattedTime}`;

    setEvents((prevEvents) => {
      const updatedTasks = [...(prevEvents[activeDay] || []), taskWithTime];
      return { ...prevEvents, [activeDay]: updatedTasks };
    });

    setNewTask("");
    setTaskTime(null);
  };

  const handleViewClick = (view) => {
    setViewType(view);
    setIsModalOpen(true);
  };

  const handleSlotSelect = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event
    setIsEventModalOpen(true); // Open the event details modal
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: "5px",
        border: "none",
      },
    };
  };

  return (
    <div className="bg-[#0D0D0D] relative w-96 h-[27vh] rounded-xl overflow-hidden shadow-xl cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-l font-bold text-white">Upcoming Tasks</h1>
        <Button title="View" icon={<BarChartOutlined />} onClick={() => handleViewClick("month")} />
      </div>

      <div className="flex gap-4 items-center overflow-auto working-dates">
        {days.map(({ day, name, fullDate, tasks }) => (
          <div
            key={fullDate}
            className={`p-4 h-35 rounded-xl text-center cursor-pointer transition-all border-2 transform hover:scale-105 shadow-md ${
              activeDay === fullDate ? "bg-green-100 border-green-700" : "bg-white border-gray-300"
            }`}
            onClick={() => handleDateClick(fullDate, tasks)}
          >
            <div className="text-lg font-bold text-gray-800 mb-2">{day}</div>
            <div className="text-sm text-gray-600 mb-3">{name}</div>
            <div>
              {tasks.map((task, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 rounded-full text-xs mt-1 bg-green-100 text-green-700"
                >
                  {task}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} closable={false} style={{ top: "10%" }}>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedSlot
                    ? `Selected Time: ${format(selectedSlot.start, "PPPP h:mm a")} - ${format(selectedSlot.end, "h:mm a")}`
                    : `Selected Date: ${format(new Date(activeDay + "T00:00:00"), "PPPP")}`}
                </h2>

                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    className="border text-white border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <TimePicker use12Hours format="h:mm a" onChange={setTaskTime} className="text-white" />
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleAddTask}>
                    Add
                  </button>
                </div>

                <BigCalendar
                  localizer={localizer}
                  events={Object.keys(events).map(date => ({
                    title: events[date].join(", "),
                    start: new Date(date),
                    end: new Date(date),
                  }))}
                  startAccessor="start"
                  endAccessor="end"
                  view={viewType}
                  onSelectSlot={handleSlotSelect}
                  selectable
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={handleEventClick} // Capture click on an event
                  onView={(newView) => setViewType(newView)} // Update the viewType state when the view changes
                  style={{ height: 500 }}
                />
              </div>
            </Modal>
          </motion.div>
        )}

        {/* Event details modal */}
        {isEventModalOpen && selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Modal
              open={isEventModalOpen}
              onCancel={() => setIsEventModalOpen(false)}
              footer={null}
              closable={false}
              style={{ top: "10%" }}
            >
              <h2 className="text-lg font-semibold text-white">Event Details</h2>
              <div className="text-white">
                <p><strong>Task: </strong>{selectedEvent.title}</p>
                <p><strong>Time: </strong>{format(selectedEvent.start, "h:mm a")}</p>
              </div>
              <Button onClick={() => setIsEventModalOpen(false)} className="bg-green-500 text-white mt-4">Close</Button>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
