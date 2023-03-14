import { Button, Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Input from "antd/es/input/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { addServiceRoute } from "../../utils/APIRoutes";
export default function KhuyenMai() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    const [values, setValues] = useState();

    useEffect(() => {
        setLoading(true);
        // API get danh sach db

        // getAllService().then((res) => {
        //     setDataSource(res.services);
        // });
    }, []);


    const handleClick = async (e) => {

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
                    <Input placeholder="Mã khuyến mãi" name="couponId" onChange={handleOnChange} />
                    <Input placeholder="Tên khuyến mãi" name="couponName" onChange={handleOnChange} />
                    <Input placeholder="Ngày bắt đầu" name="startDate" onChange={handleOnChange} />
                    <Input placeholder="Ngày kết thúc" name="endDate" onChange={handleOnChange} />
                    <Input placeholder="Thông tin chung" name="couponContent" onChange={handleOnChange} />
                    <Input placeholder="Loại" name="type" onChange={handleOnChange} />
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
                        title: "Mã khuyến mãi",
                        dataIndex: "serviceId",
                    },

                    {
                        key: "3",
                        title: "Tên khuyến mãi",
                        dataIndex: "serviceName",
                    },
                    {
                        key: "4",
                        title: "Ngày bắt đầu",
                        dataIndex: "",
                    },
                    {
                        key: "5",
                        title: "Ngày kết thúc",
                        dataIndex: "serviceContent",
                    },
                    {
                        key: "6",
                        title: "Thông tin chung",
                        dataIndex: "price",
                    },
                    {
                        key: "7",
                        title: "Loại",
                        dataIndex: "price",
                    },

                    {
                        key: "8",
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
