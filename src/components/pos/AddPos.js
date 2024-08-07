import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Products from "./Products";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const { Title } = Typography;

const AddPos = ({
  selectedProds,
  handleSelectedProdsQty,
  handleDeleteProd,
  handleSelectedProdsUnitPrice,
}) => {
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onClickLoading = () => {
    setLoader(true);
  };

  const [date, setDate] = useState(moment());
  const [afterDiscount, setAfterDiscount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCustomer({ page: 1, limit: 10 }));
  }, [dispatch]);

  const allCustomer = useSelector((state) => state.customers.list);
  const allProducts = useSelector((state) => state.products.list);
  //get id from local storage
  const user_id = localStorage.getItem("id");

  const [customer, setCustomer] = useState(null);

  const [formData, setFormData] = useState({});
  const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
    total: 0,
    discount: 0,
    afterDiscount: 0,
    paid: 0,
    due: 0,
  });

  const handleTotalChange = (e) => {
    const newTotal = parseFloat(e.target.value) || 0;
    const gstAmount = (newTotal * gst) / 100;
    const totalWithGst = newTotal + gstAmount;
    const discountAmount = (totalWithGst * discount) / 100;
    const finalAmount = totalWithGst - discountAmount;

    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      total: newTotal,
      gstAmount: gstAmount,
      totalWithGst: totalWithGst,
      discountAmount: discountAmount,
      afterDiscount: finalAmount,
      due: finalAmount - prev.paid,
    }));
  };

  const handleDiscount = (discountAmount) => {
    const afterDiscount = totalDiscountPaidDue.total - discountAmount;
    let dueAmount = totalDiscountPaidDue.total - discountAmount;
    if (totalDiscountPaidDue.paid > 0) {
      dueAmount = dueAmount - totalDiscountPaidDue.paid;
    }
    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      discount: discountAmount,
      due: dueAmount,
      afterDiscount,
    }));
  };

  const [returnAmount, setReturnAmount] = useState(0);

  const handelReturnAmount = (givenAmount) => {
    setReturnAmount(givenAmount ? givenAmount - totalDiscountPaidDue.due : 0);
  };

  // const handlePaid = (paidAmount) => {
  // 	const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
  // 	setTotalDiscountPaidDue((prev) => ({
  // 		...prev,
  // 		paid: paidAmount,
  // 		due: dueAmount,
  // 	}));
  // };

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    const saleInvoiceProduct = selectedProds.map((prod) => {
      return {
        product_id: prod.id,
        product_quantity: prod.selectedQty,
        product_sale_price: prod.sale_price,
      };
    });

    try {
      const valueData = {
		date: new Date().toString(),
		paid_amount: totalDiscountPaidDue.due,
		discount: totalDiscountPaidDue.discountAmount,
		gst: totalDiscountPaidDue.gstAmount,
		total_with_gst: totalDiscountPaidDue.totalWithGst,
		final_amount: totalDiscountPaidDue.afterDiscount,
		customer_id: customer,
		user_id: user_id,
		saleInvoiceProduct: [...saleInvoiceProduct],
      };

      const resp = await dispatch(addSale(valueData));

      if (resp.message === "success") {
        form.resetFields();
        setFormData({});
        setAfterDiscount(0);
        setLoader(false);
        setReturnAmount(0);
        navigate(`/sale/${resp.createdInvoiceId}`);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
      toast.error("Error while sales");
    }
  };

  const handleCustomerData = (data) => {
    setCustomer(data);
  };

  const onSearch = (value) => {};

  useEffect(() => {
    if (selectedProds.length > 0) {
      let total = 0;
      let afterDiscount = 0;
      let due = 0;

      selectedProds.forEach((prod) => {
        total += prod.sale_price * prod.selectedQty;
      });

      if (totalDiscountPaidDue.discount > 0) {
        afterDiscount = total - totalDiscountPaidDue.discount;
      } else afterDiscount = total;

      if (totalDiscountPaidDue.paid > 0) {
        due = afterDiscount - totalDiscountPaidDue.paid;
      } else due = afterDiscount;

      setTotalDiscountPaidDue((prev) => ({
        ...prev,
        total,
        afterDiscount,
        due,
      }));
    }
  }, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get("/discount");
        const discountPercentage = response.data.percentage;
        setDiscount(discountPercentage);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };

    fetchDiscount();
  }, []);

  const calculateDiscountedTotal = (total, discountPercentage) => {
    return total - (total * discountPercentage) / 100;
  };

  const discountedTotal = calculateDiscountedTotal(
    totalDiscountPaidDue.total,
    discount
  );
  const [gst, setGst] = useState(0);

  useEffect(() => {
    const fetchGst = async () => {
      try {
        const response = await axios.get("https://api.ifsmserp.com/v1/gst", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
          },
        });
        setGst(response.data.percentage);
      } catch (error) {
        console.error("Error fetching GST:", error);
      }
    };

    fetchGst();
  }, []);
  return (
    // POS Page White div
    <Card className="my-3 py-0 border border-[#EAECF0] rounded-xl">
      <Form
        form={form}
        className="m-lg-1  flex flex-col-reverse  "
        name="dynamic_form_nest_item"
        // onFinish={onFinish}
        // onChange={onChange}
        initialValues={{ discount: 0 }}
        layout="vertical"
        size="large"
        autoComplete="off"
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            {/* Customer Date in POS page */}
            <div className="d-flex  justify-content-between">
              <div className="w-50">
                <Form.Item
                  label="Customer "
                  name="customer_id"
                  style={{ maxWidth: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Select a Customer!",
                    },
                  ]}
                >
                  <Select
                    loading={!allCustomer}
                    showSearch
                    placeholder="Select a customer "
                    optionFilterProp="children"
                    onChange={handleCustomerData}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {allCustomer &&
                      allCustomer.map((cust) => (
                        <Option key={cust.id} value={cust.id}>
                          {cust.phone} - {cust.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="w-50">
                <Form.Item label="Date" required>
                  <DatePicker
                    className="date-picker"
                    onChange={(value) => setDate(value._d)}
                    defaultValue={moment()}
                    label="date"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input Date!",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Col>

          <Col
            span={24}
            style={{ border: "1px solid #ccc", padding: "10px 10px" }}
          >
<div style={{
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
}}>
  <strong>Total: </strong>
  <Input
    type="number"
    value={totalDiscountPaidDue.total}
    onChange={handleTotalChange}
    style={{ width: '100px' }}
  />
</div>
<div style={{
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
}}>
  <strong>GST ({gst}%): </strong>
  <strong>{totalDiscountPaidDue.gstAmount?.toFixed(2)} Rs</strong>
</div>
<div style={{
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
}}>
  <strong>Total with GST: </strong>
  <strong>{totalDiscountPaidDue.totalWithGst?.toFixed(2)} Rs</strong>
</div>
<div style={{
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
}}>
  <strong>Discount ({discount}%): </strong>
  <strong>-{totalDiscountPaidDue.discountAmount?.toFixed(2)} Rs</strong>
</div>
<div style={{
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
}}>
  <strong>Final Amount: </strong>
  <strong>{totalDiscountPaidDue.afterDiscount?.toFixed(2)} Rs</strong>
</div>


            {/* <strong>Paid Amount: </strong>
				<Form.Item
				  name="paid_amount"
				  rules={[
					{
					  required: true,
					  message: "Please input Paid amount!",
					},
				  ]}
				>
				  <InputNumber type="number" onChange={handlePaid} />
				</Form.Item>
			  </div>
			  <div
				style={{
				  padding: "10px 20px",
				  display: "flex",
				  justifyContent: "space-between",
				  border: "1px solid #ccc",
				}}
			  > 
							<strong>Due Amount: </strong>
							<strong>{totalDiscountPaidDue.due} tk</strong>*/}
            {/* </div> */}
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                className="bg-[#FE4F00] text-white border-none hover:scale-100 transition-all duration-150 delay-100 ease-out hover:bg-[#FE4F00] hover:border-none"
                block
                htmlType="submit"
                loading={loader}
                onClick={() => {
                  onClickLoading();
                  onFormSubmit();
                }}
              >
                Sale Product
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Products
              formData={formData}
              setData={setFormData}
              allProducts={allProducts}
              // updateFormData={updateFormData}
              selectedProds={selectedProds}
              handleSelectedProdsQty={handleSelectedProdsQty}
              handleSelectedProdsUnitPrice={handleSelectedProdsUnitPrice}
              handleDeleteProd={handleDeleteProd}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddPos;
