import { Button, DatePicker, Dropdown, Menu, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllTransaction } from "../../redux/actions/transaction/getTransactionAction";
import "./transaction.css";

//Date fucntinalities
let startdate = moment(new Date()).format("YYYY-MM-DD");
let enddate = moment(new Date()).add(1, "day").format("YYYY-MM-DD");

function CustomTable({ list, total }) {
  const dispatch = useDispatch();
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/transaction/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },

    {
      title: "Debit Account",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
    },

    {
      title: "Credit Account",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
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
    debit: i?.debit?.name,
    credit: i?.credit?.name,
  }));

  return (
    <div>
      <div className="text-end">
     
      </div>
      {list && (
        <div className="w-full flex items-center flex-row-reverse justify-between ">
          <div className="">
            <CSVLink
              data={CSVlist}
              className=" bg-[#FE4F00] border-none  justify-center flex items-center gap-x-2 hover:bg-none capitalize text-white  px-[14px] rounded-sm py-[5px] text-sm mb-1"
              filename="transaction"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
              Download CSV
            </CSVLink>
          </div>
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
            dispatch(loadAllTransaction({ page, limit, startdate, enddate }));
          },
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllTransaction = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.transactions.list);

  const total = useSelector((state) => state.transactions.total);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(loadAllTransaction({ page: 1, limit: 10, startdate, enddate }));
  }, []);

  const onCalendarChange = (dates) => {
    startdate = (dates?.[0]).format("YYYY-MM-DD");
    enddate = (dates?.[1]).format("YYYY-MM-DD");
    dispatch(
      loadAllTransaction({
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate,
      })
    );
  };

  return (
    <div className="card card-custom">
      <div className="card-body">
        <div className="card-title d-sm-flex justify-content-between">
          <h5 className="font-semibold">
Transaction History
          </h5>
          <div>
            <RangePicker
			className="range-picker"
              onCalendarChange={onCalendarChange}
              defaultValue={[moment(startdate), moment(enddate)]}
            />
          </div>
        </div>
        <CustomTable
          list={list}
          total={total?._count?.id}
          startdate={startdate}
          enddate={enddate}
        />
      </div>
    </div>
  );
};

export default GetAllTransaction;
