import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;

export default function Test() {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Thêm tài khoản
            </Button>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Thêm
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="customerId"
                                label="Mã khách hàng"
                                rules={[{ required: true, message: 'Mã khách hàng không được để trống' }]}
                            >
                                <Input placeholder="Nhập mã khách hàng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="customerName"
                                label="Tên khách hàng"
                                rules={[{ required: true, message: 'Tên khách hàng không được để trống' }]}
                            >
                                <Input placeholder="Nhập tên khách hàng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Địa chỉ mail"
                                rules={[{ required: true, message: 'Địa chỉ mail không được để trống' }]}
                            >
                                <Input placeholder="Nhập địa chỉ mail"
                                    addonAfter="@gmail.com"
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Please select a city' }]}
                            >
                                <Select placeholder="Please select an city">
                                    <Option value="Tp.HCM">Tp.HCM</Option>
                                    <Option value="Hà Nội">Hà Nội</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="carPlate"
                                label="Biển số xe"
                            >
                                <Input placeholder="Nhập biển số xe" />
                            </Form.Item>
                        </Col>

                    </Row>


                </Form>
            </Drawer>
        </>
    );
};
