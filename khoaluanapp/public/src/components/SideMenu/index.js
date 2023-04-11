import React from "react";
import { Menu } from "antd"
import { AppstoreOutlined, CarOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function SideMenu() {
    const navigate = useNavigate();
    return (
        <div className="SideMenu">

            <Menu
                // theme="dark"

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
                        key: '/admin/dashboard',
                    },
                    {
                        label: "Đơn hàng",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Yêu cầu xử lý", key: '/admin/donhang' },
                            { label: "Vị trí xử lý", key: '/admin/vitrixuly' },
                            { label: "Danh sách đơn hàng", key: '/admin/danhsachdonhang' },
                            { label: "Hóa đơn", key: '/admin/hoadon' },
                        ]
                    },
                    {
                        label: "Dịch vụ",
                        icon: <ShopOutlined />,
                        children: [
                            { label: "Dịch vụ", key: '/admin/dichvu' },
                            { label: "Sản phẩm", key: '/admin/sanpham' }
                        ]
                    },
                    {
                        label: "Khách hàng",
                        key: '/admin/khachhang',
                        icon: <UserOutlined />
                    },
                    {
                        label: "Nhân viên",
                        key: '/admin/nhanvien',
                        icon: <TeamOutlined />
                    },
                    {
                        label: "Khuyến mãi",
                        key: '/admin/khuyenmai',
                        icon: <TagOutlined />
                    },
                    {
                        label: "Xe",
                        key: '/admin/xe',
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