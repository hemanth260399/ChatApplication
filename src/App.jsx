/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/loginPage'
import { ChatPage } from './pages/chatPage'
import { Provider } from "react-redux";
import { store } from './additional/store';
import { UserPage } from './pages/userPage';
import Navbar from './pages/navBar';
function App() {
  let PrivateRouter = ({ component }) => {
    let isAuth = Boolean(localStorage.getItem("userInfo"))
    if (isAuth) {
      return component
    } else {
      return <Navigate to={"/"} />
    }
  };
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/alluser" element={<PrivateRouter component={<UserPage />} />} />
              <Route path="/chatArea" element={<PrivateRouter component={<ChatPage />} />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </Provider >
    </>
  )
}

export default App
