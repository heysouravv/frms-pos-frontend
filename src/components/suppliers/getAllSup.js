import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GetTotalSuppliers from "../../api/getTotalSuppliers";
import { loadSuppliers } from "../../redux/actions/supplier/getSuppliersAction";
import "./suppliers.css";

function CustomTable({ list, total, status }) {
  const dispatch = useDispatch();
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
      render: (name, { id }) => <Link to={`/supplier/${id}`}>{name}</Link>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    // {
    //   title: "Due Amount",
    //   dataIndex: "due_amount",
    //   key: "due_amount",
    //   responsive: ["md"],
    // },
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
    <div>
      <div>
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
      </div>
      <div>
        <Table
          scroll={{ x: true }}
          loading={!list}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,

            onChange: (page, limit) => {
              dispatch(loadSuppliers({ page, limit, status }));
            },
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}

const GetAllSup = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.suppliers.list);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(loadSuppliers({ status: "true", page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    GetTotalSuppliers().then((res) => setTotal(res));
  }, [list]);

  const [status, setStatus] = useState("true");
  const onChange = (value) => {
    setStatus(value);
    dispatch(loadSuppliers({ status: value, page: 1, limit: 10 }));
  };
  return (
    <div className="card column-design">
      <div className="card-body">
        <h5 className="uppercase font-semibold">
          Suppliers List
        </h5>
        {list && (
          <div className="card-title d-flex justify-content-end">
            <div className="me-2" style={{ marginTop: "4px" }}>
              <CSVLink
                data={list}
                className="bg-[#FE4F00] border-none text-center mx-auto justify-center flex items-center gap-x-2 hover:bg-none capitalize text-white  px-[14px] rounded-sm py-[5px] text-sm mb-1"
                filename="suppliers"
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
        <CustomTable list={list} total={total} status={status} />
      </div>
    </div>
  );
};

export default GetAllSup;
