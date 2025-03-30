import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

import isMobileScreen from "../hooks/isMobileScreen";

import logo from "../../src/BACKYARD-BBQ.svg";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useHistory } from "react-router-dom";

import styles from "../css/Header.module.css";

import NavigationBar from "./NavigationBar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const adminPages = [
  { title: "Users", link: "/admin/userlist" },
  { title: "Product List", link: "/admin/productlist" },
  { title: "Create Product", link: "/admin/product/create" },
  { title: "Order", link: "/admin/orderlist" },
  { title: "Expenses", link: "/admin/inventorylist" },
  { title: "Receipts", link: "/admin/receiptlist" },
  { title: "Salaries", link: "/admin/salarylist" },
  { title: "Recipes", link: "/admin/recipelist" },
  { title: "Inventory Levels", link: "/admin/inventorylevellist" },
  { title: "Bills Payable/Receivable", link: "/admin/billlist" },
  { title: "Financial Summary", link: "/admin/financialsummary" },
];

const pages = [
  { title: "Products", link: "/products" },
  { title: "Cart", link: "/cart" },
];

const settings = [
  { title: "Profile" },
  { title: "Account" },
  { title: "Dashboard" },
  { title: "Logout" },
];

const Header = () => {
  const device = isMobileScreen();

  const history = useHistory();

  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pageLink) => {
    if (pageLink) {
      history.push(pageLink);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (pageLink) => {
    if (pageLink) {
      history.push(pageLink);
    }
    setAnchorElUser(null);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isAdmin = userInfo?.isAdmin ?? null;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#062233" }} position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {device > 900 && (
              <a href='/'>
                <img
                  src={logo}
                  alt='BACKYARD BBQ RESTAURANT'
                  className={styles.navbarLogo}
                />
              </a>
            )}

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}>
                {pages.map((page) => {
                  const { title, link } = page;
                  return title === "Cart" && device > 400 ? null : (
                    <MenuItem
                      key={title}
                      onClick={() => handleCloseNavMenu(link)}>
                      <Typography sx={{ textAlign: "center" }}>
                        {title}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => {
                const { title, link } = page;
                return title === "Cart" ? null : (
                  <Button
                    key={title - idx}
                    onClick={() => handleCloseNavMenu(link)}
                    sx={{ my: 2, color: "white", display: "block" }}>
                    {title}
                  </Button>
                );
              })}
            </Box>

            {device < 900 && (
              <a className={styles.navbarLink} href='/'>
                <img
                  src={logo}
                  alt='BACKYARD BBQ RESTAURANT'
                  className={styles.navbarLogo}
                />
              </a>
            )}

            {/* {device > 400 && (
              <Box sx={{ marginRight: "1rem" }}>
                <a className='link' href='/cart'>
                  <span className='icon'>
                    <ShoppingCartIcon className='icon' fontSize='small' /> CART
                  </span>
                </a>
              </Box>
            )} */}
            <Box sx={{ flexGrow: 0 }}>
              {userInfo?.name[0] && (
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <div className={styles.profile}>
                      {userInfo?.name[0]?.toUpperCase()}
                    </div>
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {(isAdmin ? adminPages : settings).map((setting) => {
                  const { title, link } = setting;
                  return (
                    <MenuItem
                      key={title}
                      onClick={() => handleCloseUserMenu(link)}>
                      {title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <NavigationBar /> */}
    </>
  );
};

export default Header;
