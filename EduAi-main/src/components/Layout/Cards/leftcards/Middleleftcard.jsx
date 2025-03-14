import React, { useState } from 'react';
import { Card, Button, Progress, Modal, Spin } from 'antd';
import { BarChartOutlined, LoadingOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

const Middleleftcard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Example statistics to show in the modal
  const statistics = {
    totalSessions: 120,
    averageScore: 85,
    lastScore: 90,
  };

  const handleViewClick = () => {
    setIsModalOpen(true); // Opens the modal when the View button is clicked
  };

  return (
    <>
      <Card
        title="Your Progress: G-Score"
        icon={<BarChartOutlined />}
        className="h-full"
      >
        <div className="bg-[#0D0D0D] p-4">
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
          <p className="text-[#7E7E7E] text-sm">
            Exceptional consistency! You've maintained peak performance for 5 days straight.
          </p>
          <Button
            className="!relative"
            title={"View"}
            icon={<BarChartOutlined />}
            onClick={handleViewClick} // Trigger modal open on button click
          />
        </div>
      </Card>

      {/* Modal Component */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Modal
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)} // Close the modal
              footer={null}
              closable={false}
              loading={loading}
              style={{
                position: 'fixed',
                top: '25%',
                left: '35%',
                zIndex: '30%',
                width: '50rem',
              }}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined spin />}
                  style={{ color: 'green' }}
                />
              ) : (
                <div>
                  <h1 style={{ fontSize: '1.5rem' }}>Your Stats</h1>
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

