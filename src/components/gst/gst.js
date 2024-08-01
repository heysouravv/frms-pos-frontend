import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import PageTitle from '../page-header/PageHeader';
import axios from 'axios';
import CustomTable from './CustomTable';

const { Title } = Typography;

const Gst = () => {
  const [refreshTable, setRefreshTable] = useState(false);

  const onFinish = (values) => {
    const { name, percentage } = values;
    const authtoken = localStorage.getItem("access-token");

    axios.post('https://api.ifsmserp.com/v1/gst', {
      name,
      percentage
    }, {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      setRefreshTable(!refreshTable);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <PageTitle title='Back' />
      <Card bordered={false} className='w-1/2 mx-auto'>
        <Title level={4} className='m-2 text-black text-center'>
          Add GST
        </Title>
        <Form 
          onFinish={onFinish} 
          name='basic'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          autoComplete='off'
          className='flex flex-col justify-start gap-y-3 items-start w-full'
        >
          <Form.Item
            label="Name"
            name="name"
            className='flex w-full justify-start'
            rules={[{ required: true, message: 'Please input the GST name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Percentage"
            name="percentage"
            className='w-full'
            rules={[{ required: true, message: 'Please input the GST percentage!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className='w-full'>
            <Button type="primary" className='border-none bg-[#FE4F00] w-full hover:bg-[#FE4F00]' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card bordered={false} className="mt-4">
        <CustomTable endpoint="v1/gst" key={refreshTable} />
      </Card>
    </div>
  );
};

export default Gst;