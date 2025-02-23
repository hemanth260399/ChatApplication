import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { allChatAPI } from "../API/LoginAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SingleChatApi } from "../API/userAPI";
let socket = io("http://localhost:7777/chatbox")
export let ChatPage = () => {
    let navigate = useNavigate()
    let [params] = useSearchParams()
    const messageEndRef = useRef(null);
    const userdata = useSelector((state) => state.ReduxData)
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const handleSendMessage = (chatType) => {
        if (inputMessage.trim()) {
            if (params.get("chat") === "single") {
                socket.emit('newmessage', { userPerson1: userdata.userInfo._id, userPerson2: params.get("id"), chatText: inputMessage, time: new Date(), chat: chatType })
                setMessages([...messages, { chatText: inputMessage, email: userdata.userInfo.email, time: new Date() }]);
                setInputMessage('');
            } else {
                socket.emit('newmessage', { chatText: inputMessage, email: userdata.userInfo.email, time: new Date() });
                setMessages([...messages, { chatText: inputMessage, email: userdata.userInfo.email, time: new Date() }]);
                setInputMessage('');
            }
        }
    };
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(() => {
        if (params.get("chat") === "single") {
            let singleData = async () => {
                try {
                    let response = await SingleChatApi({ data: { personId1: params.get("id"), personId2: userdata.userInfo._id } })
                    setMessages(response.data)
                } catch (err) {
                    alert(err)
                }
            }
            singleData()
            socket.on('singleupdate', (data) => {
                setMessages(data);
            });
        } else {
            let getAllData = async () => {
                try {
                    let response = await allChatAPI()
                    setMessages(response.data)
                } catch (err) {
                    alert(err)
                }
            }
            getAllData()
            socket.on('update', (data) => {
                setMessages(data);
            });
        }
        return () => {
            socket.off('update');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="h-[92vh] flex justify-center items-start bg-cyan-100">
                <div className="w-full flex flex-col max-w-lg bg-white shadow-lg rounded-lg mt-5">
                    <div className="flex justify-evenly items-center text-light bg-blue-600 w-[100%] h-15 ">
                        <h1 className="text-2xl font-bold text-gray-800 text-white">Welcome to the Chat App!</h1>
                        <button className="bg-gray-500 text-white p-2 rounded-r-lg transition hover:scale-105" onClick={() => { navigate("/alluser") }}>Exit Chat</button>
                    </div>
                    <div className="chat-window h-[520px]  overflow-y-auto p-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col  ${msg.email === userdata.userInfo.email ? "items-end" : "align-start"}`}>
                                <div
                                    key={index}
                                    className={`p-3 my-2 rounded-lg ${msg.email === userdata.userInfo.email
                                        ? 'bg-blue-100  rounded-tl-none max-w-[50%] '
                                        : 'bg-gray-100 rounded-tr-none max-w-[50%]'
                                        } transition duration-300 ease-in-out transform hover:scale-105`}
                                >
                                    <p
                                        className={`font-bold text-xs ${msg.email === userdata.userInfo.email ? 'text-blue-600' : 'text-gray-800'
                                            }`}
                                    >
                                        {msg.email}
                                    </p>
                                    <p className="text-md">{msg.chatText}</p>
                                    <p className="flex justify-end text-sm">{msg.chatTime ? msg.chatTime.slice(11, 16) : ""}</p>
                                </div>
                                <div ref={messageEndRef}></div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={() => handleSendMessage(params.get("chat"))}
                            className="bg-blue-500 text-white p-2 rounded-r-lg transition hover:scale-105"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}