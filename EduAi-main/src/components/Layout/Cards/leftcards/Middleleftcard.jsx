import React, { useState } from 'react';
import { Card, Button, Progress, Modal, Spin } from 'antd';
import { BarChartOutlined, LoadingOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

const CircularProgress = ({ percent, size = 120, strokeWidth = 10, strokeColor = "#9981FF" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius * 2; // Full circle circumference
  const halfCircumference = circumference / 2; // Semicircle circumference
  const progressOffset = (1 - percent / 100) * halfCircumference; // Calculate the stroke offset for the given percent

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2},${size / 2}`}
          fill="none"
          stroke="#26262F"
          strokeWidth={strokeWidth}
        />
        {/* Animated Progress Arc */}
        <motion.path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2},${size / 2}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={halfCircumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: halfCircumference }} // Start the animation from full progress (semicircle empty)
          animate={{ strokeDashoffset: progressOffset }} // Animate to the progress offset
          transition={{ duration: 1, ease: "easeInOut" }} // Set duration for animation
        />
      </svg>
      {/* Animated Percentage Number from 0 to the target percentage */}
      <motion.p
        className="text-white text-lg font-semibold mt-[-20px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          <motion.span
            key={percent}  // Key forces the animation to reset each time the percentage changes
            initial={{ value: 0 }}  // Start the animation from 0
            animate={{ value: percent }}  // Animate to the target percentage
            transition={{ duration: 1 }} // 1 second duration for the animation
            style={{ fontSize: '24px' }} // Optional: You can style the number here
            // Update the animated number on change
            transform={value => Math.floor(value)} // Converts the value to an integer (e.g., 60)
          >
            {percent}%
          </motion.span>
        </motion.span>
      </motion.p>
    </div>
  );
};

const Middleleftcard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const statistics = { totalSessions: 120, averageScore: 85, lastScore: 90 };

  return (
    <>
      <Card
        title={<span style={{ color: 'white' }}>Your Progress: G-Score</span>} 
        icon={<BarChartOutlined />}
        style={{ backgroundColor: '#0D0D0D' }}
      >
        <div className="p-4">
          <Progress
            status="active"
            percent={60}
            percentPosition={{
              align: 'end',
              type: 'inner',
            }}
            size={[, 15]}
            strokeColor="#9981FF"
          />
        </div>
        <div className="flex gap-2 mt-3 items-center justify-between">
          <p className="text-white text-sm">
            Exceptional consistency! You've maintained peak performance for 5 days straight.
          </p>
          <Button title="View" icon={<BarChartOutlined />} onClick={() => setIsModalOpen(true)} />
        </div>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} closable={false} style={{ top: '25%' }}>
              {loading ? (
                <Spin indicator={<LoadingOutlined spin />} style={{ color: 'green' }} />
              ) : (
                <div>
                  <h1 style={{ fontSize: '1.5rem' }}>Your Stats</h1>
                  <p><strong>G-score:</strong></p>
                  <div className="bg-[#26262F] p-4 flex justify-center">
                    <CircularProgress percent={60} size={120} strokeWidth={12} strokeColor="#9981FF" />
                  </div>
                  <p><strong>Total Sessions:</strong> {statistics.totalSessions}</p>
                  <p><strong>Average Score:</strong> {statistics.averageScore}%</p>
                  <p><strong>Last Score:</strong> {statistics.lastScore}%</p>
                </div>
              )}
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Middleleftcard;
