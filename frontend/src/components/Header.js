import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

import { BREAKPOINTS } from "../hooks/isMobileScreen";

import isMobileScreen from "../hooks/isMobileScreen";

import logo from "../../src/BACKYARD-BBQ.svg";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "../css/Header.css";
import NavigationBar from "./NavigationBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const dispatch = useDispatch();
  const device = isMobileScreen();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <a href='/'>
            <img
              src={logo}
              alt='BACKYARD BBQ RESTAURANT'
              className='navbar-logo'
            />
          </a>
          {device < BREAKPOINTS.tablet && (
            <button
              className='navbar-toggle'
              onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
          )}
        </div>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {userInfo ? (
            <div className='dropdown'>
              <button className='dropdown-toggle'>{userInfo.name}</button>
              <div className='dropdown-menu'>
                <a href='/profile'>Profile</a>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            </div>
          ) : (
            <a className='link' href='/login'>
              <span className='icon'>
                {" "}
                <PersonIcon fontSize='small' /> SIGN IN{" "}
              </span>
            </a>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className='dropdown'>
              <button
                className='dropdown-toggle'
                onClick={() => setAdminOpen(!adminOpen)}>
                ADMIN
              </button>
              <div className={`dropdown-menu ${adminOpen ? "open" : ""}`}>
                <a href='/admin/userlist'>Users</a>
                <a href='/admin/productlist'>Products</a>
                <a href='/admin/orderlist'>Orders</a>
                <a href='/admin/inventorylist'>Expenses</a>
                <a href='/admin/receiptlist'>Receipts</a>
                <a href='/admin/salarylist'>Salaries</a>
                <a href='/admin/recipelist'>Recipes</a>
                <a href='/admin/inventorylevellist'>Inventory Levels</a>
                <a href='/admin/billlist'>Bill Payable / Receivable</a>
                <a href='/admin/financialsummary'>Financial Summary</a>
              </div>
            </div>
          )}

          <a className='link' href='/cart'>
            <span className='icon'>
              {" "}
              <ShoppingCartIcon className='icon' fontSize='small' /> CART
            </span>
          </a>
        </div>
      </nav>
      <NavigationBar />
    </>
  );
};

export default Header;
