import React, { useState, useEffect } from "react";
import "./List.css";
import arrow from "./Vector.svg";
import Arrow from "./web-arrow.svg";
import { Tabs } from "antd";
import isDeleted from "./Rectangle_4.png";

const { TabPane } = Tabs;

function List() {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 391;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="outter-container">
      <div className="head-inner-container">
        <img
          src={isMobile ? arrow : Arrow}
          className="back-arrow-image"
          alt="arrow"
        />
      </div>
      <Tabs activeKey={"list"}>
        <Tabs.TabPane tab="ჩანაწერების სია" key="list">
          <div className="parent-container">
            <div className="main-container-container">
              <div className="main-list-container">
                <div className="parent-inner-container">
                  <div className="card-container">
                    <div className="card-inner-container">
                      <div className="card-image-container">
                        <img
                          src={isDeleted}
                          alt="card"
                          className="card-image"
                        />
                      </div>
                      <div style={{ width: "3%" }} />
                      <div className="card-info-container">
                        <div className="laptop-info">
                          <div className="name-info-container">
                            <p className="name-info">ირინე ჩანქსელიანი</p>
                          </div>
                          <div className="cpu-info-container">
                            <p className="cpu-info">Pentium III</p>
                          </div>
                        </div>

                        <div className="see-more">
                          <p>მეტის ნახვა</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-container">
                    <div className="card-inner-container">
                      <div className="card-image-container">
                        <img
                          src={isDeleted}
                          alt="card"
                          className="card-image"
                        />
                      </div>
                      <div style={{ width: "3%" }} />
                      <div className="card-info-container">
                        <div className="laptop-info">
                          <div className="name-info-container">
                            <p className="name-info">ირინე ჩანქსელიანი</p>
                          </div>
                          <div className="cpu-info-container">
                            <p className="cpu-info">Pentium III</p>
                          </div>
                        </div>

                        <div className="see-more">
                          <p>მეტის ნახვა</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default List;
