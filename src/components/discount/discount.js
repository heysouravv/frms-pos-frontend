import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography } from 'antd'
import PageTitle from '../page-header/PageHeader'
import axios from 'axios'
import Title from 'antd/lib/skeleton/Title'
import CustomTable from './CustomTable'


const Discount = () => {
  const [addedDiscount, setAddedDiscount] = useState(false)
  setTimeout(() => {
    setAddedDiscount(false)
  }, 1000)

  
const {Title} = Typography
  const [refreshTable, setRefreshTable] = useState(false);
  const onFinish = (values) => {
    const { name, percentage } = values
    const authtoken = localStorage.getItem("access-token") // Replace with your actual auth token
console.log(authtoken)
    axios.post('https://api.ifsmserp.com/v1/discount', {
      name,
      percentage
    }, {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    })
    .then(response => {
      console.log('Success:', response.data)
      setAddedDiscount(true)
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }

  return (
    <div className=''>
      <PageTitle title='Back' />
          <Card bordered={false} className='mx-auto w-11/12 lg:w-1/2'>
        <Title level={4} className='m-2 text-black text-center'>
							Add Discount
						</Title>

      <Form onFinish={onFinish}  xs={24}
					sm={24}
					md={28}
					lg={12}
					xl={11}
          name='basic'
							labelCol={{
								span: 24,
							}}
							wrapperCol={{
								span: 24,
							}}
							initialValues={{
								remember: true,
							}}
              autoComplete='off'
           className='flex flex-col justify-start  gap-y-3 items-start w-full'>
        <Form.Item
          label="Name"
          name="name"
          className='flex w-full justify-start'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input className='w-full' />
        </Form.Item>
        <Form.Item
          label="Percentage"
          name="percentage"
          className='w-full'
          rules={[{ required: true, message: 'Please input the percentage!' }]}
        >
          <Input className='w-full' />
        </Form.Item>
        <Form.Item className='w-full'>
          <Button type="primary" className='bg-[#FE4F00] border-none w-full hover:bg-[#FE4F00]' htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
          </Card>

          <Card bordered={false} className="mt-4">


        <CustomTable key={refreshTable} addedDiscount={addedDiscount} />
      </Card>
    </div>
  )
}

export default Discount