import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Avatar, Button, Divider, InputBase, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../../context/AuthContext';

const cx = classNames.bind(styles);
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '60%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Header() {
    const { state } = useContext(AuthContext);
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log('isLogin:', localStorage.getItem('isLogin'));
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SlArrowLeft className={cx('left')} />
                <SlArrowRight className={cx('right')} style={{ marginRight: '60px' }} />
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        onChange={(e) => {
                            navigate(`/search?q=${e.target.value}`);
                        }}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ width: '380px' }}
                    />
                </Search>
            </div>
            <Stack spacing={2} direction="row" sx={{ marginRight: '18px' }}>
                {localStorage.getItem('isLogin') !== 'true' ? (
                    <>
                        {console.log('isLogin:', localStorage.getItem('isLogin'))}
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
                                navigate('/login');
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
