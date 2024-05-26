import { Avatar, Box, Tooltip } from '@mui/material';
import { FaPlayCircle } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { BsDot } from 'react-icons/bs';

function Album() {
    const [album, setAlbum] = useState(null);
    const [heart, setHeart] = useState(null);
    const [refesh, setRefesh] = useState(0);
    const { playMusic, insertAfterIdOne, state } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseApi}/album/${id}`).then((res) => {
            console.log(res.data[0]);
            setAlbum(res.data[0]);
        });
    }, []);

    const handlePlayMusicInPlaylist = (id, list) => {
        playMusic(id, list);
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

    useEffect(() => {
        axios.get(`${baseApi}/user/${state['userid']}/heart`).then((res) => {
            console.log(res);
            setHeart(res.data);
        });
    }, [refesh]);

    console.log('album: ', album);
    return (
        <div style={{ color: 'white' }}>
            <div style={{ height: '280px', display: 'flex', alignItems: 'center' }}>
                <Avatar
                    sx={{ width: '208px', height: '208px', margin: '0 38px' }}
                    alt="Album"
                    src={`${rootBackend}${album?.image}`}
                />
                <div>
                    <h1 style={{ fontSize: '48px' }}>{album?.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>{album?.artist_name[0]}</span>
                        <BsDot />
                        <span>
                            {album?.music_list?.reduce((accumulator, currentValue) => {
                                return accumulator + parseInt(currentValue.number_listens);
                            }, 0)}{' '}
                            lượt nghe
                        </span>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaPlayCircle
                    onClick={() => {
                        handlePlayMusicInPlaylist(album?.music_list[0].id, album?.music_list);
                    }}
                    style={{
                        margin: '0 34px 0 38px',
                        width: '40px',
                        height: '40px',
                        color: '#1ed760',
                        cursor: 'pointer',
                    }}
                />
                <BsThreeDots style={{ width: '34px', height: '34px' }} />
            </div>
            <div style={{ padding: '0 38px' }}>
                <div style={{ fontSize: '30px', fontWeight: '600', margin: '28px 0' }}>Danh sách bài hát</div>
                <Box display={'flex'} padding={'6px 38px 6px 0'}>
                    <Box width={'8%'} textAlign={'center'}>
                        #
                    </Box>
                    <Box width={'10%'}></Box>
                    <Box width={'30%'}>Tên</Box>
                    <Box width={'30%'} textAlign={'center'}>
                        Lượt nghe
                    </Box>
                    <Box width={'8%'}></Box>
                    <Box width={'8%'}></Box>
                    <Box width={'8%'}></Box>
                </Box>
                {album?.music_list?.map((item, idx) => {
                    return (
                        <div
                            key={idx + 101}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 38px 6px 0',
                                margin: '10px 0',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ width: '8%', textAlign: 'center' }}>{idx + 1}</div>
                            <div
                                style={{ width: '10%' }}
                                onClick={() => {
                                    handlePlayMusicInPlaylist(item?.id, album?.music_list);
                                }}
                            >
                                <img
                                    style={{ width: '38px', height: '38px', borderRadius: '6px' }}
                                    src={`${rootBackend}${item?.image}`}
                                    alt="image"
                                />
                            </div>
                            <div style={{ width: '30%' }}>{item?.name}</div>
                            <div style={{ width: '30%', textAlign: 'center' }}>{item?.number_listens}</div>
                            <div style={{ width: '8%' }}>
                                {heart?.find((ele) => ele.id === item.id) ? (
                                    <AiFillHeart
                                        onClick={() => {
                                            handleRemoveHeart(item.id);
                                        }}
                                        color="#f26398"
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        onClick={() => {
                                            handleAddHeart(item.id);
                                        }}
                                    />
                                )}
                            </div>
                            <div style={{ width: '8%' }}>{item?.duration}</div>
                            <div style={{ width: '8%' }}>
                                <Tooltip title="Thêm vào danh sách phát" color="white">
                                    <MoreHorizIcon
                                        onClick={() => {
                                            insertAfterIdOne(item);
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Album;
