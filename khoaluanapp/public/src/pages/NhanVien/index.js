import { Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { getAllEmployee } from "../../utils/APIRoutes";
export default function NhanVien() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setLoading(true);
        // API get danh sach db

        getAllEmployee().then((res) => {
            setDataSource(res.data);
        })
    }, []);
    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách nhân viên</Typography.Title>
                <Table columns={[
                    {
                        key: "1",
                        title: "Id",
                        dataIndex: "employeeId",
                    },
                    {
                        key: "2",
                        title: "Họ tên",
                        dataIndex: "employeeName",

                    },
                    {
                        key: "3",
                        title: "Mail",
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
                    {
                        key: "6",
                        title: "Trạng thái",
                        dataIndex: "status",
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