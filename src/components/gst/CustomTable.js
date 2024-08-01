import { Button, Dropdown, Menu, Table, Switch } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function CustomTable({addedDiscount}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/gst/active');
        const rawData = response.data;

        // Ensure rawData is an array
        if (Array.isArray(rawData)) {
          setList(rawData);
        } else {
          // If rawData is an object, convert it to an array
          setList([rawData]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [addedDiscount]);

  const handleStatusChange = async (checked, record) => {
    try {
      await axios.put(`/gst/${record.id}`, {
        name: record.name,
        percentage: record.percentage,
        status: checked
      });
      // Update the local state to reflect the change
      setList((prevList) =>
        prevList.map((item) =>
          item.id === record.id ? { ...item, status: checked } : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
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
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={list}
      loading={loading}
    />
  );
}

export default CustomTable;