import { Space, Table, Typography, Button } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { addEmployee, getAllEmployee } from "../../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Input from "antd/es/input/Input";

export default function NhanVien() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [values, setValues] = useState({
        employeeId: "",
        employeeName: "",
        phone: "",
        email: "",
        address: "",
    })
    useEffect(() => {
        setLoading(true);
        // API get danh sach db

        getAllEmployee().then((res) => {
            setDataSource(res.data);
        })
    }, []);

    const ref = useRef();

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { employeeId, employeeName, phone, address, email } = values;
            const { data } = await axios.post(addEmployee, {
                employeeId,
                employeeName,
                phone,
                address,
                email,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                localStorage.setItem("car-app-employee", JSON.stringify(data.employee));
                console.log("Thêm thành công");

            }
        }
    };
    const handleValidation = () => {
        const { employeeId, employeeName, phone, address, email } = values;
        if (employeeId.length < 5 || employeeId === "") {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (employeeName.length < 5) {
            toast.error("Tên nhân viên phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (phone.length !== 10) {
            toast.error("Số điện thoại không hợp lệ", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email không được để trống", toastOptions);
            return false;
        }
        else if (address === "") {
            toast.error("Địa chỉ không được để trống", toastOptions);
            return false;
        }
        return true;
    };
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách nhân viên</Typography.Title>
                <Space>
                    <Input placeholder="Mã nhân viên" name="employeeId" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Tên nhân viên" name="employeeName" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Email" name="email" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Số điện thoại" name="phone" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Địa chỉ" name="address" onChange={(e) => handleOnChange(e)} />
                    <Button onClick={(e) => handleClick(e)}>Thêm</Button>

                </Space>
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
            <ToastContainer />

        </div>
    )
}