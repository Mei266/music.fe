import { Avatar, Box, Button } from '@mui/material';
import image from '../../assets/artist/hoangdung.jpg';
import { FaPlayCircle } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';
import { useParams } from 'react-router-dom';

function Album() {
    const [album, setAlbum] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseApi}/album/${id}`).then((res) => {
            console.log(res.data[0]);
            setAlbum(res.data[0]);
        });
    }, []);

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
                    <span>
                        {album?.music_list?.reduce((accumulator, currentValue) => {
                            return accumulator + parseInt(currentValue.number_listens);
                        }, 0)}{' '}
                        lượt nghe
                    </span>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaPlayCircle style={{ margin: '0 34px 0 38px', width: '40px', height: '40px', color: '#1ed760' }} />
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
                            key={idx}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 38px 6px 0',
                                margin: '10px 0',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ width: '8%', textAlign: 'center' }}>{idx + 1}</div>
                            <div style={{ width: '10%' }}>
                                <img
                                    style={{ width: '38px', height: '38px', borderRadius: '6px' }}
                                    src={`${rootBackend}${item?.image}`}
                                    alt="image"
                                />
                            </div>
                            <div style={{ width: '30%' }}>{item?.name}</div>
                            <div style={{ width: '30%', textAlign: 'center' }}>{item?.number_listens}</div>
                            <div style={{ width: '8%' }}>
                                <CiHeart style={{ width: '24px', height: '24px' }} />
                            </div>
                            <div style={{ width: '8%' }}>{item?.duration}</div>
                            <div style={{ width: '8%' }}>
                                <BsThreeDots />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Album;
