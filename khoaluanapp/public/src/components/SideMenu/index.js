import React from "react";
import { Menu } from "antd"
import { AppstoreOutlined, CarOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function SideMenu() {
    const navigate = useNavigate();
    return (
        <div className="SideMenu">

            <Menu
                mode="inline"
                onClick={(item) => {
                    if (item.key === "/signout") {
                        localStorage.clear();
                        navigate("/login");
                    } else {
                        navigate(item.key);
                    }
                }}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/pagequantri/dashboard',
                    },
                    {
                        label: "Đơn hàng",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Yêu cầu xử lý", key: '/pagequantri/donhang' },
                            { label: "Vị trí xử lý", key: '/pagequantri/vitrixuly' },
                            { label: "Danh sách đơn hàng", key: '/pagequantri/danhsachdonhang' },
                            { label: "Hóa đơn", key: '/pagequantri/hoadon' },
                        ]
                    },
                    {
                        label: "Dịch vụ",
                        icon: <ShopOutlined />,
                        children: [
                            { label: "Dịch vụ", key: '/pagequantri/dichvu' },
                            { label: "Sản phẩm", key: '/pagequantri/sanpham' }
                        ]
                    },
                    {
                        label: "Khách hàng",
                        key: '/pagequantri/khachhang',
                        icon: <UserOutlined />
                    },
                    {
                        label: "Nhân viên",
                        key: '/pagequantri/nhanvien',
                        icon: <TeamOutlined />
                    },
                    {
                        label: "Khuyến mãi",
                        key: '/pagequantri/khuyenmai',
                        icon: <TagOutlined />
                    },
                    {
                        label: "Xe",
                        key: '/pagequantri/xe',
                        icon: <CarOutlined />,
                    },
                    {
                        label: "Đăng xuất",
                        key: '/signout',
                        icon: <LogoutOutlined />,
                    },

                ]}
            >

            </Menu>

        </div>
    )
}