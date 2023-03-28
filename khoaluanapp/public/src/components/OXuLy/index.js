import React, { useState } from "react";
import { Button, Card, Modal, Space, Table, Divider } from "antd";
import { useNavigate } from "react-router-dom";

export default function OXuLy() {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleView = () => {
        navigate("/pagequantri/vitrixuly/oxuly")
    }

    return (

        <div>
            <Modal title="Vị trí xử lý 1" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <Space direction="horizontal">
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
                                        <Button >Chấp nhận</Button>
                                        <Button >Từ chối</Button>
                                    </>
                                )
                            }
                        },
                    ]}
                        pagination={
                            {
                                pageSize: 10,
                            }
                        }
                    ></Table>

                </Space>
            </Modal>


            <Space direction={"vertical"}>
                <Space >
                    <Card
                        id=""
                        title="Vị trí xử lý 1"
                        bordered={false}
                        headStyle={{ backgroundColor: '#5c6cfa', color: '#ffffff' }}
                        bodyStyle={{ backgroundColor: '#a9bbff' }}
                        style={{ width: 390 }} >
                        <Space direction={"horizontal"} style={{ border: "0.5px solid", padding: "5px", width: "350px", fontWeight: "bold" }} >
                            <Space direction={"vertical"}   >
                                <p>Tên nhân viên: </p>
                                <p>Thời gian dự kiến: </p>
                                <p>Dịch vụ: </p>
                                <p>Trạng thái:  </p>

                            </Space>
                            <Divider type="vertical" style={{ height: "150px" }} />

                            <Space direction={"vertical"} >
                                <p>...</p>
                                <p>...</p>
                                <p>...</p>
                                <p>Còn trống</p>

                            </Space>

                        </Space>
                        <Space style={{ marginLeft: "120px", padding: "5px" }}>
                            <Button onClick={showModal} type="primary">Đặt</Button>
                            <Button onClick={handleView} danger>Xem</Button>

                        </Space>
                    </Card>

                    <Card
                        id=""
                        title="Vị trí xử lý 2"
                        bordered={false}
                        headStyle={{ backgroundColor: 'red', color: '#ffffff' }}
                        bodyStyle={{ backgroundColor: '#a9bbff' }}
                        style={{ width: 390 }} >
                        <Space direction={"horizontal"} style={{ border: "0.5px solid", padding: "5px", width: "350px", fontWeight: "bold" }} >
                            <Space direction={"vertical"} >
                                <p>Tên nhân viên: </p>
                                <p>Thời gian dự kiến: </p>
                                <p>Dịch vụ: </p>
                                <p>Trạng thái:  </p>

                            </Space>
                            <Divider type="vertical" style={{ height: "150px" }} />

                            <Space direction={"vertical"} >
                                <p>Nguyễn Văn A</p>
                                <p>12:00</p>
                                <p>Vệ sinh khoang xe</p>
                                <p>Đang sử dụng</p>

                            </Space>

                        </Space>
                        <Space style={{ marginLeft: "120px", padding: "5px" }}>
                            <Button onClick={showModal} type="primary">Đặt</Button>
                            <Button onClick={handleView} danger>Xem</Button>

                        </Space>
                    </Card>


                    <Card
                        id=""
                        title="Vị trí xử lý 3"
                        bordered={false}
                        headStyle={{ backgroundColor: 'gold', color: '#ffffff' }}
                        bodyStyle={{ backgroundColor: '#a9bbff' }}
                        style={{ width: 390 }} >
                        <Space direction={"horizontal"} style={{ border: "0.5px solid", padding: "5px", width: "350px", fontWeight: "bold" }} >
                            <Space direction={"vertical"} >
                                <p>Tên nhân viên: </p>
                                <p>Thời gian dự kiến: </p>
                                <p>Dịch vụ: </p>
                                <p>Trạng thái:  </p>

                            </Space>
                            <Divider type="vertical" style={{ height: "150px" }} />

                            <Space direction={"vertical"} >
                                <p>Lỗi</p>
                                <p>Lỗi</p>
                                <p>Lỗi</p>
                                <p>Đang bảo trì</p>

                            </Space>

                        </Space>
                        <Space style={{ marginLeft: "120px", padding: "5px" }}>
                            <Button onClick={showModal} type="primary">Đặt</Button>
                            <Button onClick={handleView} danger>Xem</Button>

                        </Space>
                    </Card>


                </Space>
            </Space>


        </div>
    )
}