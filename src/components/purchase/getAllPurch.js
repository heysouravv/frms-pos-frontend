import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Navigate } from "react-router-dom";
import "./purchase.css";

import { Button, DatePicker, Dropdown, Menu, Segmented, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPurchase } from "../../redux/actions/purchase/getPurchaseAction";
import DashboardCard from "../Card/DashboardCard";
import PageTitle from "../page-header/PageHeader";

//Date fucntinalities
let startdate = moment(new Date()).format("YYYY-MM-DD");
let enddate = moment(new Date()).add(1, "day").format("YYYY-MM-DD");

function CustomTable({ list, total, status, setStatus }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const dispatch = useDispatch();
  const onChange = (value) => {
    setStatus(value);
    dispatch(
      loadAllPurchase({
        status: value,
        page: 1,
        limit: 10,
        startdate,
        enddate,
      })
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (name, { id }) => <Link to={`/purchase/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "Supplier Name ",
      dataIndex: `supplier`,
      key: "supplier_id",
      render: (supplier) => supplier?.name,
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Due Amount",
      dataIndex: "due_amount",
      key: "due_amount",
    },
    {
      title: "Paid Amount",
      dataIndex: "paid_amount",
      key: "paid_amount",
    },

    //Update Supplier Name here

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Link to={`/payment/supplier/${id}`}>
          <button className="btn btn-dark btn-sm"> Payment</button>
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

  const CSVlist = list?.map((i) => ({
    ...i,
    supplier: i?.supplier?.name,
  }));

  return (
    <div>
      <h5 className="font-semibold uppercase">PURCHASE HISTORY</h5>
      {list && (
        <div className="text-center my-2 d-flex justify-content-end">
          <div className="me-2" style={{ marginTop: "4px" }}>
            <CSVLink
              data={CSVlist}
              className=" bg-[#FE4F00] border-none text-center mx-auto justify-center flex items-center gap-x-2 hover:bg-none capitalize text-white  px-[14px] rounded-sm py-[5px] text-sm mb-1"
              filename="purchase"
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
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50, 100, 200],
          showSizeChanger: true,
          total: total ? total : 0,

          onChange: (page, limit) => {
            dispatch(
              loadAllPurchase({ status, page, limit, startdate, enddate })
            );
          },
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllPurch = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.purchases.list);
  const total = useSelector((state) => state.purchases.total);
  const [status, setStatus] = useState("true");

  // const [total, setTotal] = useState(0);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(
      loadAllPurchase({
        status: true,
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate,
      })
    );
  }, []);

  //Have to IMPLEMENT TOTAL Purchase info
  // useEffect(() => {
  //   // GetTotalPurchase().then((res) => setTotal(res));
  // }, [list]);

  const onCalendarChange = (dates) => {
    startdate = (dates?.[0]).format("YYYY-MM-DD");
    enddate = (dates?.[1]).format("YYYY-MM-DD");
    dispatch(
      loadAllPurchase({
        status: status,
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate,
      })
    );
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <>
      <PageTitle title={"Back"} />
      <div className="card card-custom mt-1 ">
        <div className="card-body">
          <div className="card-title d-sm-flex justify-content-between">
            <h5 className="d-inline-flex font-semibold">Purchase Invoice List</h5>
            <div>
              <RangePicker
                onCalendarChange={onCalendarChange}
                defaultValue={[moment(startdate), moment(enddate)]}
                className="range-picker"
              />
            </div>
          </div>
          <DashboardCard information={total?._sum} count={total?._count} />
          <br />

          <CustomTable
            list={list}
            total={total?._count?.id}
            startdate={startdate}
            enddate={enddate}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </div>
    </>
  );
};

export default GetAllPurch;
