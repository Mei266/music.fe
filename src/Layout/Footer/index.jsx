import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxMixerHorizontal } from 'react-icons/rx';
import { IoPlayBack, IoPlayForward } from 'react-icons/io5';
import {
    BsFillPlayCircleFill,
    BsPauseCircleFill,
    BsFillHeartFill,
    BsFillBalloonFill,
    BsClockFill,
} from 'react-icons/bs';
import { RiRepeatLine } from 'react-icons/ri';
import { BiVolumeLow } from 'react-icons/bi';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReactAudioPlayer from 'react-audio-player';
import Bupple from './Bupple';
import { baseApi, rootBackend } from '../../constant';
import axios from 'axios';
import { BsMusicNoteList } from 'react-icons/bs';
import { Button, Drawer } from '@mui/material';
import image from '../../assets/artist/hoangdung.jpg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineLyrics } from 'react-icons/md';

const cx = classNames.bind(styles);

const $ = document.querySelector.bind(document);

function Footer() {
    const { state, addBupple, removeBupple, removeMusicsInQueue, setIndexList } = useContext(AuthContext);
    const { musicId, musics } = state;
    const [isPlay, setIsPlay] = useState(true);
    const [timeMusic, setTimeMusic] = useState('');
    const [curentTimeMusic, setCurentTimeMusic] = useState('0:00');
    const [progressValue, setProgressValue] = useState('0%');
    const [progressVolume, setProgressVolume] = useState(1.0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [Music, setMusic] = useState(null);
    const [isRandom, setIsRandom] = useState(null);
    const [index, setIndex] = useState(null);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [nextMusics, setNextMusics] = useState(null);
    const [heart, setHeart] = useState(null);
    const [refesh, setRefesh] = useState(0);
    const [refeshMusicsInQueue, setRefeshMusicsInQueue] = useState(0);

    useEffect(() => {
        axios.get(`${baseApi}/user/${state['userid']}/heart`).then((res) => {
            console.log(res);
            setHeart(res.data);
        });
    }, [refesh]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleDrawer1 = (newOpen) => () => {
        setOpen1(newOpen);
    };

    const currentMusic = useRef();
    const progressBar = useRef();
    const progressBarVolume = useRef();

    const handleChangeProgressBar = (e) => {
        // console.log(progressBar.current.getBoundingClientRect());
        console.log('handleChangeProgressBar');
        const percentProgress = parseFloat(
            ((e.pageX - progressBar.current.getBoundingClientRect().left) / progressBar.current.offsetWidth) * 100,
        );
        const seconds = currentMusic.current.audioEl.current.duration;
        currentMusic.current.audioEl.current.currentTime = (percentProgress * seconds) / 100;
        console.log('handleChangeProgressBar-end');
        setProgressValue(() => `${percentProgress}%`);
        console.log('handleChangeProgressBar-end');
    };

    const handleChangeProgressBarVolume = (e) => {
        const percentProgress = parseFloat(
            (e.pageX - progressBarVolume.current.getBoundingClientRect().left) / progressBarVolume.current.offsetWidth,
        );
        setProgressVolume(percentProgress);
    };

    useEffect(() => {
        const idx = musics?.findIndex((item) => item.id === musicId);
        setIndex(idx);
        setMusic(musics[idx]);
        setIndexList(idx);
    }, [musicId]);

    useEffect(() => {
        setMusic(musics[index]);
        setIndexList(musics[index]?.id);
    }, [index]);

    const handleTimeMusic = () => {
        const seconds = currentMusic.current.audioEl.current.duration;
        const minute = Math.floor(seconds / 60);
        const second = Math.floor(seconds % 60);
        if (second < 10) setTimeMusic(minute + ':0' + second);
        else setTimeMusic(minute + ':' + second);
    };

    const play = useCallback(() => {
        setIsPlay(true);
        currentMusic.current.audioEl.current.play();
    }, []);

    const curentTime = () => {
        const secondsCurrent = currentMusic.current.audioEl.current.currentTime;
        const seconds = currentMusic.current.audioEl.current.duration;
        const minuteCurrent = Math.floor(secondsCurrent / 60);
        const secondCurrent = Math.floor(secondsCurrent % 60);
        const percentprogress = (secondsCurrent / seconds) * 100;
        setProgressValue(`${percentprogress}%`);
        if (secondCurrent < 10) setCurentTimeMusic(minuteCurrent + ':0' + secondCurrent);
        else setCurentTimeMusic(minuteCurrent + ':' + secondCurrent);
    };

    const pause = useCallback(() => {
        setIsPlay(false);
        currentMusic.current.audioEl.current.pause();
    });

    const handleAddHeart = (musicid) => {
        console.log(state['userid'], musicid);
        if (state['userid'])
            axios.post(`${baseApi}/heart`, { user: state['userid'], music: musicid }).then((res) => {
                setRefesh(refesh + 1);
            });
    };

    const handleRemoveHeart = (musicid) => {
        if (state['userid'])
            axios.post(`${baseApi}/heart/delete`, { user: state['userid'], music: musicid }).then((res) => {
                setRefesh(refesh + 1);
            });
    };

    const next = () => {
        console.log('next');
        handleIncrease();
        if (index === musics.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        setIsPlay(true);
    };

    const prev = () => {
        if (index === 0) setIndex(musics.length - 1);
        else setIndex(index - 1);
        setIsPlay(true);
    };

    const autoPlay = () => {
        handleIncrease();
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * musics.length);
        } while (randomNumber === 1);
        setIndex(randomNumber);
    };

    const handleRepeat = () => {
        handleIncrease();
        if (isRepeat) setIsRepeat(false);
        else setIsRepeat(true);
    };

    const repeatMusic = () => {
        currentMusic.current.audioEl.current.play();
    };

    const handleBupple = () => {
        if (state['isBupple']) removeBupple();
        else addBupple();
    };

    const handleRandom = () => {
        if (isRandom) setIsRandom(false);
        else setIsRandom(true);
    };

    const handleIncrease = () => {
        axios.put(`${baseApi}/music/${musicId}/increase`).then(() => {
            console.log('sucess');
        });
    };

    function filterArrayAfterIdOne(arr, id) {
        const index = arr.findIndex((item) => item.id === id);
        if (index === -1) {
            return []; // Trả về mảng rỗng nếu không tìm thấy phần tử có id là 1
        }
        return arr.filter((item, i) => i > index); // Lọc ra các phần tử sau phần tử có id là 1
    }

    useEffect(() => {
        const tmp = filterArrayAfterIdOne(musics, Music?.id);
        console.log(tmp);
        setNextMusics(tmp);
    }, [Music, musics, refeshMusicsInQueue]);

    return (
        <>
            <div className={cx('wrapper')}>
                {state['isBupple'] ? <Bupple /> : ''}
                <div className={cx('column-1')}>
                    <div className={cx('music-img')}>
                        <img src={state['isPlay'] ? `${rootBackend}${Music?.image}` : null} alt="#"></img>
                    </div>
                    <div className={cx('music-info')}>
                        <div className={cx('music-info-name')}>
                            <span>{Music ? Music?.name : ''}</span>
                        </div>
                        <div className={cx('music-info-author')}>
                            <span>{Music ? Music?.artist_name : ''}</span>
                        </div>
                    </div>
                    <div className={cx('music-heart')}>
                        {heart?.find((ele) => ele.id === Music.id) ? (
                            <BsFillHeartFill
                                className={cx('music-heart-icon')}
                                onClick={() => handleRemoveHeart(Music?.id)}
                            />
                        ) : (
                            <AiOutlineHeart
                                className={cx('music-heart-icon-outline')}
                                onClick={() => handleAddHeart(Music?.id)}
                            />
                        )}
                    </div>
                </div>
                <div className={cx('column-2')}>
                    <div className={cx('column-2-header')}>
                        <RxMixerHorizontal className={cx('icon', isRandom ? 'random' : '')} onClick={handleRandom} />
                        <IoPlayBack className={cx('icon', 'icon-prev')} onClick={prev} />
                        {!isPlay ? (
                            <BsFillPlayCircleFill onClick={play} className={cx('icon', 'icon-play')} />
                        ) : (
                            <BsPauseCircleFill onClick={pause} className={cx('icon', 'icon-play')} />
                        )}
                        <IoPlayForward className={cx('icon', 'icon-next')} onClick={next} />
                        <RiRepeatLine
                            className={cx('icon', 'icon-repeat', isRepeat ? 'repeat' : '')}
                            onClick={handleRepeat}
                        />
                    </div>
                    <div className={cx('column-2-body')}>
                        <span>{curentTimeMusic}</span>
                        <div className={cx('progress-bar-wraper')}>
                            <div
                                className={cx('progress-bar')}
                                ref={progressBar}
                                onClick={(e) => handleChangeProgressBar(e)}
                            >
                                <div style={{ width: progressValue }} className={cx('progress-bar__value')}></div>
                            </div>
                        </div>
                        <span>{timeMusic}</span>
                    </div>
                </div>
                <div className={cx('column-3')}>
                    {/* <BsFillBalloonFill
                        className={cx('icon-m', state['isBupple'] ? 'bupple' : '')}
                        onClick={handleBupple}
                    /> */}
                    <MdOutlineLyrics
                        onClick={toggleDrawer1(true)}
                        className={cx('icon-s')}
                        style={{ marginRight: '8px' }}
                    />
                    <Drawer
                        PaperProps={{
                            style: { height: 'calc(100vh - 104px)', backgroundColor: '#120822', padding: '12px' },
                        }}
                        anchor={'top'}
                        open={open1}
                        onClose={toggleDrawer1(false)}
                        ModalProps={{
                            BackdropProps: {
                                invisible: true, // Tắt backdrop để màn hình không bị đen
                            },
                        }}
                    >
                        <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {Music?.lyric.split('\n')?.map((item, idx) => {
                                return (
                                    <span style={{ fontSize: '18px', margin: '4px' }} key={idx}>
                                        {item}
                                    </span>
                                );
                            })}
                        </div>
                    </Drawer>
                    <BiVolumeLow className={cx('icon-s')} />
                    <div className={cx('progress-bar-wraper-volume')}>
                        <div
                            className={cx('progress-bar-volume')}
                            ref={progressBarVolume}
                            onClick={(e) => handleChangeProgressBarVolume(e)}
                        >
                            <div
                                style={{ width: `${progressVolume * 100}%` }}
                                className={cx('progress-bar__value')}
                            ></div>
                        </div>
                    </div>
                    <BsMusicNoteList
                        className={cx('icon-s')}
                        style={{ marginLeft: '24px' }}
                        onClick={toggleDrawer(true)}
                    />
                    <Drawer
                        PaperProps={{
                            style: { height: 'calc(100vh - 104px)', backgroundColor: '#120822', padding: '12px' },
                        }}
                        anchor={'right'}
                        open={open}
                        onClose={toggleDrawer(false)}
                        ModalProps={{
                            BackdropProps: {
                                invisible: true, // Tắt backdrop để màn hình không bị đen
                            },
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 0 18px 0',
                                }}
                            >
                                <Button
                                    size="small"
                                    sx={{
                                        borderRadius: '18px',
                                        color: 'white',
                                        borderColor: 'white',
                                        marginRight: '10px',
                                        width: '48%',
                                    }}
                                    variant="outlined"
                                >
                                    Danh sách phát
                                </Button>
                                <BsClockFill
                                    style={{ color: 'white', marginRight: '10px', width: '18px', height: '18px' }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '300px',
                                    padding: '8px',
                                    backgroundColor: '#9b4de0',
                                    borderRadius: '6px',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ display: 'flex', width: '200px' }}>
                                    <img
                                        style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                                        src={`${rootBackend}${Music?.image}`}
                                        alt=""
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8px' }}>
                                        <span>{Music?.name}</span>
                                        <span>
                                            {Music?.artist_name?.map((ele, idx) => {
                                                const au_list = Music?.artist_name[idx + 1] ? ',' : ' ';
                                                return ele + au_list;
                                            })}
                                        </span>
                                    </div>
                                </div>
                                {heart?.find((ele) => ele.id === Music.id) ? (
                                    <BsFillHeartFill
                                        className={cx('music-heart-icon')}
                                        onClick={() => handleRemoveHeart(Music?.id)}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        className={cx('music-heart-icon-outline')}
                                        onClick={() => handleAddHeart(Music?.id)}
                                    />
                                )}
                                {/* <CiHeart style={{ width: '24px', height: '24px' }} /> */}
                                <MoreHorizIcon />
                            </div>
                            <div style={{ color: 'white', margin: '8px 0 10px 0' }}>Tiếp theo</div>
                            <div className={cx('abc')} style={{ overflowY: 'auto', maxHeight: '468px' }}>
                                {nextMusics?.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                width: '300px',
                                                padding: '8px',
                                                // backgroundColor: '#ad98c0',
                                                borderRadius: '6px',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                color: 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <div style={{ display: 'flex', width: '200px' }}>
                                                <img
                                                    style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                                                    src={`${rootBackend}${item?.image}`}
                                                    alt=""
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        marginLeft: '8px',
                                                    }}
                                                >
                                                    <span>{item?.name}</span>
                                                    <span>
                                                        {item?.artist_name?.map((ele, idx) => {
                                                            const au_list = item?.artist_name[idx + 1] ? ',' : ' ';
                                                            return ele + au_list;
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            {heart?.find((ele) => ele.id === item?.id) ? (
                                                <BsFillHeartFill
                                                    className={cx('music-heart-icon')}
                                                    onClick={() => handleRemoveHeart(item?.id)}
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    className={cx('music-heart-icon-outline')}
                                                    onClick={() => handleAddHeart(item?.id)}
                                                />
                                            )}
                                            {/* <CiHeart style={{ width: '24px', height: '24px' }} /> */}
                                            <MoreHorizIcon
                                                onClick={() => {
                                                    removeMusicsInQueue(item);
                                                    setRefeshMusicsInQueue(refeshMusicsInQueue + 1);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Drawer>
                </div>
                <ReactAudioPlayer
                    ref={currentMusic}
                    className={cx('hide')}
                    id="audio-player"
                    // src={state['musicId'] ? Music?.audio : null}
                    src={Music?.audio ? `${rootBackend}${Music?.audio}` : null}
                    autoPlay
                    controls
                    onLoadedMetadata={handleTimeMusic}
                    onListen={curentTime}
                    listenInterval={1000}
                    volume={progressVolume}
                    onEnded={isRepeat ? repeatMusic : isRandom ? autoPlay : next}
                />
            </div>
        </>
    );
}

export default Footer;
