import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import DichVu from "../../pages/DichVu";
import DonHang from "../../pages/DonHang";
import KhachHang from "../../pages/KhachHang";
import KhuyenMai from "../../pages/KhuyenMai";
import SanPham from "../../pages/SanPham";
import ViTriXuLy from "../../pages/ViTriXuLy.js";

import Xe from "../../pages/Xe";
import DanhSachDonHang from "../../pages/DanhSachDonHang";
import OXuLyInform from "../OXuLyInform";
import HoaDon from "../../pages/HoaDon";
import NhanVien from '../../pages/NhanVien';
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/donhang" element={<DonHang />}></Route>
            <Route path="/dichvu" element={<DichVu />}></Route>
            <Route path="/sanpham" element={<SanPham />}></Route>
            <Route path="/vitrixuly" element={<ViTriXuLy />}></Route>
            <Route path="/vitrixuly/oxuly" element={<OXuLyInform />}></Route>
            <Route path="/danhsachdonhang" element={<DanhSachDonHang />}></Route>
            <Route path="/xe" element={<Xe />}></Route>
            <Route path="/khuyenmai" element={<KhuyenMai />}></Route>
            <Route path="/khachhang" element={<KhachHang />}></Route>
            <Route path="/nhanvien" element={<NhanVien />}></Route>

            <Route path="/hoadon" element={<HoaDon />}></Route>

        </Routes>
    )
}