import React, { useState, useEffect } from "react";
import arrow from "./Vector.svg";
import Arrow from "./web-arrow.svg";
import axios from "axios";
import { Tabs, Row, Col, Form, Layout, Divider } from "antd";
import "./Detail.css";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 391;
  const [info, setInfo] = useState();

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
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
          `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=f39fea4fddada8a3a344125f8f9b6907`
        );

        setInfo(data.data);
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
        />
      </div>
      <Tabs activeKey={"info"}>
        <Tabs.TabPane tab="ლეპტოპის ინფო" key="info">
          <div className="parent-container">
            <div className="main-info-container-container">
              <div className="main-info-container">
                <div className="parent-info-inner-container">
                  <div className="left-side-info-container">
                    <img
                      src="https://i.picsum.photos/id/1021/577/342.jpg?hmac=t2lkJ2Sd0sr0hhRsgF9lyoFOn43HnaLj2sXRI04qKf8"
                      alt="laptop"
                      width={"100%"}
                      className="laptop-info-image"
                    />
                  </div>
                  <div className="right-side-info-container">
                    <Form {...layout}>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">სახელი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">{info?.user.name}</span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">თიმი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.user.team_id}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">პოზიცია:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.user.position_id}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">მეილი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.user.email}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">ტელ.ნომერი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.user.phone_number}
                          </span>
                        </Col>
                      </div>
                    </Form>
                  </div>
                </div>
                <Divider />

                <div className="parent-info-inner-container">
                  <div className="left-side-info-container">
                    <Form {...layout}>
                      <div className="info-inline-container">
                        <Col span={32}>
                          <span className="field-name">ლეპტოპის სახელი:</span>
                        </Col>
                        <Col span={32}>
                          <span className="field-value">
                            {info?.laptop.name}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col span={32}>
                          <span className="field-name">ლეპტოპის ბრენდი:</span>
                        </Col>
                        <Col span={32}>
                          <span className="field-value">
                            {info?.laptop.brand_id}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col span={32}>
                          <span className="field-name">RAM</span>
                        </Col>
                        <Col span={32}>
                          <span className="field-value">
                            {info?.laptop.ram}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">მეხსიერების ტიპი</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.laptop.hard_drive_type}
                          </span>
                        </Col>
                      </div>
                    </Form>
                  </div>
                  <div className="right-side-info-container">
                    <Form {...layout}>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">CPU:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.laptop.cpu.name}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">CPU-ს ბირთვი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.laptop.cpu.cores}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">CPU-ს ნაკადი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.laptop.cpu.threads}
                          </span>
                        </Col>
                      </div>
                    </Form>
                  </div>
                </div>
                <Divider />
                <div className="parent-info-inner-container">
                  <div className="left-side-info-container">
                    <Form {...layout}>
                      <div className="info-inline-container">
                        <Col span={32}>
                          <span className="field-name">
                            ლეპტოპის მდგომარეობა:
                          </span>
                        </Col>
                        <Col span={32}>
                          <span className="field-value">
                            {info?.laptop.state}
                          </span>
                        </Col>
                      </div>
                      <div className="info-inline-container">
                        <Col span={32}>
                          <span className="field-name">ლეპტოპის ფასი:</span>
                        </Col>
                        <Col span={32}>
                          <span className="field-value">
                            {info?.laptop.price}
                          </span>
                        </Col>
                      </div>
                    </Form>
                  </div>
                  <div className="right-side-info-container">
                    <Form {...layout}>
                      <div className="info-inline-container">
                        <Col>
                          <span className="field-name">შეძენის რიცხვი:</span>
                        </Col>
                        <Col>
                          <span className="field-value">
                            {info?.laptop.purchase_date}
                          </span>
                        </Col>
                      </div>
                    </Form>
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

export default Detail;
