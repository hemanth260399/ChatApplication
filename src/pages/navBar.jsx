import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let logout = () => {
        localStorage.removeItem("userInfo", "token")
        dispatch({ type: "LOGOUT", payload: null })
        navigate("/")
    }
    return (
        <>
            <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 shadow-lg w-[100%] sticky z-[10] top-0" >
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">MyApp</div>
                    <div className="space-x-6">
                        <button className="text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105" onClick={() => { navigate("/alluser") }}>
                            Users
                        </button>
                        <button className="text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
