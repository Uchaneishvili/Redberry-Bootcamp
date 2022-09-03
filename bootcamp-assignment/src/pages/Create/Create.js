import Arrow from "./web-arrow.svg";
import { notification } from "antd";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import arrow from "./Vector.svg";
import "./Create.css";
import "../Header/Header.css";
import "../LaptopSpecs/LaptopSpecs.css";
import "../EmployeeInfo/EmployeeInfo.css";
import Footer from "./Footer-logo.svg";
import axios from "axios";
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
  const [isActiveTab, setIsActiveTab] = useState(0);

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
      const employeeData = await employeeForm.validateFields();
      const laptopData = await laptopForm.validateFields();

      const value = {
        ...employeeData,
        ...laptopData,
        phone_number: `+995${employeeData.phone_number}`,
        token: `f39fea4fddada8a3a344125f8f9b6907`,
      };

      await axios.post(
        "https://pcfy.redberryinternship.ge/api/laptop/create",
        value
      );
    } catch (err) {
      console.log("laptop cannot be added ", err);
      setError(true);
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
      await employeeForm.validateFields().then(() => setIsActiveTab(1));
    } catch (err) {
      console.log("validation error", err);
    }
  };

  const changeTab = async (activeKey) => {
    try {
      await employeeForm.validateFields();
    } catch (err) {
      if (activeKey === 1) {
        notification.error({
          message: "შეცდომა",
          description: "გთხოვთ შეამოწმეთ თანაშმრომლის ინფოს ტაბი",
        });
      }
    }

    setIsActiveTab(activeKey);
  };

  return (
    <div className="outter-container">
      <div className="head-inner-container">
        <img src={Arrow} className="back-arrow-image" alt="arrow" />
      </div>

      <div className="tab-container">
        <div className="arrow-vector-container">
          <img
            src={arrow}
            alt="back"
            onClick={
              isActiveTab === 0
                ? () => window.history.back()
                : setIsActiveTab(0)
            }
          />
        </div>
        <div className="tab-title">
          <h5 className="bold-title">
            {isActiveTab === 0 ? "თანამშრომლის ინფო" : "ლეპტოპის ინფო"}
          </h5>
          <p className="page">{isActiveTab === 0 ? "1/2" : "2/2"}</p>
        </div>
        <div />
      </div>
      <Tabs
        type="line"
        centered
        defaultActiveKey={0}
        onChange={async (e) => {
          changeTab(e);
        }}
      >
        <TabPane tab="თანამშრომლის ინფო" key={0}>
          <div className="parent-container">
            <div className="main-container-container">
              {isActiveTab === 1 && isMobile ? (
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
                      onClick={() => setIsActiveTab(0)}
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
              ) : (
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
                    <Button
                      className="next-button"
                      onClick={() => validateEmployeeForm()}
                    >
                      შემდეგი
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="footer-logo-container">
              <img src={Footer} alt="footer-redberry-icon" />
            </div>
          </div>
        </TabPane>

        <TabPane tab="ლეპტოპის ინფო" key={1}>
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
                      <label htmlFor="file-input" className="camera-container">
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
                    <Form.Item name="laptop_cpu_threads" label={"CPU-ს ნაკადი"}>
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
                    onClick={() => setIsActiveTab(0)}
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
          </div>
        </TabPane>
      </Tabs>

      <div style={{ width: "53px" }}></div>
    </div>
  );
}

export default Create;
