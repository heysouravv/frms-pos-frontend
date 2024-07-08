import { Button, Dropdown, Menu, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { deleteRolePermission } from "./roleApis";

const CustomTable = ({ role }) => {
  const [keys, setKeys] = useState([]);
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
      dataIndex: "permission",
      key: "permission",
      render: ({ name } = {}) => name,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => moment(updatedAt).format("DD/MM/YYYY"),
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setKeys(selectedRowKeys);
    },
  };
  const [loader, setLoader] = useState(false);

  const onDelete = async () => {
    setLoader(true);
    try {
      const data = await deleteRolePermission(keys);
      if (data.message === "success") {
        window.location.reload();
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  return (
    <div className="card-body mb-3 ">
      <div class="table-responsive">
        <h4 className="text-center mb-2"> Permissions</h4>

        {keys && keys.length > 0 && (
          <div className="text-start mb-1">
            <Button type="danger" onClick={onDelete} loading={loader}>
              Delete
            </Button>
          </div>
        )}
        {columns.length > 0 && (
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
          rowSelection={columnsToShow.length > 0 && rowSelection}
          columns={columnsToShow}
          dataSource={role}
          rowKey={(record) => record.id}
        />
        {/* <table class='table '>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'>#ID</th>
							<th scope='col'>Permission Name</th>
							<th scope='col'>Created AT</th>
							<th scope='col'>Updated AT</th>
						</tr>
					</thead>
					<tbody>
						{role &&
							role.map((i) => (
								<tr>
									<th scope='row'>{i.id}</th>
									<td>{i.permission.name}</td>
									<td>{moment(i.createdAt).format("YYYY-MM-DD")}</td>
									<td>{moment(i.updatedAt).format("YYYY-MM-DD")}</td>
								</tr>
							))}
					</tbody>
				</table> */}
      </div>
    </div>
  );
};

export default CustomTable;
