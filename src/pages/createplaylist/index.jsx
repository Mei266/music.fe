import { Box, Button, Modal, TextField, Tooltip } from '@mui/material';
import { CiMusicNote1 } from 'react-icons/ci';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import { BsDot, BsFillPlayCircleFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import Item from './Item';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import giphy from '../../assets/images/giphy.gif';

const cx = classNames.bind(styles);

function CreatePlayList() {
    const [musics, setMusics] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [refesh, setRefesh] = useState(0);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [heart, setHeart] = useState(null);

    const { id } = useParams();

    const inputFile = useRef();

    const navigate = useNavigate();

    const { state, playMusic } = useContext(AuthContext);

    const { indexList } = state;

    const handleClose = () => {
        setOpen(false);
        console.log('update ');
        setSelectedImage(null);
        setImage(null);
    };

    useEffect(() => {
        console.log('refesh: ', refesh);
        axios.get(`${baseApi}/playlist/${id}/suggestion`).then((res) => {
            console.log(res.data);
            setMusics(res.data);
        });
        axios.get(`${baseApi}/playlist/${id}`).then((res) => {
            console.log(res.data);
            setPlaylist(res.data);
        });
        axios.get(`${baseApi}/user/${state['userid']}/heart`).then((res) => {
            console.log(res);
            setHeart(res.data);
        });
    }, [refesh, id]);

    // useEffect(() => {
    //     axios.get(`${baseApi}/user/${state['userid']}/`).then((res) => {
    //         console.log(res.data.hearts);
    //         setIds(res.data.hearts);
    //     });
    // }, [refeshHeart]);

    const addMusicToPlaylist = (musicId) => {
        axios
            .put(`${baseApi}/playlist/${id}/add`, { music_id: musicId })
            .then((res) => {
                console.log('Add music: ', res.data);
                // setPlaylist(res.data);
                setRefesh(refesh + 1);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const removeMusicToPlaylist = (musicId) => {
        let formData = new FormData();
        formData.append('music_id', musicId);
        axios.put(`${baseApi}/playlist/${id}/remove`, formData).then((res) => {
            console.log('Add music: ', res.data);
            // setPlaylist(res.data);
            setRefesh(refesh + 1);
        });
    };
    const handleSearch = (e) => {
        const search_text = e.target.value;
        axios.post(`${baseApi}/playlist/${id}/search`, { search_text: search_text }).then((res) => {
            setMusics(res.data);
        });
    };

    const handleHeart = (id) => {
        axios.put(`${baseApi}/music/${id}/heart`).then((res) => {
            setRefesh(refesh + 1);
        });
    };

    const handleAddHeart = (musicid) => {
        axios.post(`${baseApi}/heart`, { user: state['userid'], music: musicid }).then((res) => {
            // setRefeshHeart(refeshHeart + 1);
            setRefesh(refesh + 1);
        });
    };

    const handleRemoveHeart = (musicid) => {
        axios.post(`${baseApi}/heart/delete`, { user: state['userid'], music: musicid }).then((res) => {
            // setRefeshHeart(refeshHeart + 1);
            setRefesh(refesh + 1);
        });
    };

    const handleDelete = () => {
        axios.delete(`${baseApi}/playlist/${id}`).then((res) => {
            navigate('/playlist');
        });
    };

    const handleUpdate = () => {
        const formData = new FormData();
        if (title) formData.append('title', title);
        else formData.append('title', null);
        if (image) formData.append('image', image);
        else formData.append('image', null);
        if (description) formData.append('description', description);
        else formData.append('description', null);
        console.log(image);
        axios
            .put(`${baseApi}/playlist/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setRefesh(refesh + 1);
                setOpen(false);
            });
    };

    // Hàm xử lý khi người dùng chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);

        // Kiểm tra nếu có tệp được chọn
        if (file) {
            setImage(file);
            console.log(image);
            const reader = new FileReader();

            reader.onload = (e) => {
                // Khi đọc xong ảnh, cập nhật state với ảnh đã chọn
                setSelectedImage(e.target.result);
            };

            // Đọc nội dung của tệp hình ảnh
            reader.readAsDataURL(file);
        }
    };

    const handlePlayMusicInPlaylist = (id) => {
        playMusic(id, playlist?.music_list);
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
                    {playlist?.image ? (
                        <img
                            style={{ width: 200, height: 200, borderRadius: '4px' }}
                            src={`${rootBackend}${playlist?.image}`}
                            alt=""
                        />
                    ) : (
                        <CiMusicNote1 style={{ width: '50px', height: '50px' }} />
                    )}
                </Box>
                <Box marginTop={'auto'} display={'flex'} flexDirection={'column'}>
                    <span style={{ fontSize: '20px' }}>Playlist</span>
                    <Tooltip title={playlist?.description} placement="right">
                        <span style={{ fontSize: '40px', fontWeight: '800', margin: '20px 0', cursor: 'pointer' }}>
                            {playlist?.title}
                        </span>
                    </Tooltip>
                    <Box display={'flex'} alignItems={'center'}>
                        <span style={{ fontSize: '24px', fontWeight: '600' }}>{playlist?.author_name}</span>
                        <BsDot />
                        <span style={{ fontSize: '24px', fontWeight: '600', marginRight: '8px' }}>
                            {playlist?.music_list?.length} bài
                        </span>
                        <BiPencil
                            onClick={() => {
                                setOpen(true);
                            }}
                            style={{
                                width: '24px',
                                height: '24px',
                                color: '#ccc',
                                cursor: 'pointer',
                                marginRight: '4px',
                            }}
                        />
                        <BsDot />
                        <MdDelete
                            onClick={handleDelete}
                            style={{ width: '24px', height: '24px', marginLeft: '0 8px', cursor: 'pointer' }}
                        />
                    </Box>
                </Box>
            </Box>
            <div className={cx('display')}>
                <BsFillPlayCircleFill className={cx('display-icon')} />
            </div>
            {playlist?.music_list?.length === 0 ? (
                ''
            ) : (
                <>
                    <Box width={'calc(100% - 40px)'} display={'flex'} marginLeft={'40px'}>
                        <Box width={'5%'} textAlign={'center'}>
                            #
                        </Box>
                        <Box width={'35%'}>Title</Box>
                        <Box width={'25%'} textAlign={'center'}>
                            Album
                        </Box>
                        <Box width={'20%'} textAlign={'center'}>
                            Yêu thích
                        </Box>
                        <Box width={'15%'} textAlign={'center'}>
                            Lựa chọn
                        </Box>
                    </Box>
                    <hr style={{ width: 'calc(100% - 40px)', margin: '16px 0 14px 40px' }} />
                </>
            )}
            <Box marginLeft={'40px'} width={'100%'}>
                {playlist?.music_list?.map((item, idx) => {
                    return (
                        <Box
                            key={idx}
                            width={'calc(100% - 40px)'}
                            display={'flex'}
                            alignItems={'center'}
                            margin={'10px 0'}
                            borderRadius={'4px'}
                            sx={{ '&:hover': { backgroundColor: '#202020' }, cursor: 'pointer' }}
                        >
                            <Box width={'5%'} textAlign={'center'}>
                                {indexList === item.id ? (
                                    <img src={giphy} alt="" style={{ width: '40px', height: '40px' }} />
                                ) : (
                                    idx + 1
                                )}
                            </Box>
                            <Box
                                width={'35%'}
                                display={'flex'}
                                alignItems={'center'}
                                onClick={() => {
                                    handlePlayMusicInPlaylist(item.id);
                                }}
                            >
                                <Box width={44} height={44} margin={'4px 10px'}>
                                    {/* <BsFillImageFill style={{ width: '44px', height: '44px' }} /> */}
                                    <img
                                        style={{ width: '44px', height: '44px', borderRadius: '4px' }}
                                        src={`${rootBackend}${item.image}`}
                                        alt="#"
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} marginLeft={2}>
                                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{item.name}</span>
                                    <span>
                                        {item?.artist_name?.map((ele, idx) => {
                                            const au_list = item?.artist_name[idx + 1] ? ',' : ' ';
                                            return ele + au_list;
                                        })}
                                    </span>
                                </Box>
                            </Box>
                            <Box width={'25%'} textAlign={'center'}>
                                {item?.album_name}
                            </Box>
                            <Box
                                width={'20%'}
                                textAlign={'center'}
                                sx={{ '&:hover': { color: '#f26398' } }}
                                // onClick={() => {
                                //     handleHeart(item.id);
                                // }}
                            >
                                {heart?.find((ele) => ele.id === item.id) ? (
                                    <AiFillHeart
                                        onClick={() => {
                                            handleRemoveHeart(item.id);
                                        }}
                                        color="#f26398"
                                        className={cx('icon-delete')}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        onClick={() => {
                                            handleAddHeart(item.id);
                                        }}
                                        className={cx('icon-delete')}
                                    />
                                )}
                            </Box>
                            <Box width={'15%'} textAlign={'center'} sx={{ '&:hover': { color: 'red' } }}>
                                <AiOutlineDelete
                                    onClick={() => removeMusicToPlaylist(item.id)}
                                    className={cx('icon-delete')}
                                />
                            </Box>
                        </Box>
                    );
                })}
            </Box>
            <div className={cx('search-wrapper')}>
                <AiOutlineSearch sx={{ fontSize: '24px' }} className={cx('search-icon')} />
                <input
                    className={cx('search-input')}
                    onChange={(e) => {
                        handleSearch(e);
                    }}
                    type="text"
                    placeholder="Tìm kiếm bài hát"
                />
            </div>
            <Box margin={'20px 0 0 30px'} width={'100%'} display={'flex'} flexWrap={'wrap'}>
                {musics.map((item, idx) => {
                    return <Item props={{ ...item, onClick: () => addMusicToPlaylist(item.id) }} key={idx} />;
                })}
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
                            width={200}
                            sx={{ backgroundColor: '#181818', cursor: 'pointer' }}
                            height={200}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            margin={'0px 20px 0 20px'}
                            borderRadius={'4px'}
                            onClick={() => {
                                inputFile.current.click();
                            }}
                        >
                            {selectedImage ? (
                                <img src={selectedImage} style={{ width: '100%', height: '100%' }} alt="" />
                            ) : playlist?.image ? (
                                <img
                                    style={{ width: 200, height: 200, borderRadius: '4px' }}
                                    src={`${rootBackend}${playlist?.image}`}
                                    alt=""
                                />
                            ) : (
                                <CiMusicNote1 style={{ width: '50px', height: '50px' }} />
                            )}
                        </Box>
                        <Box width={'50%'}>
                            <TextField
                                sx={{ width: '88%' }}
                                label="Tiêu đề"
                                defaultValue={playlist?.title}
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
                                    setTitle(e.target.value);
                                }}
                            />
                            <TextField
                                label="Mô tả"
                                defaultValue={playlist?.description}
                                // placeholder="nhập mô tả ..."
                                multiline
                                rows={4}
                                sx={{ marginTop: '18px', width: '88%' }}
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
                                    setDescription(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ float: 'right', margin: '0 10px 10px 0' }}>
                        {/* <Button variant="text" sx={{ color: 'red', marginRight: '10px', textTransform: 'none' }}>
                            Xóa
                        </Button> */}
                        <Button onClick={handleUpdate} variant="contained" sx={{ textTransform: 'none' }}>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <input
                type="file"
                onChange={handleImageChange}
                ref={inputFile}
                style={{ display: 'none' }}
                accept="image/*"
            />
        </Box>
    );
}

export default CreatePlayList;
