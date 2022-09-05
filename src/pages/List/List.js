import React, { useState, useEffect } from "react";
import "./List.css";
import arrow from "./Vector.svg";
import Arrow from "./web-arrow.svg";
import axios from "axios";
import { Tabs } from "antd";

function List() {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 391;
  const [listData, setListData] = useState([]);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://pcfy.redberryinternship.ge/api/laptops?token=f39fea4fddada8a3a344125f8f9b6907"
        );

        setListData(data.data);
      } catch (err) {
        console.error("list cannot be loaded", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="outter-container">
      <div className="head-inner-container">
        <img
          src={isMobile ? arrow : Arrow}
          className="back-arrow-image"
          alt="arrow"
          onClick={() => window.history.back()}
        />
      </div>
      <Tabs activeKey={"list"}>
        <Tabs.TabPane tab="ჩანაწერების სია" key="list">
          <div className="parent-container">
            <div className="main-container-container">
              <div className="main-list-container">
                <div className="parent-inner-container">
                  {listData.map((data) => (
                    <div className="card-container">
                      <div className="card-inner-container">
                        <div className="card-image-container">
                          <img
                            src={`https://pcfy.redberryinternship.ge/${data.laptop.image}`}
                            alt="card"
                            className="card-image"
                          />
                        </div>
                        <div style={{ width: "3%" }} />
                        <div className="card-info-container">
                          <div className="laptop-info">
                            <div className="name-info-container">
                              <p className="name-info">{`${data.user.name} ${data.user.surname}`}</p>
                            </div>
                            <div className="cpu-info-container">
                              {/* cpu is not get from api */}
                              <p className="cpu-info">Pentium III</p>
                            </div>
                          </div>

                          <div className="see-more">
                            <a href={`/info/${data.laptop.id}`}>
                              <p className="linked-see-more">მეტის ნახვა</p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
