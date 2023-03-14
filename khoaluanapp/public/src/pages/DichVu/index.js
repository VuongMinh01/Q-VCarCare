import { Button, Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Input from "antd/es/input/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { addServiceRoute } from "../../utils/APIRoutes";
export default function DichVu() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    const [values, setValues] = useState({
        serviceId: "",
        serviceName: "",
        serviceContent: "",
        time: "",
        price: "",
    });

    useEffect(() => {
        setLoading(true);
        // API get danh sach db

        // getAllService().then((res) => {
        //     setDataSource(res.services);
        // });
    }, []);


    const handleClick = async (e) => {
        // console.log("1");
        // const { serviceId, serviceName, serviceContent, time, price } = values;
        // const { data } = await axios.post(addServiceRoute, {
        //     serviceId, serviceName, serviceContent, time, price,
        // })
        // if (data.status === false) {
        //     toast.error(data.msg, toastOptions);
        //     console.log("1");
        // }
        // if (data.status === true) {
        //     localStorage.setItem("car-app-service", JSON.stringify(data.service));
        //     console.log("2");

        // }
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onDeleteService = (record) => {

    }
    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Dịch vụ</Typography.Title>
                <Space>
                    <Input placeholder="Mã dịch vụ" name="serviceId" onChange={handleOnChange} />
                    <Input placeholder="Tên dịch vụ" name="serviceName" onChange={handleOnChange} />
                    <Input placeholder="Thời gian" name="time" onChange={handleOnChange} />
                    <Input placeholder="Thông tin chung" name="serviceContent" onChange={handleOnChange} />
                    <Input placeholder="Giá tiền" name="price" onChange={handleOnChange} />
                    <Button onClick={(e) => handleClick(e)}>Thêm</Button>

                </Space>
                <Table columns={[
                    {
                        key: "1",
                        title: "Id",
                        dataIndex: "_id",
                    },
                    {
                        key: "2",
                        title: "Mã dịch vụ",
                        dataIndex: "serviceId",
                    },

                    {
                        key: "3",
                        title: "Tên dịch vụ",
                        dataIndex: "serviceName",
                    },
                    {
                        key: "4",
                        title: "Thời gian",
                        dataIndex: "time",
                    },
                    {
                        key: "5",
                        title: "Thông tin chung",
                        dataIndex: "serviceContent",
                    },
                    {
                        key: "6",
                        title: "Giá tiền",
                        dataIndex: "price",
                    },
                    {
                        key: "7",
                        title: "Actions",
                        render: (record) => {
                            return (
                                <>
                                    <EditOutlined />
                                    <DeleteOutlined onClick={onDeleteService(record)} style={{ color: "red", marginLeft: "12px" }} />
                                </>
                            )
                        }
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
        </div>
    )
}
