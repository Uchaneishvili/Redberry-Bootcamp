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
import React, { useState, useEffect } from "react";
import "./LaptopSpecs.css";
import Footer from "./Footer-logo.svg";
import { useNavigate } from "react-router-dom";
import Camera from "./Camera_Vector.svg";
import Header from "../Header/Header";
import arrow from "./Vector.svg";
function LaptopSpecs() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [error, setError] = useState(false);
  const validate = async () => {
    try {
      await form.validateFields();
      navigate("/laptopSpecs");
    } catch (err) {
      setError(true);
      console.log(err);
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

  return (
    <>
      <div className="parent-container">
        <div className="tab-container">
          <div className="arrow-vector-container">
            <img src={arrow} alt="back" onClick={() => window.history.back()} />
          </div>
          <div className="tab-title">
            <h5 className="bold-title">ლეპტოპის ინფო</h5>
            <p className="page">2/2</p>
          </div>
          <div />
        </div>

        <div className="web-header">
          <Header />
        </div>
        <div className="main-container-container">
          <div className="main-employee-container">
            <Form layout={"vertical"} form={form}>
              <Form.Item
                name={"image"}
                label={"ლეპტოპის სახელი"}
                rules={[
                  {
                    message: "ველის შევსება სავალდებულოა",
                    required: true,
                  },
                ]}
              >
                <div
                  className={error ? "image-uploader-error" : "image-uploader"}
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
              {/* <div className="fields-in-a-row-container"> */}
              <Row className="row">
                <Form.Item
                  name={"laptopName"}
                  label={"ლეპტოპის სახელი"}
                  rules={[
                    {
                      message: "ველის შევსება სავალდებულოა",
                      required: true,
                    },
                  ]}
                >
                  <Input className="custom-input fields-in-a-row-child" />
                </Form.Item>

                <Form.Item
                  name="laptopBrand"
                  rules={[
                    {
                      message: "ველის შევსება სავალდებულოა",
                      required: true,
                    },
                  ]}
                >
                  <Select
                    className="custom-select fields-in-a-row-child"
                    bordered={false}
                    placeholder="ლეპტოპის ბრენდი"
                    rules={[
                      {
                        message: "ველის შევსება სავალდებულოა",
                        required: true,
                      },
                    ]}
                  >
                    <Option value={1}>დეველოპმენტი</Option>
                    <Option value={2}>HR</Option>
                    <Option value={3}>გაყიდვები</Option>
                    <Option value={4}>დიზაინი</Option>
                    <Option value={5}>მარკეტინგი</Option>
                  </Select>
                </Form.Item>
              </Row>

              {/* </div> */}
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
                  name="cpu"
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
                    <Option value={1}>დეველოპმენტი</Option>
                    <Option value={2}>HR</Option>
                    <Option value={3}>გაყიდვები</Option>
                    <Option value={4}>დიზაინი</Option>
                    <Option value={5}>მარკეტინგი</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="cpu-core" label={"CPU-ს ბირთვი"}>
                  <Input type={"number"} min={0} className="custom-input cpu" />
                </Form.Item>
                <Form.Item name="cpu-thread" label={"CPU-ს ნაკადი"}>
                  <Input type={"number"} min={0} className="custom-input cpu" />
                </Form.Item>
              </Row>

              <Row className="row flexTop">
                <Form.Item name="ram" label={"ლეპტოპის RAM (GB)"}>
                  <Input
                    type={"number"}
                    min={0}
                    className="custom-input fields-in-a-row-child"
                  />
                </Form.Item>
                <Form.Item
                  name="storage-type"
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
                        <Radio style={{ fontWeight: 400 }} value={0}>
                          SSD
                        </Radio>
                      </Col>
                      <Col span={12}>
                        <Radio style={{ fontWeight: 400 }} value={1}>
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
                <Form.Item name="date" label={"შეძენის რიცხვი (არჩევითი)"}>
                  <DatePicker
                    className="custom-input date"
                    placeholder="დდ / თთ / წწ"
                    format={"DD/MM/YYYY"}
                  />
                </Form.Item>
                <Form.Item
                  name="price"
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
                name="condition"
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
                      <Radio style={{ fontWeight: 400 }} value={0}>
                        ახალი
                      </Radio>
                    </Col>
                    <Col span={12}>
                      <Radio style={{ fontWeight: 400 }} value={1}>
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

export default LaptopSpecs;
