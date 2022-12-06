import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

const NavLink = tw.a`
  text-lg my-0 lg:text-sm lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-0 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

const config = require('../TFCConfig.json')

export default function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    return (
        <>
            <Box >
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src={props.url} sx={{ width: 48, height: 48 }} ></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem onClick={() => { navigate('/profile'); }}>
                    <NavLink>
                        Profile
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={() => { navigate("/subscription") }} >
                    <NavLink>
                        My Subscription
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={() => { navigate("/add-payment-method") }}>
                    <NavLink>
                        Payment Method
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={() => { alert("shithole") }}>
                    <NavLink>
                        Payment History
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={() => { navigate('/change-password') }}>
                    <NavLink>
                        Change Password
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                }}>
                    <NavLink>
                        Logout
                    </NavLink>
                </MenuItem>
            </Menu>
        </>
    );
}