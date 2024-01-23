import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Avatar, Button, Divider, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

const cx = classNames.bind(styles);

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <SlArrowLeft className={cx('left')} />
                <SlArrowRight className={cx('right')} />
            </div>
            <Stack spacing={2} direction="row" sx={{ marginRight: '14px' }}>
                {localStorage.getItem('isLogin') === true ? (
                    <>
                        <Button
                            variant="text"
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            Sign up
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Login
                        </Button>
                    </>
                ) : (
                    <Avatar alt="user" sx={{ cursor: 'pointer' }} onClick={handleClick}>
                        <FaUser />
                    </Avatar>
                )}
            </Stack>
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
                <MenuItem
                    onClick={() => {
                        navigate('/user/profile');
                        handleClose();
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    My account
                    <ListItemIcon>
                        <HiOutlineExternalLink style={{ marginLeft: 'auto' }} />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        localStorage.clear();
                        handleClose();
                        navigate('/');
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Header;
