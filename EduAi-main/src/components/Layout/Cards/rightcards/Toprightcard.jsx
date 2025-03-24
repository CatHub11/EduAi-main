import React, { useState, useEffect } from "react";
import Card3D from "../../Card3D/Card3D";
import {
  TagsOutlined,
  AntDesignOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Progress, Avatar, Tooltip } from "antd";
import AnimatedList from "../../../Animations/AnimatedList";

const Toprightcard = () => {
  const [percent, setPercent] = useState(0); // Starting from 0%

  // Animate progress from 0% to 75%
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 75) {
          clearInterval(interval);
          return 75;
        }
        return prevPercent + 3;
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  return (
    <Card3D title="Goals" icon={<TagsOutlined />}>
      <div className="flex justify-between items-start">
        {/* Left Section - Top Priorities */}
        <div className="pr-4 flex-1 min-w-[200px] max-w-[400px] p-2">
          <h1 className="text-lg font-semibold">Top Priorities</h1>
          <div 
            className="Priorities-list w-full max-h-[250px] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <AnimatedList
              items={items}
              onItemSelect={(item, index) => console.log(item, index)}
              enableArrowNavigation={true}
              displayScrollbar={false}
              className="Study-Planner-Body max-w-full Goals-List"
              itemClassName="p-1 text-sm text-white border border-gray-700 rounded-md mb-1 bg-gray-900 hover:bg-gray-700 transition"
            />
          </div>
        </div>

        {/* Adjusted Divider - Moved Slightly Left */}
        <div className="h-full flex items-center mr-8"> {/* Increased right margin */}
          <div className="border-l border-gray-300 h-[80%]"></div>
        </div>

        {/* Right Section - Progress Bar and Avatar */}
        <div className="flex flex-col items-center justify-start">
          {/* Progress Bar */}
          <div className="flex justify-center mb-4">
            <Progress
              type="dashboard"
              percent={percent}
              size={55}
              strokeColor="#9981FF"
              format={(percent) => (
                <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                  {percent}%
                </span>
              )}
            />
          </div>

          {/* Streaks Title and Text */}
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-[16px] font-semibold flex items-center">
              Streaks
            </h1>
            <p className="text-[10px] text-gray-400">Streak goal: Study for 2 hrs per day</p>
          </div>

          {/* Avatar Group */}
          <div>
            <Avatar.Group>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <a href="https://ant.design">
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              </a>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </div>
        </div>
      </div>
    </Card3D>
  );
};

export default Toprightcard;
