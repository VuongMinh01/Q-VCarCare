const host = "http://localhost:4000";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneTonTai`;
export const forgotPasswordRoute = `${host}/api/auth/doiMatKhau`;

export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products').then(res => res.json());
}
export const getAllCustomer = () => {
    return fetch('https://dummyjson.com/users').then(res => res.json())
}
