import React, { useState } from 'react';
import { Card, Button, Modal, Spin } from 'antd';
import { BarChartOutlined, LoadingOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

const AboutEduAI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        title={<><BarChartOutlined /> EDUAI: A Revolutionary Tool to Transform Your Learning Experience</>}
        className="h-full"
      >
        <div className="bg-[#0D0D0D] p-4">
          <Button
            className="!relative"
            title="About EduAI"
            icon={<BarChartOutlined />}
            onClick={handleViewClick}
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
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              closable={false}
              style={{
                position: 'fixed',
                top: '25%',
                left: '35%',
                zIndex: 1000,
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
                  <h1 style={{ fontSize: '1.5rem' }}>About EduAI</h1>
                  <p>EduAI is a powerful learning tool that uses AI technology to generate an effective study schedule and learning aids to maximize your score on the next exam!</p>
                </div>
              )}
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutEduAI;
