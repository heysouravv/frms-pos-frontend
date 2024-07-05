import { Button, Card, Col,Image, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/user/loginUserAction";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";
import logo from '../../assets/Aciahea.svg'
//TODO : redirect to home

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;

  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    if (resp === "success") {
      setLoader(false);
      window.location.href = "/dashboard";
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
    toast.error("Error at login Please try again");
  };


  return (
    <>
      <Row className="card-row">
        <Col span={24}>
          <Card bordered={false} className={styles.card}>
          <div className="flex justify-center items-center w-full py-2">
          <Image src={logo} preview={false} alt="logo" width={80}  className="mx-auto" />
          </div>
            <Title level={3} className=" text-center">
            Welcome to ERP
            </Title>
            <Title level={4} className=" text-center">
            Welcome back! Please enter your details.
              </Title>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}

              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
              labelCol={
                {
                  span: 24,
                }
              }
              wrapperCol={{
                span: [8,24],
              }}
                className="mb-1"
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}

              >
                <Input />
              </Form.Item>


              <Form.Item
                className="mb-2 w-full"
                label="Password"
                labelCol={
                {
                  span: 24,
                }
              }
              wrapperCol={{
                span: [8,24],
              }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password className="w-full" />
              </Form.Item>


              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md text-white bg-[#FF7645] px-3 py-1 text-sm font-semibold leading-3 shadow-sm  hover:border-[#FF7645]  "
                >
                  {loader ? (
                    <div className="flex items-center justify-center gap-x-3">
                      <ClipLoader color="#fff" loading={loader} size={20} />
                      <p>Loading</p>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

              {/* <Form.Item className={styles.loginTableContainer}>
                <Row>
                  <Col span={24}>
                    <LoginTable />
                  </Col>
                </Row>
              </Form.Item> */}
            </Form>
          </Card>
        </Col>
      </Row>
   
    </>
  );
};

export default Login;
