import { Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import "./EmployeeInfo.css";
import arrow from "./Vector.svg";
import Footer from "./Footer-logo.svg";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";

function EmployeeInfo() {
  const { Option } = Select;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [teams, setTeams] = useState([]);
  const [positions, setPosition] = useState([]);
  const [currentTeam, setCurrentTeam] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teams = await axios.get(
          "https://pcfy.redberryinternship.ge/api/teams"
        );
        const positions = await axios.get(
          "https://pcfy.redberryinternship.ge/api/positions"
        );

        setTeams(teams.data.data);
        setPosition(positions.data.data);
      } catch (err) {
        console.error("data cannot be loaded", err);
      }
    };

    fetchData();
  }, []);

  const validate = async () => {
    try {
      await form.validateFields();
      navigate("/laptopSpecs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="parent-container">
        <div className="tab-container">
          <div className="arrow-vector-container">
            <img src={arrow} alt="back" onClick={() => window.history.back()} />
          </div>
          <div className="tab-title">
            <h5 className="bold-title">თანამშრომლის ინფო</h5>
            <p className="page">1/2</p>
          </div>
          <div />
        </div>

        <div className="web-header">
          <Header />
        </div>

        <div className="main-container-container">
          <div className="main-employee-container">
            <Form layout={"vertical"} form={form}>
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
                      pattern: "^[ა-ჰ]+$",
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
                      pattern: "^[ა-ჰ]+$",
                    },
                    { message: "შეიყვანეთ მინიმუმ 2 სიმბოლო", min: 2 },
                  ]}
                >
                  <Input className="custom-input lastName" />
                </Form.Item>
              </div>

              <Form.Item
                name="team"
                rules={[
                  {
                    message: "ველის შევსება სავალდებულოა",
                    required: true,
                  },
                ]}
              >
                <Select
                  className="custom-select"
                  bordered={false}
                  placeholder={"თიმი"}
                  onChange={(e) => setCurrentTeam(e)}
                >
                  {teams.map((team) => (
                    <Option value={team.id} key={team.id}>
                      {team.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="position"
                rules={[
                  {
                    message: "ველის შევსება სავალდებულოა",
                    required: true,
                  },
                ]}
              >
                <Select
                  className="custom-select"
                  bordered={false}
                  placeholder={"პოზიცია"}
                >
                  {positions.map(
                    (position) =>
                      position.team_id === currentTeam && (
                        <Option value={position.id} key={position.id}>
                          {position.name}
                        </Option>
                      )
                  )}
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
              <Button className="next-button" onClick={() => validate()}>
                შემდეგი
              </Button>
            </div>
          </div>
        </div>

        <div className="footer-logo-container">
          <img src={Footer} alt="footer-redberry-icon" />
        </div>
      </div>
    </>
  );
}

export default EmployeeInfo;
