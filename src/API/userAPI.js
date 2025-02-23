import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export const allUserApi = async () => {
    try {
        let response = await axios.get(`${url}/alluser`, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export const SingleChatApi = async (data) => {
    try {
        let response = await axios.post(`${url}/singleChat`, data, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}