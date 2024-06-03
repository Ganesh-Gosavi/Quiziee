import React from 'react';
import style from './Sidebar.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import  {sideBarLinks} from '../../data/dashboard-link'
import { setToken } from '../../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast"
import { setCreatePopup } from '../../slices/popupSlice'
export default function Sidebar() {

  // Array containing sidebar links for navigation
  const sideBarLinks = [
    {
      id: 1,
      path: "/dashboard",
      name: "Dashboard"
    },
    {
      id: 2,
      path: "/dashboard/quizzes",
      name: "Analytics"
    },
    {
      id: 3,
      name: "Create Quiz"
    }
  ];


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createPopup } = useSelector((state) => state.popup)
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    toast.success("Logout successfully")
    navigate("/");
  }
  const onClickHandler = (event) => {
    dispatch(setCreatePopup(true));
  };
  const location = useLocation();

  const matchDashboard = (path) => {
    return path === location.pathname;
  }

  const matchAnalytics = () => {
    return location?.pathname.split("/")[2] === "quizzes"
  }
  return (
    <div className={style.container}>
      <h2 className={style.heading}>QUIZZIE</h2>
      <div className={style.buttonContainer} >
        <NavLink key={sideBarLinks[0].id} to={sideBarLinks[0].path} >
          <button className={`${style.button} ${(matchDashboard(sideBarLinks[0].path) && createPopup === false) && style.active}`} >
            {sideBarLinks[0].name}
          </button>
        </NavLink>
        <NavLink key={sideBarLinks[1].id} to={sideBarLinks[1].path}>
          <button className={`${style.button} ${(matchAnalytics(sideBarLinks[1].path) && createPopup === false) && style.active}`} >
            {sideBarLinks[1].name}
          </button>
        </NavLink>
        <button className={`${style.button} ${createPopup && style.active}`} onClick={onClickHandler}>
          {sideBarLinks[2].name}
        </button>

      </div>
      <div className={style.logoutContainer}>
        <div className={style.border}></div>
        <button className={style.logoutButton} onClick={logoutHandler}>LOGOUT</button>
      </div>
    </div>
  );
}
