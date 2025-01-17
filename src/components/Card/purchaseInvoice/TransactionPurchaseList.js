import { Button, Card, Col, Dropdown, Menu, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TransactionPurchaseList = ({ list }) => {
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
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    //TODO : add Debit and credit column
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit.name,
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit.name,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Type ",
      dataIndex: "type",
      key: "type",
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

  return (
    <Row>
      <Col span={24} className="mt-2">
        <Card
          className="header-solid h-full"
          bordered={false}
          title={[
            <h6 className="font-semibold m-0 text-center">
              Transaction Information
            </h6>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          {list && (
            <div style={{ marginBottom: "30px" }}>
              <Dropdown
                overlay={
                  <Menu
                    onClick={colVisibilityClickHandler}
                    items={columnsToShow}
                  />
                }
                placement="bottomLeft"
              >
            <Button className="border border-[#D0D5DD] text-black flex items-center justify-center gap-x-2 font-medium hover:text-black hover:font-semibold transition-all duration-150 delay-100 ease-in-out" >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Column Visibility</Button>
              </Dropdown>
            </div>
          )}
          <div className="col-info">
            <Table
              scroll={{ x: true }}
              loading={!list}
              columns={columns}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionPurchaseList;
