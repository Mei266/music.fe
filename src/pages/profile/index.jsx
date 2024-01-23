import { Box, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { baseApi, rootBackend } from '../../constant';

function Profile() {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [user, setUser] = useState(0);
    const [name, setName] = useState(null);

    const { state } = useContext(AuthContext);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        axios.get(`${baseApi}/user/${state['userid']}/`).then((res) => {
            console.log(res);
            setUser(res.data);
        });
        axios.get(`${baseApi}/playlist/count/${state['userid']}`).then((res) => {
            console.log(res);
            setCount(res.data.count);
        });
    }, []);

    const handleUpdate = () => {
        axios.put(`${baseApi}/user/${state['userid']}/update`, { name: name }).then((res) => {
            res.data.image = `${rootBackend}/${res.data.image}`;
            setUser(res.data);
            console.log(user);
            setOpen(false);
        });
    };

    return (
        <Box color={'white'} width={'calc(94%)'} paddingBottom={10}>
            <Box display={'flex'} margin={'20px'}>
                <Box
                    width={200}
                    sx={{ backgroundColor: '#282828' }}
                    height={200}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    margin={'20px 20px 0 20px'}
                >
                    {user?.image ? (
                        <img style={{ width: 200, height: 200 }} src={user?.image} alt="" />
                    ) : (
                        <FaUser style={{ width: '50px', height: '50px' }} />
                    )}
                </Box>
                <Box marginTop={'auto'} display={'flex'} flexDirection={'column'}>
                    <span style={{ fontSize: '20px' }}>profile</span>
                    <Box sx={{ margin: '20px 0' }}>
                        <span style={{ fontSize: '40px', fontWeight: '800', marginRight: '8px' }}>{user.name}</span>
                        <BiPencil style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleOpen} />
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                        <span style={{ fontSize: '24px', fontWeight: '600', marginRight: '8px' }}>
                            {count} public playlists
                        </span>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
            >
                <Box sx={{ backgroundColor: '#282828', width: '480px', borderRadius: '4px' }}>
                    <Box display={'flex'} justifyContent={'space-between'} marginTop={'10px'} alignItems={'center'}>
                        <span style={{ fontSize: '22px', fontWeight: '600', marginLeft: '10px' }}>Chỉnh sửa</span>
                        <Box
                            marginRight={'10px'}
                            sx={{
                                // padding: '2px',
                                borderRadius: '50%',
                                '&:hover': { backgroundColor: '#383838' },
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                            }}
                            onClick={handleClose}
                        >
                            <AiOutlineClose style={{ width: '24px' }} />
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        width={'100%'}
                        alignItems={'center'}
                        margin={'20px 0'}
                    >
                        <Box
                            width={160}
                            sx={{ backgroundColor: '#181818', cursor: 'pointer', borderRadius: '50%' }}
                            height={160}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            margin={'0px 20px 0 20px'}
                            borderRadius={'4px'}
                        >
                            {user?.image ? (
                                <img
                                    style={{ width: 160, height: 160, borderRadius: '50%' }}
                                    src={user?.image}
                                    alt=""
                                />
                            ) : (
                                <FaUser style={{ width: '50px', height: '50px' }} />
                            )}
                        </Box>
                        <Box width={'50%'}>
                            <TextField
                                sx={{ width: '88%' }}
                                label="Tên"
                                defaultValue={user?.name}
                                value={name}
                                inputProps={{
                                    style: {
                                        color: 'white',
                                    },
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: 'white',
                                    },
                                }}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ float: 'right', margin: '0 10px 10px 0' }}>
                        <Button onClick={handleUpdate} variant="contained" sx={{ textTransform: 'none' }}>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default Profile;
