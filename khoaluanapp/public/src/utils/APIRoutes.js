const host = "http://localhost:4001";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneTonTai`;
export const forgotPasswordRoute = `${host}/api/auth/doiMatKhau`;

export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products').then(res => res.json());
}


export const getAllService = () => {
    return fetch('http://localhost:4001/api/service/getAllService').then(res => res.json())
}
export const getAllEmployee = () => {
    return fetch('http://localhost:4001/api/employee/getAllEmployee').then(res => res.json())
}
export const getAllCustomer = () => {
    return fetch('http://localhost:4001/api/customer/getAllCustomer').then(res => res.json())
}
export const getAllCoupon = () => {
    return fetch('http://localhost:4001/api/coupon/getAllCoupon').then(res => res.json())
}
export const getAllCar = () => {
    return fetch('http://localhost:4001/api/car/getAllCar').then(res => res.json())
}
export const addService = `${host}/api/service/addService`;
export const addEmployee = `${host}/api/employee/addEmployee`;
export const addCustomer = `${host}/api/customer/addCustomer`;
export const addCoupon = `${host}/api/coupon/addCoupon`;
export const addCar = `${host}/api/car/addCar`;


export const deleteService = `${host}/api/service/deleteService/:serviceId`;
export const deleteCoupon = `${host}/api/coupon/deleteCoupon/:couponId`;
export const deleteCar = `${host}/api/car/deleteCar/:carId`;

export const updateService = `${host}/api/service/updateService/:serviceId`;
export const updateCoupon = `${host}/api/coupon/updateCoupon/:couponId`;
export const updateCar = `${host}/api/car/updateCar/:carId`;

export const getEmployee = `${host}/api/employee/getEmployee/:employeeId`;
export const getCustomerById = `${host}/api/customer/getCustomerById`;
export const getCustomer = `${host}/api/customer/:getCustomer`;