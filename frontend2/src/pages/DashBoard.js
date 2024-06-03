import React from 'react';
import SideBar from '../components/dashboard/SideBar'; // Import SideBar component
import { Outlet } from 'react-router-dom'; // Import Outlet component from react-router-dom
import CreateQuiz from '../components/dashboard/createquiz/CreateQuiz'; // Import CreateQuiz component
import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux
import style from './Dashboard.module.css'; // Import CSS module for styling

export default function DashBoard() {
    // Use useSelector to get deletePopup and createPopup states from the Redux store
    const { deletePopup, createPopup,editPopup } = useSelector((state) => state.popup);

    return (
        <div className={style.container}>
            {/* Render the SideBar component */}
            <SideBar />
            <div className={style.outletContainer}>
                {/* Render the nested routes components */}
                <Outlet />
            </div>
            {/* Conditionally render a background overlay if deletePopup or createPopup is true */}
            {(deletePopup || createPopup || editPopup) && (
                <div className={style.backgroundColor}></div>
            )}
            {/* Conditionally render the CreateQuiz component if createPopup is true */}
            {createPopup && <CreateQuiz />}
        </div>
    );
}
