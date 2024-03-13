import { Button, Tooltip } from '@mui/material';
import styles from './home.module.scss';
import classNames from 'classnames/bind';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
    RiNumber0,
    RiNumber1,
    RiNumber2,
    RiNumber3,
    RiNumber4,
    RiNumber5,
    RiNumber6,
    RiNumber7,
    RiNumber8,
    RiNumber9,
} from 'react-icons/ri';
import { BsDashLg } from 'react-icons/bs';
import MusicItem from './MusicItem';
import Slider from 'react-slick';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';
import banner1 from '../../assets/banner/banner1.jpg';
import banner2 from '../../assets/banner/banner2.jpg';
import banner3 from '../../assets/banner/banner3.jpg';
import banner4 from '../../assets/banner/banner4.jpg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const cx = classNames.bind(styles);

function MultipleItems() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 4000,
    };
    return (
        <div className="slider-container">
            <Slider {...settings} autoplay={true}>
                <div>
                    <img
                        style={{ width: '320px', height: '220px', margin: '0 auto', borderRadius: '8px' }}
                        src={banner1}
                        alt=""
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ width: '320px', height: '220px', margin: '0 auto', borderRadius: '8px' }}
                        src={banner2}
                        alt=""
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ width: '320px', height: '220px', margin: '0 auto', borderRadius: '8px' }}
                        src={banner3}
                        alt=""
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ width: '320px', height: '220px', margin: '0 auto', borderRadius: '8px' }}
                        src={banner4}
                        alt=""
                    />
                </div>
            </Slider>
        </div>
    );
}

const top_music = [
    <RiNumber1 style={{ color: '#85c0d9', fontSize: '30px', fontWeight: '600' }} />,
    <RiNumber2 style={{ color: '#1db954', fontSize: '28px', fontWeight: '600' }} />,
    <RiNumber3 style={{ color: '#ac3221', fontSize: '26px', fontWeight: '600' }} />,
    <RiNumber4 style={{ fontSize: '20px' }} />,
    <RiNumber5 style={{ fontSize: '20px' }} />,
    <RiNumber6 style={{ fontSize: '20px' }} />,
    <RiNumber7 style={{ fontSize: '20px' }} />,
    <RiNumber8 style={{ fontSize: '20px' }} />,
    <RiNumber9 style={{ fontSize: '20px' }} />,
    <div style={{ fontSize: '20px' }}>
        <RiNumber1 />
        <RiNumber0 />
    </div>,
];

function Home() {
    const [lastest, setLatest] = useState(null);
    const [top, setTop] = useState(null);
    const [popular, setPopular] = useState(null);
    const [popularAlbum, setPopularAlbum] = useState(null);
    const { state, playMusic, insertAfterIdOne } = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${baseApi}/home/latest`).then((res) => {
            setLatest(res.data);
        });
        axios.get(`${baseApi}/home/top`).then((res) => {
            setTop(res.data);
        });
        axios.get(`${baseApi}/home/popular_music`).then((res) => {
            setPopular(res.data);
        });
        axios.get(`${baseApi}/home/popular_album`).then((res) => {
            setPopularAlbum(res.data);
        });
    }, []);

    const handlePlayMusicInPlaylist = (id, list) => {
        playMusic(id, list);
    };

    return (
        <>
            <div className="slider" style={{ padding: '28px 38px' }}>
                <MultipleItems />
            </div>
            <div style={{ color: 'white', padding: '28px 74px' }}>
                <div className="moi_phat_hanh" style={{ marginBottom: '20px' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', margin: '18px 0' }}>
                        Mới phát hành
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div>
                            <Button
                                size="small"
                                sx={{ borderRadius: '18px', backgroundColor: '#1db954', marginRight: '10px' }}
                                variant="contained"
                            >
                                Tất cả
                            </Button>
                            <Button
                                size="small"
                                sx={{ borderRadius: '18px', color: 'white', borderColor: 'white', marginRight: '10px' }}
                                variant="outlined"
                            >
                                Việt Nam
                            </Button>
                            <Button
                                size="small"
                                sx={{ borderRadius: '18px', color: 'white', borderColor: 'white' }}
                                variant="outlined"
                            >
                                Quốc tế
                            </Button>
                        </div>
                        <Button
                            size="small"
                            sx={{ borderRadius: '18px', color: 'white', borderColor: 'white' }}
                            variant="outlined"
                        >
                            Xem tất cả
                        </Button>
                    </div>
                    <div
                        // className={cx('abcd')}
                        style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
                    >
                        {lastest?.map((item, idx) => {
                            return (
                                <div
                                    key={item?.id + 'lastest'}
                                    style={{
                                        width: '46%',
                                        display: 'flex',
                                        backgroundColor: 'black',
                                        padding: '8px',
                                        marginTop: '10px',
                                        borderRadius: '4px',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    className={cx('wrapper-item')}
                                >
                                    <img
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '8px',
                                            marginRight: '8px',
                                        }}
                                        src={`${rootBackend}${item.image}`}
                                        alt="alt"
                                    />
                                    <div
                                        // className={cx('abcdef')}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '80%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                            onClick={() => {
                                                handlePlayMusicInPlaylist(item.id, lastest);
                                            }}
                                        >
                                            <span style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
                                                {item.name}
                                            </span>
                                            <span style={{ fontSize: '14px' }}>
                                                {item?.artist_name?.map((ele, idx) => {
                                                    const au_list = item?.artist_name[idx + 1] ? ',' : '';
                                                    return ele + au_list;
                                                })}
                                            </span>
                                        </div>
                                        <Tooltip title="Thêm vào danh sách phát">
                                            <MoreHorizIcon
                                                onClick={() => {
                                                    const newItem = item;
                                                    insertAfterIdOne(newItem);
                                                    // console.log('lastest after: ', lastest[idx]);
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bang_xep_hang" style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '26px', fontWeight: '600', margin: '18px 0' }}>Bảng xếp hạng</div>
                    <div style={{ padding: '20px 0' }}>
                        {top?.map((item, idx) => {
                            let element = top_music[idx];
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        padding: '10px',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '6%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginRight: '20px',
                                        }}
                                    >
                                        {element}
                                    </div>
                                    <div style={{ width: '8%' }}>
                                        <BsDashLg />
                                    </div>
                                    <div
                                        onClick={() => {
                                            handlePlayMusicInPlaylist(item.id, top);
                                        }}
                                        style={{ width: '45%', display: 'flex' }}
                                    >
                                        <img
                                            style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '4px',
                                                marginRight: '8px',
                                            }}
                                            src={`${rootBackend}${item.image}`}
                                            alt=""
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '16px', fontWeight: '500' }}>{item.name}</span>
                                            <span style={{ fontSize: '14px' }}>
                                                {item?.artist_name?.map((ele, idx) => {
                                                    const au_list = item?.artist_name[idx + 1] ? ',' : '';
                                                    return ele + au_list;
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ width: '25%' }}>{item?.album_name}</div>
                                    <div style={{ width: '10%' }}>
                                        <Tooltip title="Thêm vào danh sách phát">
                                            <MoreHorizIcon
                                                onClick={() => {
                                                    insertAfterIdOne(item, state['musicId']);
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bai_hat_noi_bat" style={{ marginBottom: '20px' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginBottom: '18px' }}>
                        Bài hát nổi bật
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        {popular?.map((item, idx) => {
                            // console.log('popular: ', popular);
                            return (
                                <MusicItem
                                    onClick={() => {
                                        handlePlayMusicInPlaylist(item.id, popular);
                                    }}
                                    key={idx}
                                    src={`${rootBackend}${item.image}`}
                                    name={item.name}
                                    author={item.artist_name}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="bai_hat_noi_bat" style={{ marginBottom: '20px' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', margin: '18px 0' }}>
                        Album nổi bật
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        {popularAlbum?.map((item, idx) => {
                            return (
                                <MusicItem
                                    onClick={() => {
                                        navigate(`/album/${item?.id}`);
                                    }}
                                    key={idx}
                                    src={`${rootBackend}${item.image}`}
                                    name={item.title}
                                    author={item.artist_name}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
