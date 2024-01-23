import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/images/icon.png';
import background from '../../assets/images/background.jpg';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { Chip, TextField } from '@mui/material';
import axios from 'axios';
import { baseApi } from '../../constant';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [step2, setStep2] = useState(localStorage.getItem('acept'));
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();
    const { login, state } = useContext(AuthContext);

    const handleSubmit = () => {
        if (step2) {
            console.log('step2');
            axios
                .post(`${baseApi}/token/`, { username: username, password: password })
                .then(() => {
                    login(localStorage.getItem('userid'));
                    localStorage.setItem('isLogin', true);
                    navigate('/home');
                })
                .catch(() => {
                    setError(true);
                    setErrorMessage('Mật khẩu sai');
                });
        } else {
            axios
                .post(`${baseApi}/login/username`, { username: username })
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem('userid', res.data.userid);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('acept', res.data.acept);
                    setUsername(res.data.username);
                    setStep2(true);
                    setError(false);
                    setErrorMessage('');
                })
                .catch((err) => {
                    console.log(err.response?.data);
                    setError(true);
                    setErrorMessage(err.response?.data?.message);
                });
        }
    };

    return (
        <div className={cx('wrapper')}>
            {console.log(step2, username)}
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="#"></img>
            </div>
            <div className={cx('login-wrapper')}>
                <div className={cx('login')}>
                    <div className={cx('login-header')}>
                        <img className={cx('tuy-luyp-icon')} src={icon} alt="#"></img>
                    </div>
                    <div className={cx('login-header-text')}>
                        <span style={{ fontSize: '24px', fontWeight: '600', margin: '10px 0' }}>Đăng nhập</span>
                        {step2 ? <Chip label={username} variant="outlined" /> : ''}
                    </div>
                    <div className={cx('login-item')}>
                        {step2 ? (
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
                        ) : (
                            <TextField
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                error={error}
                                value={username}
                                sx={{ width: '100%' }}
                                label="Username"
                                variant="outlined"
                            />
                        )}
                        <span style={{ marginTop: '4px', fontSize: '14px', color: 'red' }}>{errorMessage}</span>
                        <span
                            onClick={() => {
                                navigate('/register');
                            }}
                            style={{ marginLeft: 'auto', color: 'blue', fontSize: '14px', cursor: 'pointer' }}
                        >
                            Đăng ký
                        </span>
                    </div>
                    <button className={cx('login-submit')} onClick={handleSubmit}>
                        <AiFillHeart className={cx('icon')} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
