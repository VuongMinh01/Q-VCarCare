import { Button, Space, Table, Typography, Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Input from "antd/es/input/Input";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { addService, deleteService, getAllService, updateService } from "../../utils/APIRoutes";
export default function DichVu() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [values, setValues] = useState({
        serviceId: "",
        serviceName: "",
        serviceContent: "",
        serviceTime: "",
        servicePrice: "",
    });

    useEffect(() => {
        setLoading(true);
        // API get danh sach db

        getAllService().then((res) => {
            setDataSource(res.data);
        })
    }, [loading]);

    const ref = useRef();

    const updateTable = (data) => {
        setDataSource(previousState => {
            console.log(data);
            // previousState.push(data);
            console.log(previousState);
            setLoading(false)
            return previousState
        });
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { serviceId, serviceName, serviceContent, serviceTime, servicePrice } = values;
            const { data } = await axios.post(addService, {
                serviceId,
                serviceName,
                serviceContent,
                serviceTime,
                servicePrice,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                setLoading(true)
                updateTable(data.service)
                localStorage.setItem("car-app-service", JSON.stringify(data.service));
                console.log("Thêm thành công");

            }
        }
    };
    const handleValidation = () => {
        const { serviceId, serviceName, serviceContent, serviceTime, servicePrice } = values;
        if (serviceId === "" || serviceId.length < 3) {
            toast.error("Id phải lớn hơn 3 kí tự", toastOptions);
            return false;
        }
        if (serviceName.length < 3) {
            toast.error("Tên dịch vụ không được ít hơn 3 ký tự.", toastOptions);
            return false;
        }
        else if (serviceContent === "") {
            toast.error("Thông tin không được để trống.", toastOptions);
            return false;
        }

        else if (serviceTime === "") {
            toast.error("Thời gian không được để trống.", toastOptions);
            return false;
        }
        else if (servicePrice === "") {
            toast.error("Giá tiền không được để trống.", toastOptions);
            return false;
        }
        return true;
    };
    const onDeleteService = async (e) => {

        console.log(e.serviceId);
        const { serviceId, serviceName, serviceContent, serviceTime, servicePrice } = values;

        const { data } = await axios.delete(deleteService, {
            serviceId,
            serviceName,
            serviceContent,
            serviceTime,
            servicePrice,
        });
        setLoading(true)
        updateTable(data.service)
        localStorage.clear();
        console.log('deleted');




    }


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



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        console.log('11111');
        const { serviceId, serviceName, serviceContent, serviceTime, servicePrice } = values;
        const { data } = await axios.put(updateService, {
            serviceId,
            serviceName,
            serviceContent,
            serviceTime,
            servicePrice,
        });
        console.log('222222');
        setLoading(true)
        updateTable(data.service)
        console.log('updated');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Dịch vụ</Typography.Title>
                <Space>
                    <Input placeholder="Mã dịch vụ" name="serviceId" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Tên dịch vụ" name="serviceName" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Thời gian" name="serviceTime" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Thông tin chung" name="serviceContent" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Giá tiền" name="servicePrice" onChange={(e) => handleOnChange(e)} />
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
                        dataIndex: "serviceTime",
                    },
                    {
                        key: "5",
                        title: "Thông tin chung",
                        dataIndex: "serviceContent",
                    },
                    {
                        key: "6",
                        title: "Giá tiền",
                        dataIndex: "servicePrice",
                    },
                    {
                        key: "7",
                        title: "Actions",
                        render: (record) => {
                            return (
                                <>
                                    <EditOutlined onClick={showModal}
                                    />
                                    <DeleteOutlined onClick={() => onDeleteService(record)} style={{ color: "red", marginLeft: "12px" }} />
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
            <ToastContainer />

            <Modal
                title="Cập nhật thông tin"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            >
                <Input placeholder="Tên dịch vụ" name="serviceName" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Thời gian" name="serviceTime" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Thông tin chung" name="serviceContent" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Giá tiền" name="servicePrice" onChange={(e) => handleOnChange(e)} />

            </Modal>
        </div>

    )
}
