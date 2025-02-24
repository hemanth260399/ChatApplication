import { useEffect, useState } from "react"
import { allUserApi } from "../API/userAPI"
import { useNavigate } from "react-router-dom"
import { Loader } from "./loading"

export let UserPage = () => {
    let navigate = useNavigate()
    let [user, setuser] = useState([])
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let getData = async () => {
            try {
                setLoading(true)
                let data = await allUserApi()
                setLoading(false)
                setuser(data.data)
            } catch (err) {
                setLoading(false)
                alert(err)
            }
        }
        getData()
    }, [])
    let goToChat = (data) => {
        navigate(`/chatArea?id=${data}&chat=single`)
    }
    return (
        <>
            <div className="flex flex-wrap bg-cyan-200 justify-between">
                {
                    user.length > 0 && user.map((data, index) => (
                        <div className="max-w-sm w-full rounded-lg bg-white  shadow-lg m-10 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center mt-6" key={index}>
                            <img className="w-full h-56 object-contain mt-5" src={!data.profilepic == "" ? data.profilepic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28OI96eYJ1TWj53gyYi4bGhoyvYbFEcr3Cg&s"} alt="profile" />
                            <div className="border-b-4 border-gray-400 rounded-lg position: relative w-[90%] top-7 left-5"></div>
                            <div className="p-5 bg-white ">
                                <h3 className="text-2xl font-semibold text-gray-800 m-5">{data.name}</h3>
                                <p className="text-sm text-gray-600">{data.email}</p>
                            </div>
                            <div className="p-4 bg-gray-300 text-center">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300" onClick={() => { goToChat(data._id) }}>
                                    Connect
                                </button>
                            </div>
                        </div>
                    ))
                }
                <div className="max-w-sm w-full rounded-lg shadow-lg m-10 bg-white overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
                    <img className="w-full h-56 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPozw-3YFBJefq4FpoJ1SCmRm5Yq0aslUIAw&s" alt="group" />
                    <div className="border-b-4 border-gray-400 rounded-lg position: relative w-[90%] top-7 left-5"></div>
                    <div className=" bg-white">
                        <h3 className="text-2xl font-semibold text-gray-800 m-10">Group Message</h3>
                    </div>
                    <div className="p-4 bg-gray-300 text-center">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300" onClick={() => navigate("/chatArea")}>
                            Connect
                        </button>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}