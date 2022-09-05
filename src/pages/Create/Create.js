import Arrow from "./web-arrow.svg";
import { notification } from "antd";
import { Tabs, Steps } from "antd";
import React, { useEffect, useState } from "react";
import arrow from "./Vector.svg";
import "./Create.css";
import "../Header/Header.css";
import "../LaptopSpecs/LaptopSpecs.css";
import { useNavigate } from "react-router-dom";
import "../EmployeeInfo/EmployeeInfo.css";
import Footer from "./Footer-logo.svg";
import Success from "./Frame.svg";
import axios from "axios";
import FormData from "form-data";
import {
  Form,
  Input,
  Select,
  Button,
  Divider,
  Col,
  Row,
  Radio,
  DatePicker,
  Modal,
} from "antd";
import Camera from "./Camera_Vector.svg";

const { TabPane } = Tabs;

function Create() {
  const { Option } = Select;
  const [employeeForm] = Form.useForm();
  const [laptopForm] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [error, setError] = useState(false);
  const [teams, setTeams] = useState([]);
  const [positions, setPosition] = useState([]);
  const [currentTeam, setCurrentTeam] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [isModal, setIsModal] = useState(false);
  const [state, setState] = useState("/employeeInfo");
  let formData = new FormData();
  const navigate = useNavigate();
  const { Step } = Steps;

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

  const validateFullForm = async () => {
    try {
      formData.append("laptop_image", selectedFile);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      const laptopData = await laptopForm
        .validateFields()
        .catch(setError(true));
      const employeeData = await employeeForm.validateFields();

      var values = {
        ...employeeData,
        ...laptopData,
        laptop_image: [...formData][0][1],
        phone_number: `+995${employeeData.phone_number}`,
        token: `f39fea4fddada8a3a344125f8f9b6907`,
      };

      await axios.post(
        "https://pcfy.redberryinternship.ge/api/laptop/create",
        values,
        config
      );
    } catch (err) {
      console.log("laptop cannot be added ", err);
    }
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);

      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brands = await axios.get(
          "https://pcfy.redberryinternship.ge/api/brands"
        );

        const cpus = await axios.get(
          "https://pcfy.redberryinternship.ge/api/cpus"
        );
        const teams = await axios.get(
          "https://pcfy.redberryinternship.ge/api/teams"
        );
        const positions = await axios.get(
          "https://pcfy.redberryinternship.ge/api/positions"
        );

        setTeams(teams.data.data);
        setPosition(positions.data.data);

        setBrands(brands.data.data);
        setCpus(cpus.data.data);
      } catch (err) {
        console.error("data cannot be loaded", err);
      }
    };

    fetchData();
  }, []);

  const validateEmployeeForm = async () => {
    try {
      await employeeForm.validateFields();
      navigate("/laptopSpecs");
    } catch (err) {
      console.log("validation error", err);
    }
  };

  const changeTab = async (activeKey) => {
    if (window.location.pathname === "/employeeInfo") {
      try {
        await employeeForm.validateFields();
        navigate("/laptopSpecs");
        setState("/laptopSpecs");
      } catch (err) {
        if (activeKey === 1) {
          notification.error({
            message: "შეცდომა",
            description: "გთხოვთ შეამოწმეთ თანაშმრომლის ინფოს ტაბი",
          });
        }
      }
    } else if (window.location.pathname === "/laptopSpecs") {
      navigate("/employeeInfo");
      setState("/employeeInfo");
    }
  };

  return (
    <>
      <div className="outter-container">
        <div className="head-inner-container">
          <img
            src={isMobile ? arrow : Arrow}
            className="back-arrow-image"
            alt="arrow"
          />
        </div>

        <Tabs activeKey={state} onChange={() => changeTab()}>
          <Tabs.TabPane tab="თანამშრომლის ინფო" key="/employeeInfo">
            <div className="parent-container">
              <div className="main-container-container">
                <div className="main-employee-container">
                  <Form layout={"vertical"} form={employeeForm}>
                    <div className="fullName-container">
                      <Form.Item
                        name={"name"}
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
                        name={"surname"}
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
                      name="team_id"
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
                      name="position_id"
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
                      name={"email"}
                      rules={[
                        {
                          message: "ველის შევსება სავალდებულოა",
                          required: true,
                        },
                        {
                          message: "მეილი უნდა მთავრდებოდეს @redberry.ge-ით",
                          pattern: ".+@redberry.ge",
                        },
                        {
                          message: "გთხოვთ გამოიყენეთ ინგლისური სიმბოლოები",
                          pattern: /^[a-zA-Z0-9!@#$%^&*()_+.=]*$/,
                        },
                      ]}
                    >
                      <Input className="custom-input" />
                    </Form.Item>
                    <Form.Item
                      name={"phone_number"}
                      label={"ტელეფონის ნომერი"}
                      rules={[
                        {
                          message: "ველის შევსება სავალდებულოა",
                          required: true,
                        },
                        { message: "შეიყვანეთ 9 სიმბოლო", min: 9, max: 9 },
                        {
                          message: "ტელეფონის ნომერი უნდა იწყებოდეს 5 ით",
                          pattern: "^[5]*",
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
                    <Button
                      className="next-button"
                      onClick={() => {
                        changeTab();
                      }}
                    >
                      შემდეგი
                    </Button>
                  </div>
                </div>
              </div>

              <div className="footer-logo-container">
                <img src={Footer} alt="footer-redberry-icon" />
              </div>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="ლეპტოპის მახასიათებლები" key="/laptopSpecs">
            <div className="parent-container">
              <div className="main-container-container">
                <div className="main-employee-container">
                  <Form layout={"vertical"} form={laptopForm}>
                    <Form.Item
                      name={"laptop_image"}
                      label={"ლეპტოპის სახელი"}
                      rules={[
                        {
                          message: "ველის შევსება სავალდებულოა",
                          required: true,
                        },
                      ]}
                    >
                      <div
                        className={
                          error ? "image-uploader-error" : "image-uploader"
                        }
                      >
                        <label
                          htmlFor="file-input"
                          className="camera-container"
                        >
                          <img
                            src={selectedFile ? preview : Camera}
                            alt="camera"
                            style={{
                              width: selectedFile ? "100%" : "45px",
                              height: selectedFile ? "100%" : "45px",
                              borderRadius: selectedFile ? "8px" : "0",
                            }}
                          />

                          {!selectedFile && (
                            <span className="hint-container">
                              ლეპტოპის ფოტოს ატვირთვა
                            </span>
                          )}
                        </label>
                        <Input
                          type="file"
                          id="file-input"
                          style={{ display: "none" }}
                          accept={".jpg, .jpeg, .png"}
                          onChange={onSelectFile}
                        />
                      </div>
                    </Form.Item>
                    <Row className="row">
                      <Form.Item
                        name={"laptop_name"}
                        label={"ლეპტოპის სახელი"}
                        rules={[
                          {
                            message: "ველის შევსება სავალდებულოა",
                            required: true,
                          },
                          {
                            message: "გთხოვთ გამოიყენოთ ინგლისური ასოები",
                            pattern: /^[a-zA-Z0-9!@#$%^&*()_+=]*$/,
                          },
                        ]}
                      >
                        <Input className="custom-input laptop-name" />
                      </Form.Item>

                      <Form.Item
                        name="laptop_brand_id"
                        rules={[
                          {
                            message: "ველის შევსება სავალდებულოა",
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          className="custom-select brand"
                          bordered={false}
                          placeholder="ლეპტოპის ბრენდი"
                          rules={[
                            {
                              message: "ველის შევსება სავალდებულოა",
                              required: true,
                            },
                          ]}
                        >
                          {brands.map((brand) => (
                            <Option value={brand.id} key={brand.id}>
                              {brand.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Row>

                    <div className="divider-container">
                      <Divider
                        style={{
                          color: "#C7C7C7",
                          borderColor: "#C7C7C7",
                          marginTop: "40px",
                          marginBottom: "40px",
                        }}
                      />
                    </div>

                    <Row className="row">
                      <Form.Item
                        name="laptop_cpu"
                        rules={[
                          {
                            message: "ველის შევსება სავალდებულოა",
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          className="custom-select cpu"
                          bordered={false}
                          placeholder="CPU"
                        >
                          {cpus.map((cpu) => (
                            <Option value={cpu.name} key={cpu.id}>
                              {cpu.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="laptop_cpu_cores" label={"CPU-ს ბირთვი"}>
                        <Input
                          type={"number"}
                          min={0}
                          className="custom-input cpu"
                        />
                      </Form.Item>
                      <Form.Item
                        name="laptop_cpu_threads"
                        label={"CPU-ს ნაკადი"}
                      >
                        <Input
                          type={"number"}
                          min={0}
                          className="custom-input cpu"
                        />
                      </Form.Item>
                    </Row>

                    <Row className="row flexTop">
                      <Form.Item name="laptop_ram" label={"ლეპტოპის RAM (GB)"}>
                        <Input
                          type={"number"}
                          min={0}
                          className="custom-input ram"
                        />
                      </Form.Item>
                      <Form.Item
                        name="laptop_hard_drive_type"
                        label={"მეხსიერების ტიპი"}
                        rules={[
                          {
                            required: true,
                            message: "ველი სავალდებულოა",
                          },
                        ]}
                      >
                        <Radio.Group style={{ width: 200 }}>
                          <Row gutter={60}>
                            <Col span={12}>
                              <Radio style={{ fontWeight: 400 }} value={"SSD"}>
                                SSD
                              </Radio>
                            </Col>
                            <Col span={12}>
                              <Radio style={{ fontWeight: 400 }} value={"HDD"}>
                                HDD
                              </Radio>
                            </Col>
                          </Row>
                        </Radio.Group>
                      </Form.Item>

                      <div></div>
                    </Row>

                    <div className="divider-container">
                      <Divider
                        style={{
                          color: "#C7C7C7",
                          borderColor: "#C7C7C7",
                          marginTop: "40px",
                          marginBottom: "40px",
                        }}
                      />
                    </div>

                    <Row className="row">
                      <Form.Item
                        name="laptop_purchase_date"
                        label={"შეძენის რიცხვი (არჩევითი)"}
                      >
                        <DatePicker
                          className="custom-input date"
                          placeholder="დდ / თთ / წწ"
                          format={"DD/MM/YYYY"}
                        />
                      </Form.Item>
                      <Form.Item
                        name="laptop_price"
                        label={"ლეპტოპის ფასი"}
                        rules={[
                          {
                            required: true,
                            message: "მდგომარეობის არჩევა სავალდებულოა",
                          },
                        ]}
                      >
                        <Input
                          type={"number"}
                          className="custom-input price"
                          min={0}
                          suffix={"₾"}
                        />
                      </Form.Item>
                    </Row>

                    <Form.Item
                      name="laptop_state"
                      label={"მდგომარეობა"}
                      rules={[
                        {
                          required: true,
                          message: "მდგომარეობის არჩევა სავალდებულოა",
                        },
                      ]}
                    >
                      <Radio.Group style={{ minWidth: 200 }}>
                        <Row gutter={60}>
                          <Col span={12}>
                            <Radio style={{ fontWeight: 400 }} value={"new"}>
                              ახალი
                            </Radio>
                          </Col>
                          <Col span={12}>
                            <Radio style={{ fontWeight: 400 }} value={"used"}>
                              მეორადი
                            </Radio>
                          </Col>
                        </Row>
                      </Radio.Group>
                    </Form.Item>
                  </Form>

                  <div className="footer-buttons-container">
                    <Button
                      className="back-button"
                      onClick={() => window.history.back()}
                    >
                      უკან
                    </Button>
                    <Button
                      className="next-button"
                      onClick={() => validateFullForm()}
                    >
                      შემდეგი
                    </Button>
                  </div>
                </div>
              </div>
              <div className="footer-logo-container">
                <img src={Footer} alt="footer-redberry-icon" />
              </div>
            </div>{" "}
          </Tabs.TabPane>
        </Tabs>

        <div style={{ width: "53px" }}></div>
      </div>

      <div className="success-modal">
        <Modal visible={false} footer={false} header={false} closable={false}>
          <img src={Success} alt="success" />

          <p className="modal-title">ჩანაწერი დამატებულია!</p>
          <div className="modal-button-container">
            <Button
              className="main-button modal-button"
              onClick={() => navigate("/list")}
            >
              სიაში გადაყვანა
            </Button>
          </div>
          <div className="transparent-button-container">
            <Button
              className="transparent-button"
              onClick={() => navigate("/")}
            >
              მთავარი
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Create;
