import React, { useState } from "react";
import { Button, Card, Divider, Modal, Space, Steps, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
export default function OXuLyInform() {
    const navigate = useNavigate();
    const description = 'This is a description.';

    const handleHome = () => {
        navigate("/pagequantri/vitrixuly")
    }
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
    const handleChoose = () => {

    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <Button
                    onClick={handleHome}
                    size="large"
                    style={{ marginLeft: "5px", marginTop: "5px" }}>
                    <HomeOutlined />

                </Button>
                <Divider type="vertical" style={{ height: "50px" }} />
                <Typography.Title
                    level={4}

                    style={{ marginTop: "5px", marginLeft: "5px" }}>Ô vị trí 1</Typography.Title>

            </div>

            <Space direction="vertical" style={{ border: "0.5px solid ", borderRadius: "10px", width: "300px", marginBottom: "5px" }}>
                <Card
                    title={"Thông tin nhân viên"}
                    headStyle={{ backgroundColor: '#5c6cfa', color: '#ffffff' }}
                >
                    <p>Mã nhân viên: </p>
                    <p>Họ tên nhân viên: </p>
                </Card>
                <Card
                    title={"Thông tin khách hàng"}
                    headStyle={{ backgroundColor: '#5c6cfa', color: '#ffffff' }}
                >
                    <p>Mã khách hàng: </p>
                    <p>Họ tên khách hàng: </p>
                    <p>Số điện thoại: </p>
                </Card>

                <Card
                    title={"Thông tin xe"}
                    headStyle={{ backgroundColor: '#5c6cfa', color: '#ffffff' }}
                >
                    <p>Loại xe: </p>
                    <p>Nhãn hiệu: </p>
                    <p>Biển số: </p>
                </Card>


            </Space >
            <Space direction="vertical" >
                <Steps
                    style={{ marginLeft: "20px" }}
                    current={0}
                    items={[
                        {
                            title: 'Waiting',
                            description,
                        },
                        {
                            title: 'In Progress',
                            description,
                            subTitle: '8:59',
                        },
                        {
                            title: 'Finished',
                            description,
                        },
                    ]}
                />

                <Space direction="vertical" style={{ border: "0.5px solid", width: "800px", marginLeft: "20px" }}>

                    <Card
                        title={"Dịch vụ sử dụng"}>
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
                                title: "Giá tiền",
                                dataIndex: "price",
                            },

                        ]}

                        ></Table>
                        <Button
                            onClick={showModal}
                            danger style={{ marginTop: "10px" }}>Khuyến mãi</Button>
                        <Space style={{ padding: "5px", marginTop: "10px", float: "right" }}>
                            <Button onClick={handleHome}
                                type="primary" style={{ marginLeft: "5px " }}>Hủy</Button>
                            <Button danger> Thanh toán</Button>
                        </Space>
                    </Card>

                </Space>

            </Space>

            <Modal title="Danh sách khuyến mãi"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                width={900}
            >
                <Space size={10} direction={"vertical"}>

                    <Table
                        columns={[
                            {
                                key: "1",
                                title: "Id",
                                dataIndex: "_id",
                            },
                            {
                                key: "2",
                                title: "Mã khuyến mãi",
                                dataIndex: "couponId",
                            },
                            {
                                key: "3",
                                title: "Tên khuyến mãi",
                                dataIndex: "couponName",
                            },
                            {
                                key: "4",
                                title: "Ngày bắt đầu",
                                dataIndex: "startDate",
                            },
                            {
                                key: "5",
                                title: "Ngày kết thúc",
                                dataIndex: "endDate",
                            },
                            {
                                key: "6",
                                title: "Actions",
                                render: (record) => {
                                    return (
                                        <>
                                            <Button onClick={handleChoose}>Sử dụng</Button>
                                        </>
                                    )
                                }
                            },
                        ]}>

                    </Table>

                </Space>
            </Modal>


        </div >

    )
}