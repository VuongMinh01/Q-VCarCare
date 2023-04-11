import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Login from './pages/Login'
import TrangChu from "./pages/TrangChu";
import ForgotPassWord from "./pages/ForgotPassWord";
import Product from "./pages/Product";
import Service from "./pages/Service";
import Information from "./pages/Information";
import FormBooking from "./components/FormBooking";
import Discount from "./pages/Discount";
import Register from "./pages/Register";
import SideBar from "./components/SideBar";
import PageQuanTri from "./pages/PageQuanTri";
import Test from "./pages/Test"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/trang-chu" element={<TrangChu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassWord />} />
          <Route path="/san-pham" element={<Product />} />
          <Route path="/dich-vu" element={<Service />} />
          <Route path="/gioi-thieu" element={<Information />} />
          <Route path="/dat-lich" element={<FormBooking />} />
          <Route path="/khuyen-mai" element={<Discount />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/admin/*" element={<PageQuanTri />}></Route>
          <Route path="/test" element={<Test />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
