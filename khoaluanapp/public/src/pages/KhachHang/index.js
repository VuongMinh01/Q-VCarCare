import { Space, Table, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import { getAllCustomer } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function KhachHang() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [values, setValues] = useState({
        customerId: "",
        customerName: "",
        phone: "",
        email: "",
        address: "",
    })
    useEffect(() => {
        setLoading(true);
        getAllCustomer().then((res) => {
            setDataSource(res.data);

        });
    }, []);

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }
    const handleClick = (e) => {

    }

    const handleValidation = () => {

    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };

    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Sản phẩm</Typography.Title>
                <Space>
                    <Input placeholder="Mã khách hàng" name="customerId" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Tên khách hàng" name="customerName" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Email" name="email" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Số điện thoại" name="phone" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Địa chỉ" name="address" onChange={(e) => handleOnChange(e)} />
                    <Button onClick={(e) => handleClick(e)}>Thêm</Button>

                </Space>
                <Table columns={[
                    {
                        key: "1",
                        title: "Id",
                        dataIndex: "customerId",
                    },
                    {
                        key: "2",
                        title: "Họ tên",
                        dataIndex: "customerName",

                    },

                    {
                        key: "3",
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        key: "4",
                        title: "Số điện thoại",
                        dataIndex: "phone",
                    },

                    {
                        key: "5",
                        title: "Địa chỉ",
                        dataIndex: "address",

                    },
                ]}
                    dataSource={dataSource}
                    pagination={
                        {
                            pageSize: 10,
                        }
                    }
                ></Table>
            </Space>
            <ToastContainer />

        </div>
    )
}