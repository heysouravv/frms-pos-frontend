import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import styles from "./AddProdBrand.module.css";

import { Fragment } from "react";

import { useDispatch } from "react-redux";
import { addProductBrand } from "../../redux/actions/productBrand/addProductBrandAciton";
import UploadMany from "../Card/UploadMany";
import {PlusOutlined} from "@ant-design/icons";
const AddProductBrand = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      dispatch(addProductBrand(values));

      form.resetFields();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Row className="mr-top" justify="space-between" gutter={[0, 30]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          className="rounded column-design"
        >
          <Card bordered={false} className="criclebox h-full">
            <Title level={4} className="m-2 text-center">
              Add Product Brand
            </Title>
            <Form
              form={form}
              className=""
              name="basic"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input category Dname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addProdBrandBtnContainer}
              >
                <Button className="border-none border bg-[#FE4F00] justify-center mx-auto flex items-center gap-x-2 w-full hover:bg-none capitalize text-white  px-[14px] rounded-sm py-[5px] text-sm mb-1" type="primary" htmlType="submit" shape="round">
                 <PlusOutlined color="#fff" width={20} />
                  Add Brand
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className="rounded column-design">
          <Card bordered={false} className={styles.importCsvCard}>
            <Title level={4} className="m-2 text-center">
              Import From CSV
            </Title>
            <UploadMany urlPath={"brand"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddProductBrand;
