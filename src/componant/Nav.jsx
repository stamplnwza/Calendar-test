import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../assets/logo.png';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white),
  border: '1px solid #E5E5E5',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '260px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
    '&::placeholder': {
      color: 'gray',
      opacity: 1,
    },
    '&:focus': {
    color: 'black', // เปลี่ยนสีฟอนต์เมื่อโฟกัส
    }
  },
}));

export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"sx={{ backgroundColor: 'white' }}>
        <Toolbar>
            {/* ปุ่ม Hamburger */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 ,color: 'black' }}
          >
            <MenuIcon />
          </IconButton>

          {/* โลโก้ + ชื่อบริษัท 2 บรรทัด */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            {/* เปลี่ยน src เป็นโลโก้ของคุณ */}
            <img
             src={logo}
             alt=""
              style={{ width: 50, marginRight: 8 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
                ระบบบริหารจัดการคดี
              </Typography>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                (version 1.0)
              </Typography>
            </Box>
          </Box>

          {/* ช่องค้นหา (Search) ไอคอนอยู่ด้านขวา */}
          <Search>
          <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="ค้นหาคดีง่ายๆ ใส่ชื่อ/ตัวเลขคดี"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* ดันด้านซ้ายให้กินพื้นที่ที่เหลือ เพื่อเลื่อนของด้านขวาไปสุด */}
          <Box sx={{ flexGrow: 1 }} />
          {/* ไอคอน Notifications */}
          <Box sx={{ display: { xs: 'none', md: 'flex' },color: 'black' }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            </Box>
            
            {/* โปรไฟล์ + ชื่อผู้ใช้ 2 บรรทัด + ปุ่ม dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
            //   onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            {/* ชื่อผู้ใช้ 2 บรรทัด*/}
            {/* ปรับเพิ่มระยะห่างด้านซ้าย (ml) เพื่อเว้นช่องว่างจากไอคอนโปรไฟล์ */}
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Worrawut Dachoo
              </Typography>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                Prosecutor (Thailand)
              </Typography>
            </Box>

            {/* ปุ่ม dropdown */}
            <IconButton
              size="small"
              aria-label="dropdown"
              onClick={handleProfileMenuOpen}
              sx={{ color: 'black' }}
              >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>

          
          {/* เมนูสำหรับหน้าจอเล็ก (Mobile) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
