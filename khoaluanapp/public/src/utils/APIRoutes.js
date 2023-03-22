const host = "http://localhost:4001";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneTonTai`;
export const forgotPasswordRoute = `${host}/api/auth/doiMatKhau`;

export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products').then(res => res.json());
}


export const getAllService = () => {
    return fetch('http://localhost:4001/getAllService').then(res => res.json())
}
export const getAllEmployee = () => {
    return fetch('http://localhost:4001/getAllEmployee').then(res => res.json())
}
export const getAllCustomer = () => {
    return fetch('http://localhost:4001/getAllCustomer').then(res => res.json())
}
export const addService = `${host}/api/service/addService`;
export const addEmployee = `${host}/api/employee/addEmployee`;
export const addCustomer = `${host}/api/customer/addCustomer`;

export const deleteService = `${host}/api/service/deleteService/:serviceId`;
export const updateService = `${host}/api/service/updateService/:serviceId`;
