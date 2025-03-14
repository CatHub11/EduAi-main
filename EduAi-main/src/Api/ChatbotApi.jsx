import { useState, useEffect } from "react";
import { Input, Modal, Spin } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import manthinkingvatar from "/manthinkingvatar.svg";
import { LoadingOutlined } from "@ant-design/icons";
import Calendar from "../components/Calendar/Calendar";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isBotModalOpen, setIsBotModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [botResponse, setBotResponse] = useState("");
  const [specialAnimation, setSpecialAnimation] = useState(false);
  const [timer, setTimer] = useState(5);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsUserModalOpen(true);
    setBotResponse("");
    setIsBotModalOpen(true);
    setLoading(true);

    // Check for special message
    if (message.includes("calendar")) {
      setSpecialAnimation(true);
    }

    try {
      const API_KEY = "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";
      if (!API_KEY) throw new Error("Missing API key");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: message,
            options: { use_cache: false, max_new_tokens: 180 },
          }),
        }
      );

      const data = await response.json();
      const botMessage =
        Array.isArray(data) && data.length > 0 && data[0].generated_text
          ? data[0].generated_text
          : "No response from AI.";

      setBotResponse(botMessage);
    } catch (error) {
      setBotResponse("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Input Field */}
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Edu Ai..."
        onPressEnter={handleSendMessage}
        style={{
          width: "100%",
          marginBottom: "20px",
          height: "50px",
          backgroundColor: "#1a1a1a",
          color: "white",
          border: "1px solid #9e9e9e52",
          borderRadius: "50px",
        }}
        className="custom-input"
      />

      <div className="!bg-violet-700">
        {/* User Message Modal */}
        <AnimatePresence>
          {isUserModalOpen && (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Modal
                open={isUserModalOpen}
                onCancel={() => setIsUserModalOpen(false)}
                footer={null}
                closable={false}
                style={{
                  top: 100,
                  zIndex: 1000,
                  width: "40rem",
                  marginLeft: "3rem",
                }}
              >
                <div className="flex items-center gap-5">
                  <img className="max-w-11" src={manthinkingvatar} alt="" />
                  <p className="user-message-response">{message}</p>
                </div>
              </Modal>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot Response Modal */}
        <AnimatePresence>
          {isBotModalOpen && (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Modal
                open={isBotModalOpen}
                onCancel={() => setIsBotModalOpen(false)}
                footer={null}
                closable={false}
                loading={loading}
                style={{
                  top: 215,
                  zIndex: 999,
                  width: "50rem",
                  marginLeft: "3rem",
                }}
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    style={{ color: "green" }}
                  />
                ) : (
                  <p className="bot-message-response">{botResponse}</p>
                )}
              </Modal>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Special Animation Modal */}
        <AnimatePresence>
          {specialAnimation && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Modal
                open={specialAnimation}
                onCancel={() => setSpecialAnimation(false)}
                footer={null}
                style={{ top: 200, zIndex: 1001, marginRight: 0 }}
                className="calendar-modal-special"
              >
                <Calendar />
              </Modal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chatbot;
