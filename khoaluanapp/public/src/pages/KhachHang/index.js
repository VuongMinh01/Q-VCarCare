import { Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { getAllCustomer } from "../../utils/APIRoutes";
export default function KhachHang() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true);
        getAllCustomer().then((res) => {
            setDataSource(res.data);

        });
    }, []);
    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Sản phẩm</Typography.Title>
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
        </div>
    )
}