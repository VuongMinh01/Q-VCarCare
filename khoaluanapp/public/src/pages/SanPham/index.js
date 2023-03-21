import { Avatar, Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../utils/APIRoutes";
export default function SanPham() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true);
        getAllProducts().then((res) => {
            setDataSource(res.products);
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
                        title: "Thumbnail",
                        dataIndex: "thumbnail",
                        render: (link) => {
                            return <Avatar src={link}></Avatar>
                        }
                    },
                    {
                        key: "3",
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        key: "4",
                        title: "Price",
                        dataIndex: "price",
                    },
                    {
                        key: "5",
                        title: "Brand",
                        dataIndex: "brand",
                    },
                    {
                        key: "6",
                        title: "Stock",
                        dataIndex: "stock",
                    },
                    {
                        key: "7",
                        title: "Category",
                        dataIndex: "category",
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