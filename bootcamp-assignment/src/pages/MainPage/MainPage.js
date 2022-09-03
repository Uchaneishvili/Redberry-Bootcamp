import React from "react";
import Redberry_Title from "./Redberry_Title.svg";
import Main from "./Main-photo-web.svg";
import PC from "./PC.svg";
import "./MainPage.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigete = useNavigate();

  return (
    <>
      <div className="main-container">
        <div className="redberry-title-container">
          <img className="redberry-title" src={Redberry_Title} alt="Redberry" />
        </div>
        <div className="main-photo-container">
          <img className="main-photo web" src={Main} alt="Man" />
          <img className="main-photo mobile" src={PC} alt="PC" />
        </div>
        <div className="buttons-container">
          <div className="main-button-container add-button-container">
            <Button
              className="main-button add-button"
              type="primary"
              onClick={() => navigete(`/create`)}
            >
              ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ
            </Button>
          </div>
          <div className="main-button-container list-button-container">
            <Button className="main-button list-button" type="primary">
              ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
