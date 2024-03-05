import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { GiLoveSong } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { BsMusicNoteList } from 'react-icons/bs';
import { BsToggleOff, BsToggleOn, BsHeartFill } from 'react-icons/bs';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import imageMusic from '../../assets/images/music.png';
import Chip from '@mui/material/Chip';

import NavbarItem from './NavbarItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';

const cx = classNames.bind(styles);

// document.body.classList.toggle('colorful');

function Navbar() {
    const { state, inGift } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(true);
    const [artists, setArtists] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseApi}/user/${state['userid']}/follow`).then((res) => {
            setArtists(res.data);
        });
    }, []);
    const addDarkMode = useCallback(() => {
        document.body.classList.toggle('light-mode');
        setDarkMode(true);
    });

    const removeDarkMode = useCallback(() => {
        document.body.classList.toggle('light-mode');
        setDarkMode(false);
    }, []);

    const createPlaylist = () => {
        if (state['userid'])
            axios.post(`${baseApi}/user/${state['userid']}/playlist`).then((res) => {
                navigate(`/playlist/${res.data.id}`);
            });
        else {
            navigate('/login');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {darkMode ? (
                    <GiLoveSong className={cx('header-icon-dark-mode')} />
                ) : (
                    <img className={cx('header-icon')} src={imageMusic} alt="#"></img>
                )}
                <span>Music</span>
            </div>
            <div className={cx('first-row')}>
                <div
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <NavbarItem text="Trang chủ">
                        <AiFillHome className={cx('icon')} />
                    </NavbarItem>
                </div>
            </div>
            <div className={cx('second-row')}>
                <div
                    onClick={() => {
                        navigate('/heart');
                    }}
                >
                    <NavbarItem text="Bài hát yêu thích">
                        <BsHeartFill className={cx('icon')} />
                    </NavbarItem>
                </div>

                <NavbarItem text="Dark Mode">
                    {darkMode ? (
                        <BsToggleOn className={cx('icon')} onClick={removeDarkMode} />
                    ) : (
                        <BsToggleOff className={cx('icon')} onClick={addDarkMode} />
                    )}
                </NavbarItem>
                <Chip
                    label="Thư viện"
                    sx={{ color: 'white', margin: '10px 0 0 20px' }}
                    component="a"
                    href="#basic-chip"
                    variant="outlined"
                    clickable
                />
                <div onClick={createPlaylist}>
                    <NavbarItem text="Tạo playlist">
                        <MdAdd className={cx('icon')} />
                    </NavbarItem>
                </div>
                <div
                    onClick={() => {
                        if (state['userid']) navigate('/playlist');
                        else navigate('/login');
                    }}
                >
                    <NavbarItem text="List playlist">
                        <BsMusicNoteList className={cx('icon')} />
                    </NavbarItem>
                </div>
            </div>
            {state['userid'] ? (
                <div>
                    <Chip
                        label="Nghệ sĩ"
                        sx={{ color: 'white', margin: '10px 0 0 20px' }}
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                    <div className={cx('abc')} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {artists?.map((item, idx) => {
                            return (
                                <NavbarItem
                                    onClick={() => {
                                        navigate(`/artist/${item?.id}`);
                                    }}
                                    key={idx}
                                    text={item?.name}
                                >
                                    <img
                                        style={{ width: '28px', height: '28px', borderRadius: '4px' }}
                                        src={`${rootBackend}${item?.image}`}
                                        alt=""
                                    />
                                </NavbarItem>
                            );
                        })}
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Navbar;
