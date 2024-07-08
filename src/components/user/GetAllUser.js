import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./user.css";

import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import GetTotalCustomers from "../../api/getTotalCustomers";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";

function CustomTable({ list }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("true");
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
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
        <Link to={`/hr/staffs/${id}/`}>
          <button className="btn btn-dark btn-sm"> View</button>
        </Link>
      ),
    },
  ];

  //make a onChange function
  const onChange = (value) => {
    setStatus(value);
    dispatch(loadAllStaff({ status: value }));
  };

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
    <div>
      <div className="d-flex my-2">
        <div className="w-50">
          <h4 className="uppercase font-semibold">Staff List</h4>
        </div>
        {list && (
          <div className="text-center d-flex justify-content-end w-50">
            <div className="me-2">
              <CSVLink
                data={list}
                className="  bg-[#FE4F00] border-none text-center mx-auto justify-center flex items-center gap-x-2 hover:bg-none capitalize text-white  px-[14px] rounded-sm py-[5px] text-sm mb-1"
                style={{ marginTop: "5px" }}
                filename="staffs"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
                Download CSV
              </CSVLink>
            </div>

            <div>
              <Segmented
                className="text-center rounded danger"
                size="middle"
                options={[
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-lines-fill"></i> Active
                      </span>
                    ),
                    value: "true",
                  },
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-dash-fill"></i> Inactive
                      </span>
                    ),
                    value: "false",
                  },
                ]}
                value={status}
                onChange={onChange}
              />
            </div>
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
        pagination={{
          defaultPageSize: 20,
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllCust = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.users.list);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(loadAllStaff({ status: "true" }));
  }, []);

  useEffect(() => {
    GetTotalCustomers().then((res) => setTotal(res));
  }, [list]);

  // useEffect(() => {
  //   deleteHandler(list, deletedId);
  // }, [deletedId, list]);

  return (
    <div className="card card-custom">
      <div className="card-body">
        <CustomTable list={list} total={total} />
      </div>
    </div>
  );
};

export default GetAllCust;
