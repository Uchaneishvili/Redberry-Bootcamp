import { Form, Input, Select, Button } from "antd";
import React from "react";
import "./EmployeeInfo.css";
import arrow from "./Vector.svg";
import Footer from "./Footer-logo.svg";

function EmployeeInfo() {
  const { Option } = Select;

  return (
    <>
      <div className="parent-container">
        <div className="tab-container">
          <div className="arrow-vector-container">
            <img src={arrow} alt="back" />
          </div>
          <div className="tab-title">
            <h5 className="bold-title">თანამშრომლის ინფო</h5>
            <p className="page">1/2</p>
          </div>
          <div />
        </div>
        <div className="main-container-container">
          <div className="main-employee-container">
            <Form
              initialValues={{ team: "თიმი", position: "პოზიცია" }}
              layout={"vertical"}
            >
              <div className="fullName-container">
                <Form.Item
                  name={["user", "name"]}
                  label={"სახელი"}
                  rules={[
                    {
                      message: "ველის შევსება სავალდებულოა",
                      required: true,
                    },
                    {
                      message: "შეიყვანეთ მხოლოდ ქართული სიმბოლოები",
                      pattern: "([]+|[\u10D0-\u10FF])",
                    },
                    { message: "შეიყვანეთ მინიმუმ 2 სიმბოლო", min: 2 },
                  ]}
                >
                  <Input className="custom-input firstName" />
                </Form.Item>
                <Form.Item
                  name={["user", "surname"]}
                  label={"გვარი"}
                  rules={[
                    {
                      message: "ველის შევსება სავალდებულოა",
                      required: true,
                    },
                    {
                      message: "შეიყვანეთ მხოლოდ ქართული სიმბოლოები",
                      pattern: "([]+|[\u10D0-\u10FF])",
                    },
                    { message: "შეიყვანეთ მინიმუმ 2 სიმბოლო", min: 2 },
                  ]}
                >
                  <Input className="custom-input lastName" />
                </Form.Item>
              </div>

              <Form.Item name="team">
                <Select className="custom-select" bordered={false}>
                  <Option value={1}>დეველოპმენტი</Option>
                  <Option value={2}>HR</Option>
                  <Option value={3}>გაყიდვები</Option>
                  <Option value={4}>დიზაინი</Option>
                  <Option value={5}>მარკეტინგი</Option>
                </Select>
              </Form.Item>
              <Form.Item name="position">
                <Select
                  className="custom-select"
                  bordered={false}
                  rules={[{ required: true }]}
                >
                  <Option value={1}>Hello</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={"მეილი"}
                name={["user", "email"]}
                rules={[
                  {
                    message: "ველის შევსება სავალდებულოა",
                    required: true,
                  },
                ]}
              >
                <Input className="custom-input" />
              </Form.Item>
              <Form.Item
                name={["user", "phone"]}
                label={"ტელეფონის ნომერი"}
                rules={[
                  {
                    message: "ველის შევსება სავალდებულოა",
                    required: true,
                  },
                  { message: "შეიყვანეთ 9 სიმბოლო", min: 9, max: 9 },
                  {
                    message: "ტელეფონის ნომერი უნდა იწყებოდეს 5 ით",
                    pattern: "^[5].*",
                  },
                ]}
              >
                <Input
                  type={"number"}
                  className="custom-input"
                  prefix={"+995"}
                />
              </Form.Item>
            </Form>

            <div className="next-button-container">
              <Button className="next-button">შემდეგი</Button>
            </div>
          </div>
        </div>
        <div className="footer-logo-container">
          <img src={Footer} />
        </div>
      </div>
    </>
  );
}

export default EmployeeInfo;
