import {
	CheckOutlined,
	CodeSandboxOutlined,
	FileDoneOutlined,
	FileOutlined,
	FileSyncOutlined,
	FlagOutlined,
	HomeOutlined,
	MinusSquareOutlined,
	ShoppingCartOutlined,
	SettingOutlined,
	ShoppingOutlined,
	UnorderedListOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	UserSwitchOutlined,
	WalletOutlined,
	LogoutOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import  "./Sidenav.module.css";

const Sidenav = ({ color, sideNavOpenKeys }) => {
	const menu = [
		{
			label: (
				<NavLink to='/dashboard'  className="outline-none border-transparent">
					<span>Dashboard</span>
				</NavLink>
			),
			key: "dashboard",
			icon: <HomeOutlined />,
		},
		{
			label: (
				<NavLink to='/pos'>
					<span>POS</span>
				</NavLink>
			),
			key: "pos",
			icon: <ShoppingCartOutlined />,
		},
		{
			label: "Product",
			key: "product",
			icon: <CodeSandboxOutlined />,
			children: [
				{
					label: (
						<NavLink to='/product'>
							<span>Products</span>
						</NavLink>
					),
					key: "products",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/product-category'>
							<span>Product Category</span>
						</NavLink>
					),
					key: "productCategory",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/product-subcategory'>
							<span>Product Subcategory</span>
						</NavLink>
					),
					key: "productSubcategory",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/product-brand'>
							<span>Product Brand</span>
						</NavLink>
					),
					key: "productBrand",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "Purchase",
			key: "purchase",
			icon: <ShoppingOutlined />,
			children: [
				{
					label: (
						<NavLink to='/supplier'>
							<span>Suppliers</span>
						</NavLink>
					),
					key: "suppliers",
					icon: <UserOutlined />,
				},
				{
					label: (
						<NavLink to='/purchase'>
							<span>New Purchase</span>
						</NavLink>
					),
					key: "newPurchase",
					icon: <CheckOutlined />,
				},
				{
					label: (
						<NavLink to='/purchaselist'>
							<span>Purchase List</span>
						</NavLink>
					),
					key: "purchaseList",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "Sale",
			key: "sale",
			icon: <MinusSquareOutlined />,
			children: [
				{
					label: (
						<NavLink to='/customer'>
							<span>Customers</span>
						</NavLink>
					),
					key: "customers",
					icon: <UserOutlined />,
				},
				{
					label: (
						<NavLink to='/salelist'>
							<span>Sale List</span>
						</NavLink>
					),
					key: "saleList",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "Accounts",
			key: "accounts",
			icon: <WalletOutlined />,
			children: [
				{
					label: (
						<NavLink to='/account/'>
							<span>Account</span>
						</NavLink>
					),
					key: "accountList",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/transaction/create'>
							<span>New Transaction</span>
						</NavLink>
					),
					key: "newTransaction",
					icon: <CheckOutlined />,
				},
				{
					label: (
						<NavLink to='/transaction/'>
							<span>Transaction List</span>
						</NavLink>
					),
					key: "transactionList",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "Report",
			key: "report",
			icon: <FlagOutlined />,
			children: [
				{
					label: (
						<NavLink to='/account/trial-balance'>
							<span>Trial Balance</span>
						</NavLink>
					),
					key: "trialBalance",
					icon: <FileDoneOutlined />,
				},
				{
					label: (
						<NavLink to='/account/balance-sheet'>
							<span>Balance Sheet</span>
						</NavLink>
					),
					key: "balanceSheet",
					icon: <FileOutlined />,
				},
				{
					label: (
						<NavLink to='/account/income'>
							<span>Income Statement</span>
						</NavLink>
					),
					key: "incomeStatement",
					icon: <FileSyncOutlined />,
				},
			],
		},

		{
			label: "Human Resource",
			key: "hr",
			icon: <UserOutlined />,
			children: [
				{
					label: (
						<NavLink to='/hr/staffs'>
							<span>Staffs</span>
						</NavLink>
					),
					key: "staffs",
					icon: <UsergroupAddOutlined />,
				},
				{
					label: (
						<NavLink to='/role'>
							<span>Role & Permissions</span>
						</NavLink>
					),
					key: "roleAndPermissions",
					icon: <UserSwitchOutlined />,
				},
				{
					label: (
						<NavLink to='/designation/'>
							<span>Designation</span>
						</NavLink>
					),
					key: "designation",
					icon: <UserSwitchOutlined />,
				},
			],
		},

	
	];

const settings = [
	{
		label: "Settings",
		key: "settings",
		icon: <SettingOutlined className="hover:bg-[#FE4F00]" />,
		children: [
			{
				label: (
					<NavLink to='/invoice-setting'>
						<span>Invoice Settings</span>
					</NavLink>
				),
				key: "invoiceSetting",
				icon: <SettingOutlined />,
			},
		],
	},
	{
		label: "Logout",
		key: "logout",
		icon: <LogoutOutlined />,
	}
]
const [selectedKey, setSelectedKey] = useState(null);

const handleMenuClick = (e) => {
	setSelectedKey(e.key);
};

// Function to recursively apply styles to menu items
const applyStylesToMenuItems = (items) => {
	return items.map(item => {
		const isSelected = item.key === selectedKey;
		const newItem = {
			...item,
			style: isSelected ?  { backgroundColor: '#FFF1EB', color: '#FE4F00', borderRight: '2px solid transparent' } : {color: '#000'},
		};
		if (item.children) {
			newItem.children = applyStylesToMenuItems(item.children);
		}
		return newItem;
	});
};

// Apply styles to both menu and settings items
const menuWithStyles = applyStylesToMenuItems(menu);
const settingsWithStyles = applyStylesToMenuItems(settings);



	return (
		<div className="flex-col justify-between no-scrollbar overflow-scroll flex  h-[90vh]">

			<Menu
				theme='white'
				mode='inline'
				items={menuWithStyles}

            className={`sidenav-menu overflow-scroll no-scrollbar border-transparent outline-none`}
			style={{outline: 'none',border: 'transparent'}}
            onClick={handleMenuClick}
				// openKeys={[sideNavOpenKeys]}
				// style={{ backgroundColor: "transparent" }}
			/>
			<Menu
				theme='white'
				mode='inline'
				items={settingsWithStyles}
				onClick={handleMenuClick}
				className='sidenav-menu hover:text-[#FE4F00] no-scrollbar border-t border-[#EAECF0] border-r-0 overflow-hidden'
				// openKeys={[sideNavOpenKeys]}
				// style={{ backgroundColor: "transparent" }}
			/>
		</div>
	);
};

export default Sidenav;
