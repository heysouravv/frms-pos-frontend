import {
  Button,
  Card,
  Col, Dropdown, Form,
  Input, Menu, Row,
  Table,
  Typography
} from "antd";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addRole, getRoles } from "./roleApis";
import {PlusOutlined} from "@ant-design/icons";
function CustomTable({ list }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Link to={`/role/${id}/`}>
          <button className="btn btn-dark btn-sm"> View</button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>,
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Card>
      <div className="text-center my-2 d-flex justify-content-between">
        <h5 className="role-list-title uppercase font-semibold">Role List</h5>
        {list && (
          <div>
            <CSVLink
              data={list}
              className="bg-[#FE4F00] flex justify-center items-center gap-x-2 text-white px-[14px] py-[12px] rounded-md font-semibold hover:bg-[#FE4F00] transition-all duration-150 delay-100 ease-in-out"
              filename="roles"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
              Download CSV
            </CSVLink>
          </div>
        )}
      </div>

      {list && (
        <div style={{ marginBottom: "30px" }}>
          <Dropdown
            overlay={
              <Menu onClick={colVisibilityClickHandler} items={columnItems} />
            }
            placement="bottomLeft"
          >
        <Button className="border border-[#D0D5DD] text-black flex items-center justify-center gap-x-2 font-medium hover:text-black hover:font-semibold transition-all duration-150 delay-100 ease-in-out" >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Column Visibility</Button>
          </Dropdown>
        </div>
      )}

      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
}

const Role = () => {
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getRoles()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addRole(values);

    if (resp.message === "success") {
      setLoader(false);
      const newList = [...list];
      newList.push(resp.data);
      setList(newList);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding role");
    setLoader(false);
  };
  return (
    <Fragment bordered={false} >
      <Row className="mr-top flex justify-center">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 text-center">
            Add New Role
          </Title>
          <Form
            style={{ marginBottom: "100px" }}
            eventKey="role-form"
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div>
              <Form.Item
                style={{ marginBottom: "20px" }}
                label="Name"
                name="name"
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
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 6,
                  span: 12,
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  type="primary"
                  size="small"
                  htmlType="submit"
                  className="bg-[#FE4F00] hover:bg-[#FE4F00] flex items-center justify-center border-none"
                  block
                  loading={loader}
                >
                <PlusOutlined/>
                  Add New Role
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
      <hr />
      <CustomTable list={list} />
    </Fragment>
  );
};

export default Role;
