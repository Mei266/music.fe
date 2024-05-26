import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/images/icon.jpg';
import background from '../../assets/images/background.jpg';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { Chip, TextField } from '@mui/material';
import axios from 'axios';
import { baseApi } from '../../constant';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

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
                    navigate('/');
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

    const checkGmail = (username) => {
        axios
            .post(`${baseApi}/login/username`, { username: username })
            .then((res) => {
                console.log(res);
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const responseMessage = (response) => {
        console.log(response.credential);
        const profile = jwtDecode(response.credential);
        console.log('profile: ', profile);

        axios
            .post(`${baseApi}/login/username`, { username: profile?.email })
            .then((res) => {
                console.log(res);
                const check = res.data;
                if (check.acept) {
                    localStorage.setItem('userid', check.userid);
                    localStorage.setItem('username', check.username);
                    localStorage.setItem('image', profile.picture);
                    localStorage.setItem('isLogin', true);
                    login(localStorage.getItem('userid'));
                    navigate('/');
                } else {
                    var ngayHienTai = new Date();
                    const data = {
                        username: profile.email,
                        password: '23092001',
                    };
                    axios.post(`${baseApi}/user/register`, data).then((res) => {
                        localStorage.setItem('userid', res.data.id);
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('image', profile.picture);
                        login(localStorage.getItem('userid'));
                        localStorage.setItem('isLogin', true);
                        navigate('/');
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        console.log('logout');
        googleLogout();
    };
    const handleErrorMessage = (error) => {
        console.log(error);
    };

    return (
        <div className={cx('wrapper')}>
            {console.log(step2, username)}
            {/* <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="#"></img>
            </div> */}
            <div className={cx('login-wrapper')}>
                <div className={cx('login')}>
                    <div className={cx('login-header')}>
                        <img className={cx('tuy-luyp-icon')} src={icon} alt="#"></img>
                    </div>
                    <div className={cx('login-header-text')}>
                        <span style={{ fontSize: '24px', fontWeight: '600', margin: '10px 0' }}>Đăng nhập</span>
                        {step2 ? (
                            <Chip
                                label={username}
                                variant="outlined"
                                sx={{
                                    color: 'white', // Màu văn bản
                                    backgroundColor: 'transparent', // Đặt nền trong suốt (hoặc tùy chỉnh màu nền)
                                    borderColor: 'white', // Màu viền (nếu cần)
                                    '& .MuiChip-deleteIcon': {
                                        color: 'white', // Màu biểu tượng xóa (nếu có)
                                    },
                                }}
                                onDelete={() => {
                                    setStep2(false);
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={cx('login-item')}>
                        {step2 ? (
                            <TextField
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-input': {
                                        color: 'white', // Màu văn bản
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Màu viền
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white', // Màu của label
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'white',
                                    },
                                }}
                                value={password}
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
                                // sx={{ width: '100%' }}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-input': {
                                        color: 'white', // Màu văn bản
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Màu viền
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white', // Màu của label
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'white',
                                    },
                                }}
                                color="success"
                                label="Username"
                                variant="outlined"
                            />
                        )}
                        <span style={{ marginTop: '4px', fontSize: '14px', color: 'red' }}>{errorMessage}</span>
                        <span
                            onClick={() => {
                                navigate('/register');
                            }}
                            style={{
                                marginLeft: 'auto',
                                color: 'blue',
                                fontSize: '14px',
                                cursor: 'pointer',
                                color: 'white',
                                fontWeight: '600',
                                textDecoration: 'underline',
                            }}
                        >
                            Đăng ký
                        </span>
                    </div>
                    <button
                        className={cx('login-submit')}
                        style={{ color: 'black', backgroundColor: '#1DB954' }}
                        onClick={handleSubmit}
                    >
                        {/* <AiFillHeart className={cx('icon')} /> */}
                        <span style={{ fontSize: '16px', fontWeight: '500' }}>Tiếp theo</span>
                    </button>
                    <div style={{ margin: '10px 0 20px 0' }}>
                        <GoogleLogin onSuccess={responseMessage} onError={handleErrorMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
