import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { googleLoginAPI } from "../API/LoginAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "./loading";

export let Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userdata = useSelector((state) => state.ReduxData)
    let [loading, setloading] = useState(false)
    const responseGoogleSuccess = async (response) => {
        try {
            setloading(true)
            let data = await googleLoginAPI(response)
            localStorage.setItem("userInfo", JSON.stringify(data.data))
            localStorage.setItem("token", JSON.stringify(data.token))
            dispatch({ type: "SET_USER_INFO", payload: data.data })
            navigate("/alluser")
            setloading(false)
        } catch (err) {
            setloading(false)
            console.error(err);
            alert('Failed to login with Google');
            return;
        }
    };
    const responseGoogleError = () => {
        alert('Failed to login with Google');
    }
    useEffect(() => {
        if (userdata.autenctionState) {
            console.log(userdata.autenctionState)
            navigate("/alluser")
        }
    }, [])
    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <div className="min-h-screen flex items-center justify-center bg-dark-bg text-light-gray bg-cyan-100">
                    <div className="max-w-sm w-full text-center p-8 bg-gray-800 rounded-lg shadow-lg animate-fade-in">
                        <h1 className="text-3xl font-bold text-white mb-8">Login</h1>
                        <GoogleLogin
                            buttonText="Login with Google"
                            onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleError}
                            cookiePolicy="single_host_origin"
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="w-full py-3 rounded-md bg-primary text-white text-lg font-semibold transition transform duration-300 hover:scale-105 hover:bg-blue-600"
                                >
                                    Login with Google
                                </button>
                            )}
                        />

                        <p className="mt-4 text-sm text-gray-400">
                            By logging in, you agree to our Terms and Conditions .
                        </p>
                    </div>
                </div>
            </GoogleOAuthProvider>
            {loading && <Loader />}
        </>
    )
}