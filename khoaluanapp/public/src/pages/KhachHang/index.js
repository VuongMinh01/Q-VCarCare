import { Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { getAllCustomer } from "../../utils/APIRoutes";
export default function KhachHang() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true);
        getAllCustomer().then((res) => {
            setDataSource(res.users);

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
                        dataIndex: "id",
                    },
                    {
                        key: "2",
                        title: "firstName",
                        dataIndex: "firstName",

                    },
                    {
                        key: "3",
                        title: "LastName",
                        dataIndex: "lastName",
                    },
                    {
                        key: "4",
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        key: "5",
                        title: "Phone",
                        dataIndex: "phone",
                    },

                    {
                        key: "6",
                        title: "Address",
                        dataIndex: "address",
                        render: (address) => {
                            return <span>{address.address}</span>
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