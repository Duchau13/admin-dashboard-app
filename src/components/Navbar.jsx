import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import Button from 'react-bootstrap/Button';
import classes from "./style/Navbar.module.css"
import { useNavigate } from 'react-router-dom';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const NavbarLogin = () => {
  const navigate = useNavigate()
  const { currentColor,
    activeMenu, 
    setActiveMenu,
    handleClick,
    isClicked, 
    setScreenSize,
    screenSize } = useStateContext();
  const token =  localStorage.getItem('token')
  const username = localStorage.getItem('user_name')
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const handleLogout = () => {
    localStorage.clear()
    navigate("/createOrder")
  }
  return (
    // <div>Navbar</div>
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {username}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        <button className={classes["log-out"]} onClick={handleLogout}>Đăng xuất</button>

        {isClicked.cart && (<Cart />)}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
        </div>
    </div>
  )
}
const Login = () => {
  const navigate = useNavigate()
  const { currentColor,
    activeMenu, 
    setActiveMenu, } = useStateContext();
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return(
  <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
    <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
        <div className="flex">
          <button className={classes["login-button"]} onClick={() => navigate("/login")}>Đăng Nhập  </button>
        </div>
  </div>
  )
}
const Navbar = () => {
  const token = localStorage.getItem('token')
  useEffect(() => {
    console.log("chay lai")
  },)
  return(
    <div>
      {!token ? <Login/> : <NavbarLogin/>}
    </div>
  )
}

export default Navbar