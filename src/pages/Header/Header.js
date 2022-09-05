import React from "react";
import Arrow from "./web-arrow.svg";
import { Tabs } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

function Header() {
  const navigate = useNavigate();

  const changeTab = (activeKey) => {
    navigate(activeKey);
  };

  return (
    <div className="head-container">
      <div className="head-inner-container">
        <img src={Arrow} className="back-arrow-image" alt="arrow" />
      </div>

      <div style={{ width: "53px" }}></div>
    </div>
  );
}

export default Header;
