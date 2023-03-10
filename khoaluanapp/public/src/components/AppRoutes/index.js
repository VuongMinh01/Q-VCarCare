import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import DichVu from "../../pages/DichVu";
import DonHang from "../../pages/DonHang";
import KhachHang from "../../pages/KhachHang";
import KhuyenMai from "../../pages/KhuyenMai";
import SanPham from "../../pages/SanPham";
import Xe from "../../pages/Xe";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/donhang" element={<DonHang />}></Route>
            <Route path="/dichvu" element={<DichVu />}></Route>
            <Route path="/sanpham" element={<SanPham />}></Route>

            <Route path="/xe" element={<Xe />}></Route>
            <Route path="/khuyenmai" element={<KhuyenMai />}></Route>
            <Route path="/khachhang" element={<KhachHang />}></Route>
        </Routes>
    )
}