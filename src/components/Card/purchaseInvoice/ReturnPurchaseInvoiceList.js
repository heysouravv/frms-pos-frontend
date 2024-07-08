import { Button, Card, Col, Dropdown, Menu, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReturnPurchaseInvoiceProductList from "../../popUp/returnPurchaseProductList";

const ReturnPurchaseInvoiceList = ({ list }) => {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "View Details",
      dataIndex: "returnPurchaseInvoiceProduct",
      key: "returnPurchaseInvoiceProduct",
      render: (returnPurchaseInvoiceProduct) => (
        <ReturnPurchaseInvoiceProductList list={returnPurchaseInvoiceProduct} />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },

    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
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
              Return Purchase Information
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
                    items={columnItems}
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
              columns={columnsToShow}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ReturnPurchaseInvoiceList;
