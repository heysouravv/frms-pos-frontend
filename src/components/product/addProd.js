import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Row,
	Select,
	Typography,
	Upload,
} from "antd";
import { toast } from "react-toastify";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/product/addProductAction";
import { loadAllProductBrand } from "../../redux/actions/productBrand/getProductBrandAction";
import { loadAllProductCategory } from "../../redux/actions/productCategory/getProductCategoryAction";
import { loadAllProductSubCategory } from "../../redux/actions/productSubCategory/getProductSubCategory";
import UploadMany from "../Card/UploadMany";
import styles from "./AddProd.module.css";
import { CSVLink } from "react-csv";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";

const AddProd = () => {
	const unitType = ["kg", "ltr", "pc"];
	const category = useSelector((state) => state.productCategories?.list);

	const subCategory = useSelector((state) => state.productSubCategories?.list);

	const brand = useSelector((state) => state.productBrands?.list);

	const dispatch = useDispatch();
	//useEffect for loading category list from redux
	useEffect(() => {
		dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
		dispatch(loadAllProductSubCategory({ page: 1, limit: 100 }));
		dispatch(loadAllProductBrand({ page: 1, limit: 100 }));
	}, [dispatch]);

	const { Title } = Typography;
	const [fileList, setFileList] = useState([]);
	const [loader, setLoader] = useState(false);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			let formData = new FormData();
			formData.append("image", fileList[0].originFileObj);
			formData.append("name", values.name);
			formData.append("quantity", values.quantity);
			formData.append("volume", values.volume);
			formData.append("purchase_price", values.purchase_price);
			formData.append("sale_price", values.sale_price);
			formData.append(
				"product_sub_category_id",
				values.product_sub_category_id
			);
			formData.append("product_brand_id", values.product_brand_id);
			formData.append("sku", values.sku);
			formData.append("unit_type", values.unit_type);
			formData.append("reorder_quantity", values.reorder_quantity);
			formData.append("unit_measurement", values.unit_measurement);

			const resp = await dispatch(addProduct(formData));

			if (resp.message === "success") {
				form.resetFields();
				dispatch(loadProduct({ page: 1, limit: 10, status: true }));
				setFileList([]);
				setLoader(false);
			} else {
				setLoader(false);
			}
		} catch (error) {
			console.log(error.message);
			toast.error("error at creating");
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
		toast.error("Something went wrong !");
		console.log("Failed:", errorInfo);
	};

	const handelChange = ({ fileList }) => {
		setFileList(fileList);
	};

	const onClickLoading = () => {
		setLoader(true);
	};

	return (
		<Fragment>
			<Row className='mr-top' justify='space-between' gutter={[0, 30]}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='rounded column-design'>
					<Card bordered={false}>
						<Title level={4} className='m-2 text-center'>
							Add Product
						</Title>
						<Form
							form={form}
							name='basic'
							// className="flex justify-start items-start text-left w-full flex-col"
							labelCol={{
								span: 7,
							}}
							labelWrap
							wrapperCol={{
								span: 24,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item
								style={{ marginBottom: "15px" }}
								label='Name'
								name='name'
								className="whitespace-nowrap"
								rules={[
									{
										required: true,
										message: "Please input Product name!",
									},
								]}>
								<Input />
							</Form.Item>

							{/* <Form.Item
                style={{ marginBottom: "15px" }}
                name="product_category_id"
                label="Select Category "
                rules={[
                  {
                    required: true,
                    message: "Please select category!",
                  },
                ]}
              >
                <Select
                  name="product_category_id"
                  loading={!category}
                  showSearch
                  placeholder="Select Category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {category &&
                    category.map((cate) => (
                      <Select.Option key={cate.id} value={cate.id}>
                        {cate.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item> */}

							<Form.Item
								style={{ marginBottom: "15px",display:'flex',justifyContent:'start',alignItems:'start' }}
								name='product_sub_category_id'
								label='Select Subcategory '
								rules={[
									{
										required: true,
										message: "Please select sub-category!",
									},
								]}>
								<Select
									name='product_sub_category_id'
									loading={!subCategory}
									showSearch
									placeholder='Select Subcategory'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children.includes(input)
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(optionB.children.toLowerCase())
									}>
									{subCategory &&
										subCategory.map((subcat) => (
											<Select.Option key={subcat.id} value={subcat.id}>
												{subcat.name}
											</Select.Option>
										))}
								</Select>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								name='product_brand_id'
								label='Select Brand'
								rules={[
									{
										required: true,
										message: "Please select brand!",
									},
								]}>
								<Select
									name='product_brand_id'
									loading={!brand}
									showSearch
									placeholder='Select Brand'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children.includes(input)
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(optionB.children.toLowerCase())
									}>
									{brand &&
										brand.map((brandSingle) => (
											<Select.Option
												key={brandSingle.id}
												value={brandSingle.id}>
												{brandSingle.name}
											</Select.Option>
										))}
								</Select>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								name='unit_type'
								label='Select Unit Type '
								rules={[
									{
										required: true,
										message: "Please select unit type!",
									},
								]}>
								<Select
									name='unit_type'
									loading={!category}
									showSearch
									placeholder='Select Unit Type'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children.includes(input)
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(optionB.children.toLowerCase())
									}>
									{unitType &&
										unitType.map((unit) => (
											<Select.Option key={unit} value={unit}>
												{unit}
											</Select.Option>
										))}
								</Select>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								label='Unit Measurement'
								name='unit_measurement'
								rules={[
									{
										required: true,
										message: "Please input Unit Messurement!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								label='Quantity'
								name='quantity'
								rules={[
									{
										required: true,
										message: "Please input Quantity!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								label='Purchase Price'
								name='purchase_price'
								rules={[
									{
										required: true,
										message: "Please input Purchase Price!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								label='Sale Price'
								name='sale_price'
								rules={[
									{
										required: true,
										message: "Please input Sale Price!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								label='Reorder Quantity'
								name='reorder_quantity'
								rules={[
									{
										required: true,
										message: "Please input  Reorder Quantity!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item label='Upload Image' valuePropName='image'>
								<Upload
									listType='picture-card'
									beforeUpload={() => false}
									name='image'
									fileList={fileList}
									maxCount={1}
									onChange={handelChange}>
									<div>
										<PlusOutlined />
										<div
											style={{
												marginTop: 8,
											}}>
											Upload
										</div>
									</div>
								</Upload>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								label='SKU No'
								name='sku'
								rules={[
									{
										required: true,
										message: "Please input SKU!",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px",width:'100%',margin:'auto',display:'flex',justifyContent:'center' }}
								className={`add-product-btn ${styles.addProductBtnContainer}`}>
								<Button
									type='primary'
									htmlType='submit'
									shape='round'
									className="bg-[#FE4F00] flex hover:bg-[#FE4F00] items-center justify-center  border-none w-full "
									loading={loader}
									onClick={onClickLoading}>
								<PlusOutlined color="#fff" />
									Add Product
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={11} xl={11} className=' rounded'>
					<Card
						className={`${styles.importCsvCard} column-design`}
						extra={
							<>
								<div className=' py-1 bg-transparent  text-white  rounded-md'>
									<CSVLink
										data={[
											[
												"name",
												"sku",
												"description",
												"product_sub_category_id",
												"product_brand_id",
												"quantity",
												"purchase_price",
												"sale_price",
												"unit_type",
												"reorder_quantity",
												"unit_measurement",
											],
											[
												"product m",
												"as1dgq",
												"new product",
												1,
												1,
												200,
												1.5,
												3.18,
												"pc",
												10,
												10,
											],
											[
												"product n",
												"as1dgqn",
												"new product",
												1,
												1,
												200,
												1.5,
												3.18,
												"pc",
												10,
												10,
											],
											[
												"product o",
												"as1dgqo",
												"new product",
												1,
												1,
												200,
												1.5,
												3.18,
												"pc",
												10,
												10,
											],
										]}
										className=' font-medium  bg-[#FE4F00] p-[14px] flex items-center gap-x-2 hover:bg-none capitalize text-white  px-[14px] rounded-sm py-[5px] text-sm mb-1'
										filename={"sample product"}>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
										Download Sample CSV
									</CSVLink>
								</div>
							</>
						}>
						<Title level={4} className='m-2 text-center'>
							Import From CSV
						</Title>
						<UploadMany urlPath={"product"} />
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddProd;
