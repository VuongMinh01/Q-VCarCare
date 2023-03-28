import { Button, Space, Table, Typography, Modal } from "antd";
import React, { useState, useEffect } from "react";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Input from "antd/es/input/Input";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { getAllCar, addCar, deleteCar, updateCar } from "../../utils/APIRoutes";
export default function Xe() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [values, setValues] = useState({
        carId: "",
        carName: "",
        carType: "",
        carCompany: "",
    });

    useEffect(() => {
        setLoading(true);
        getAllCar().then((res) => {
            setDataSource(res.data);
        })
    }, [loading])

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
            const { carId, carName, carType, carCompany } = values;
            const { data } = await axios.post(addCar, {
                carId,
                carName,
                carType,
                carCompany,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                setLoading(true)
                updateTable(data.service)
                localStorage.setItem("car-app-car", JSON.stringify(data.car));
                console.log("Thêm thành công");

            }
        }
    }

    const handleValidation = () => {
        const { carId, carName, carType, carCompany } = values;
        if (carId.length < 5) {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        if (carName.length < 5) {
            toast.error("Tên xe phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        if (carType === "") {
            toast.error("Loại xe không được để rỗng", toastOptions);
            return false;
        }
        if (carCompany === "") {
            toast.error("Hãng xe không được để rỗng", toastOptions);
            return false;
        }
        return true;
    }

    const onDeleteService = async (e) => {
        const { carId, carName, carType, carCompany } = values;
        const { data } = await axios.delete(deleteCar, {
            carId,
            carName,
            carCompany,
            carType,
        });
        setLoading(true)
        updateTable(data.car)
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
        const { carId, carName, carCompany, carType } = values;
        const { data } = await axios.put(updateCar, {
            carId,
            carName,
            carCompany,
            carType,
        });
        setLoading(true)
        updateTable(data.service)
        console.log('updated');
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (

        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Dịch vụ</Typography.Title>
                <Space>
                    <Input placeholder="Mã xe" name="carId" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Tên xe" name="carName" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Loại xe" name="carType" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Hãng xe" name="carCompany" onChange={(e) => handleOnChange(e)} />
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
                        title: "Mã xe",
                        dataIndex: "carId",
                    },

                    {
                        key: "3",
                        title: "Tên xe",
                        dataIndex: "carName",
                    },
                    {
                        key: "4",
                        title: "Loại xe",
                        dataIndex: "carType",
                    },
                    {
                        key: "5",
                        title: "Hãng xe",
                        dataIndex: "carCompany",
                    },

                    {
                        key: "6",
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
                <Input placeholder="Mã xe" name="carId" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Tên xe" name="carName" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Loại xe" name="carType" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Hãng xe" name="carCompany" onChange={(e) => handleOnChange(e)} />
            </Modal>
        </div>
    )
}