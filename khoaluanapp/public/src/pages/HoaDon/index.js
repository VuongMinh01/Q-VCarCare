import { Button, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../utils/APIRoutes";
export default function HoaDon() {
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
                <Typography.Title level={4}>Danh sách hoá đơn</Typography.Title>
            </Space>

            <Table columns={[
                {
                    key: "1",
                    title: "Id",
                    dataIndex: "_id",
                },
                {
                    key: "2",
                    title: "Mã hoá đơn",
                    dataIndex: "serviceId",
                },

                {
                    key: "3",
                    title: "Tên khách hàng",
                    dataIndex: "serviceName",
                },
                {
                    key: "4",
                    title: "Ngày tạo",
                    dataIndex: "date",
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