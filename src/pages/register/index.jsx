import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/images/icon.png';
import background from '../../assets/images/background.jpg';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { TextField } from '@mui/material';
import axios from 'axios';
import { baseApi } from '../../constant';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();
    const { login, state } = useContext(AuthContext);

    const handleSubmit = () => {
        axios
            .post(`${baseApi}/user/register`, { username: username, password: password })
            .then((res) => {
                localStorage.setItem('userid', res.data.userid);
                localStorage.setItem('username', res.data.username);
                login(localStorage.getItem('userid'));
                localStorage.setItem('isLogin', true);
                navigate('/');
            })
            .catch((err) => {
                setError(true);
                setErrorMessage(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="#"></img>
            </div>
            <div className={cx('login-wrapper')}>
                <div className={cx('login')}>
                    <div className={cx('login-header')}>
                        <img className={cx('tuy-luyp-icon')} src={icon} alt="#"></img>
                    </div>
                    <div className={cx('login-header-text')}>
                        <span style={{ fontSize: '24px', fontWeight: '600', margin: '10px 0' }}>Đăng ký</span>
                    </div>
                    <div className={cx('login-item')}>
                        <TextField
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            error={error}
                            value={username}
                            sx={{ width: '100%', marginBottom: '18px' }}
                            label="Username"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            sx={{ width: '100%' }}
                            label="Password"
                            variant="outlined"
                            type="password"
                        />
                        <span style={{ marginTop: '4px', fontSize: '14px', color: 'red' }}>{errorMessage}</span>
                        {/* {error ? (
                            <div className={cx('error-noti-wrapper')}>
                                <ImSad2 className={cx('error-icon')} />
                            </div>
                        ) : (
                            ''
                        )} */}
                    </div>
                    <button className={cx('login-submit')} onClick={handleSubmit}>
                        <AiFillHeart className={cx('icon')} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
