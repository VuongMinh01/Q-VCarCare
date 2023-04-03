import { Space, Table, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import { addCustomer, getAllCustomer } from "../../utils/APIRoutes";
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
        carPlate: "",
    })
    useEffect(() => {
        setLoading(true);
        getAllCustomer().then((res) => {
            setDataSource(res.data);

        });
    }, [loading]);

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { customerId, customerName, phone, address, email, carPlate } = values;
            const { data } = await axios.post(addCustomer, {
                customerId,
                customerName,
                phone,
                address,
                email,
                carPlate,
            })
            if (data.status === false) {
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                setLoading(true)
                updateTable(data.customer)
                console.log(dataSource);
                console.log("Thêm thành công");

            }
        }
    };
    const updateTable = (data) => {
        setDataSource(previousState => {
            console.log(data);
            // previousState.push(data);
            console.log(previousState);
            setLoading(false)
            return previousState
        });
    }

    const handleValidation = () => {
        const { customerId, customerName, phone, address, email } = values;
        if (customerId.length < 5 || customerId === "") {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (customerName.length < 5) {
            toast.error("Tên nhân viên phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (phone.length !== 10) {
            toast.error("Số điện thoại không hợp lệ", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email không được để trống", toastOptions);
            return false;
        }
        else if (address === "") {
            toast.error("Địa chỉ không được để trống", toastOptions);
            return false;
        }
        return true;
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

                <Typography.Title level={4}>Danh sách khách hàng</Typography.Title>
                <Space>
                    <Input placeholder="Mã khách hàng" name="customerId" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Tên khách hàng" name="customerName" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Email" name="email" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Số điện thoại" name="phone" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Địa chỉ" name="address" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Biển số xe" name="carPlate" onChange={(e) => handleOnChange(e)} />

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