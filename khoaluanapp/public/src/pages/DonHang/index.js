import { Button, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../utils/APIRoutes";
export default function DonHang() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true);
        getAllCustomer().then((res) => {
            setDataSource(res.users);

        });
    }, []);

    /// Chấp nhân đơn hàng -> clear khỏi db -> đổi status phiếu sang đang xử lý ( default: chưa xử lý)
    const handleAccept = () => {
        alert("hi");

    }
    /// Từ chối đơn hàng -> clear khỏi db
    const handleDenied = () => {
        alert("hi");

    }
    return (
        <div>
            <Space>
                <Typography.Title level={4}>Đơn hàng</Typography.Title>
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
                    title: "Tên khách hàng",
                    dataIndex: "lastName",
                },
                {
                    key: "6",
                    title: "Loại xe",
                    dataIndex: "price",
                },
                {
                    key: "7",
                    title: "Actions",
                    render: (record) => {
                        return (
                            <>
                                <Button onClick={handleAccept}>Chấp nhận</Button>
                                <Button onClick={handleDenied} danger style={{ marginLeft: "5px" }}>Từ chối</Button>
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

        </div>
    )
}