import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxMixerHorizontal } from 'react-icons/rx';
import { IoPlayBack, IoPlayForward } from 'react-icons/io5';
import { BsFillPlayCircleFill, BsPauseCircleFill, BsFillHeartFill, BsFillBalloonFill } from 'react-icons/bs';
import { RiRepeatLine } from 'react-icons/ri';
import { BiVolumeLow } from 'react-icons/bi';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReactAudioPlayer from 'react-audio-player';
import Bupple from './Bupple';
import { rootBackend } from '../../constant';

const cx = classNames.bind(styles);

const $ = document.querySelector.bind(document);

function Footer() {
    const { state, addBupple, removeBupple, setMusicId, setIndexList } = useContext(AuthContext);
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

    // const musics = getData(state['isAnh']);
    const currentMusic = useRef();
    useEffect(() => {
        const progressValue1 = $('.' + cx('progress-bar'));
        progressValue1.addEventListener('click', (e) => {
            const rect = progressValue1.getBoundingClientRect();
            const percentProgress = parseFloat(((e.pageX - rect.left) / progressValue1.offsetWidth) * 100);
            const seconds = currentMusic.current.audioEl.current.duration;
            currentMusic.current.audioEl.current.currentTime = (percentProgress * seconds) / 100;
            setProgressValue(`${percentProgress}%`);
        });
        const progressVolume1 = $('.' + cx('progress-bar-volume'));
        progressVolume1.addEventListener('click', (e) => {
            const rect = progressVolume1.getBoundingClientRect();
            const percentProgress = parseFloat((e.pageX - rect.left) / progressVolume1.offsetWidth);
            setProgressVolume(percentProgress);
        });
    }, []);

    useEffect(() => {
        // axios.get(`${baseApi}/music/${musicId}`).then((res) => {
        //     console.log(res);
        //     setMusic(res.data);
        //     setId(res.data.id);
        // });
        const idx = musics?.findIndex((item) => item.id === musicId);
        setIndex(idx);
        setMusic(musics[idx]);
        setIndexList(idx);
    }, [musicId]);

    useEffect(() => {
        setMusic(musics[index]);
        // musicId = musics[index]?.id;
        // setMusicId(musics[index]?.id);
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

    const handleAddHeart = () => {
        // Music.heart = true;
        // setIsheart(true);
    };

    const handleRemoveHeart = () => {
        // Music.heart = false;
        // setIsheart(false);
    };

    const next = () => {
        // axios.get(`${baseApi}/music/next/${id}`).then((res) => {
        //     setMusic(res.data);
        //     setId(res.data.id);
        // });
        console.log('next');
        if (index === musics.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        setIsPlay(true);
    };

    const prev = () => {
        // axios.get(`${baseApi}/music/prev/${id}`).then((res) => {
        //     setMusic(res.data);
        //     setId(res.data.id);
        // });
        if (index === 0) setIndex(musics.length - 1);
        else setIndex(index - 1);
        setIsPlay(true);
    };

    const autoPlay = () => {
        // axios.get(`${baseApi}/music/random/${id}`).then((res) => {
        //     setMusic(res.data);
        //     setId(res.data.id);
        // });
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * musics.length);
        } while (randomNumber === 1);
        setIndex(randomNumber);
    };

    const handleRepeat = () => {
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

    return (
        <div className={cx('wrapper')}>
            {state['isBupple'] ? <Bupple /> : ''}
            <div className={cx('column-1')}>
                <div className={cx('music-img')}>
                    <img src={state['isPlay'] ? `${rootBackend}/${Music?.image}` : null} alt="#"></img>
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
                    {Music?.heart ? (
                        <BsFillHeartFill className={cx('music-heart-icon')} onClick={handleRemoveHeart} />
                    ) : (
                        <AiOutlineHeart className={cx('music-heart-icon-outline')} onClick={handleAddHeart} />
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
                        <div className={cx('progress-bar')}>
                            <div style={{ width: progressValue }} className={cx('progress-bar__value')}></div>
                        </div>
                    </div>
                    <span>{timeMusic}</span>
                </div>
            </div>
            <div className={cx('column-3')}>
                <BsFillBalloonFill className={cx('icon-m', state['isBupple'] ? 'bupple' : '')} onClick={handleBupple} />
                <BiVolumeLow className={cx('icon-s')} />
                <div className={cx('progress-bar-wraper-volume')}>
                    <div className={cx('progress-bar-volume')}>
                        <div style={{ width: `${progressVolume * 100}%` }} className={cx('progress-bar__value')}></div>
                    </div>
                </div>
            </div>
            <ReactAudioPlayer
                ref={currentMusic}
                className={cx('hide')}
                id="audio-player"
                // src={state['musicId'] ? Music?.audio : null}
                src={Music?.audio ? `${rootBackend}/${Music?.audio}` : null}
                autoPlay
                controls
                onLoadedMetadata={handleTimeMusic}
                onListen={curentTime}
                listenInterval={1000}
                volume={progressVolume}
                onEnded={isRepeat ? repeatMusic : isRandom ? autoPlay : next}
            />
        </div>
    );
}

export default Footer;
