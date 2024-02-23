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
import RabbitLyrics from 'rabbit-lyrics';

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
    const [lyric, setLyric] = useState(null);
    const [isRandom, setIsRandom] = useState(null);
    const [index, setIndex] = useState(null);

    const currentMusic = useRef();
    const progressBar = useRef();
    const progressBarVolume = useRef();

    const handleChangeProgressBar = (e) => {
        // console.log(progressBar.current.getBoundingClientRect());
        const percentProgress = parseFloat(
            ((e.pageX - progressBar.current.getBoundingClientRect().left) / progressBar.current.offsetWidth) * 100,
        );
        const seconds = currentMusic.current.audioEl.current.duration;
        currentMusic.current.audioEl.current.currentTime = (percentProgress * seconds) / 100;
        setProgressValue(`${percentProgress}%`);
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

    const handleAddHeart = () => {};

    const handleRemoveHeart = () => {};

    const next = () => {
        console.log('next');
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
    // useEffect(() => {
    //     new RabbitLyrics({
    //         element: document.getElementById('lyrics-1'),
    //         mediaElement: document.getElementById('audio-player'),
    //     });
    // }, []);
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
                    <BsFillBalloonFill
                        className={cx('icon-m', state['isBupple'] ? 'bupple' : '')}
                        onClick={handleBupple}
                    />
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
            <div
                // id="lyrics-1"
                // class="rabbit-lyrics"
                // data-media="#audio-player"
                style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: '100px',
                    backgroundColor: 'red',
                    position: 'fixed',
                    zIndex: '1000',
                }}
            >
                {/* <div id>{Music?.lyric}</div> */}
                {/* [00:27.00] Nếu lúc đó em không buông tay
                [00:30.00] Nếu lúc đó anh không lung lay
                [00:34.00] Nếu lúc đó ta không trốn chạy
                [00:37.00] Không giấu những thứ không muốn nhau thấy (oh, yeah)
                [00:41.00] Nếu lúc đó mình đặt lên nhau
                [00:44.00] Nụ hôn đắm đuối như thể lần đầu
                [00:47.00] Nếu lúc đó mình đừng giả vờ (nếu lúc đó mình đừng giả vờ)
                [00:51.00] Vờ như mọi thứ không làm mình đau, oh-oh-oh-oh
                [00:54.00] Nếu lúc đó thế giới đừng quá ác độc với hai đứa nhóc
                [00:57.00] Không thể cho phép mình yếu lòng vì quá quen việc phải gai góc
                [01:01.00] Những vết cắt chưa lành được rồi lại gồng mình, chẳng còn biết khóc
                [01:04.00] Và nếu em không, và nếu em không (nếu em không)
                [01:08.00] Và nếu lúc đó em không ám ảnh một ngày anh sẽ biến mất
                [01:12.00] Và nếu lúc đó anh cho em thấy em luôn là người duy nhất
                [01:15.00] Và nếu lúc đó mà em tin anh, mà anh tin em, mà ta tin nhau
                [01:21.00] Liệu mình sẽ còn ở bên nhau? (Ở bên nhau)
                [01:24.00] Liệu mình sẽ còn ở bên nhau? (Ở bên nhau)
                [01:28.00] Cười mỗi khi nghe thấy tên nhau (thấy tên nhau)
                [01:31.00] Liệu mình đang còn đắm say, đắm say
                [01:35.00] Như ngày đầu tiên mình đến bên nhau?
                [01:38.00] Ngày em đã thức hàng đêm để nguyện cầu
                [01:41.00] Ngày em tự hứa dù có thế nào, em sẽ vẫn yêu anh, yeah
                [01:48.00] Liệu mình còn yêu?
                [01:49.00] Nếu lúc đó ta không buông tay, yeah, yeah
                [01:56.00] Nếu lúc đó ta không trốn chạy, huh-oh
                [02:03.00] Và nếu lúc đó mình đừng như thế, yeah
                [02:10.00] Có lẽ, có lẽ
                [02:15.00] Nhưng có lẽ mọi thứ đã phải diễn ra như vậy để em thấy em phải yêu mình
                [02:22.00] Đã đến lúc em phải nhận ra em đã luôn tự lừa dối con tim
                [02:26.00] Vì nếu anh muốn, anh đã tìm cách, nhưng anh chẳng hề gì, yeah
                [02:30.00] Em ghét cái cách em luôn bào chữa cho mọi lần anh vô tâm
                [02:34.00] Em ghét cái cách em nói em vẫn ok khi em tủi hờn
                [02:37.00] Ghét dư luận tàn nhẫn, ghét nghĩ đến anh nhiều quá mức
                [02:40.00] Ghét việc phải giữ im lặng, tỏ ra mình không vướng bận
                [02:43.00] Nhưng em cũng không ít lần gây ra những lỗi lầm, thứ lỗi cho em
                [02:47.00] Hứa với anh những điều giờ chỉ là ảo mộng, thứ lỗi cho em
                [02:51.00] Bước đi vì em phải cần tự chữa lành mình, thứ lỗi cho em
                [02:54.00] Cho phép mình nhận tình yêu mới đến rồi, thứ lỗi cho em
                [02:58.00] Tập chịu trách nhiệm cho cảm xúc của mình, thứ lỗi cho em
                [03:01.00] Trân trọng những gì em đang có, yeah, thứ lỗi cho em, yeah
                [03:07.00] Em mong anh cũng vậy
                [03:10.00] Để một ngày mình sẽ lại đến bên nhau
                [03:14.00] Một ngày mình sẽ lại đến bên nhau
                [03:17.00] Cười khi bắt gặp ánh mắt nhau (gặp ánh mắt nhau)
                [03:21.00] Dù mình sẽ không còn đắm say, đắm say
                [03:24.00] Như ngày đầu tiên mình đến bên nhau, oh
                [03:27.00] Nhưng mình có thể làm quen lại từ đầu
                [03:31.00] Chẳng còn một nỗi sợ hãi hay nghi ngờ nào nữa đâu
                [03:38.00] Anh thấy sao? (Thấy sao?)
                [03:41.00] Anh thấy sao? (Thấy sao?)
                [03:45.00] Anh nghĩ sao? (Nghĩ sao?)
                [03:48.00] Anh nghĩ sao? (Nghĩ sao?) */}

                <audio id="audio-1" controls="">
                    <source src="https://example.com/audio.ogg" type="audio/ogg" />
                    <source src="https://example.com/audio.mp3" type="audio/mpeg" />
                </audio>
                <div class="rabbit-lyrics" data-media="#audio-1">
                    [00:00.00] 谁のことを考えてるの? <br />
                    [00:03.10] ハートのスペース争夺戦 <br />
                    [00:05.76] 戦况的に 一进一退で <br />
                    [00:10.56] 油断ならないな <br />
                    [00:11.70] あのね 今のとこ ほんの数％しか <br />
                    [00:16.73] アイツの心に 居场所がないんだ <br />
                    [00:21.38] <br />
                    [00:21.51] 制服のポケット <br />
                    [00:24.05] ホンネを忍ばせて <br />
                    [00:26.71] そっと えりを正す <br />
                    [00:31.71] そんな简単には <br />
                    [00:34.38] 手の内 明かせない <br />
                    [00:36.90] あくまでまだ 様子见の段阶 <br />
                    [00:41.81] <br />
                    [00:42.01] だけど本当はね <br />
                    [00:44.59] 见破って欲しいの <br />
                    [00:47.25] 淡い期待に胸 ときめかして
                    <br />
                    [00:51.74] チラチラと见てる
                    <br />
                    [00:54.97]
                    <br />
                    [00:56.09] オンナノコの大事なモノ(意地悪で)
                    <br />
                    [00:58.73] オトコノコの大事なコト(ムカつく)
                    <br />
                    [01:01.53] 引くに引けない それぞれの事情
                    <br />
                    [01:06.26] ほかに何も考えらんない(真っ直ぐで)
                    <br />
                    [01:09.03] 一瞬だって よそ见できない(ニブいね)
                    <br />
                    [01:11.68] 充実感 あふれるほどに
                    <br />
                    [01:16.25] 満たしてあげるよ
                    <br />
                    [01:17.32] 条件ちらつかせ 様子うかがって见てる
                    <br />
                    [01:22.50] お互いWin-Winな トリヒキしようよ <br />
                    [01:27.20] <br />
                    [01:27.33] 魔法少女だって <br />
                    [01:29.87] 地底の民だって
                    <br />
                    [01:32.60] 悩むとこは同じ
                    <br />
                    [01:37.71] 异星の姫だって
                    <br />
                    [01:40.13] オバケの少女だって
                    <br />
                    [01:42.71] ドキドキして みんな恋をする
                    <br />
                    [01:47.99] 好きなタイプだとか
                    <br />
                    [01:50.51] 理想の告白を
                    <br />
                    [01:53.21] 思い描いた时
                    <br />
                    [01:55.66] 谁の颜が浮かんできちゃうの?!
                    <br />
                    [02:01.82] 突然 チカラ涌いてきたり(不思议だよ)
                    <br />
                    [02:04.46] ホロリ 优しさが染みたり(なぜなの)
                    <br />
                    [02:07.15] それは全部 谁のせいかな
                    <br />
                    [02:12.04] ライバルには负けたくない(それなのに)
                    <br />
                    [02:14.74] だけどアイツには胜てない(なぜなの)
                    <br />
                    [02:17.47] それってちょっと问题あるけど
                    <br />
                    [02:22.15] もう手遅れだね
                    <br />
                    [02:25.56]
                    <br />
                    [02:45.74] オンナノコの大事なモノ(意地悪で)
                    <br />
                    [02:48.20] オトコノコの大事なコト(ムカつく)
                    <br />
                    [02:51.02] 引くに引けない それぞれの事情
                    <br />
                    [02:55.95] ほかに何も考えらんない(真っ直ぐで)
                    <br />
                    [02:58.67] 一瞬だって よそ见できない(ニブいね)
                    <br />
                    [03:01.31] 充実感 あふれるほどに
                    <br />
                    [03:06.01] 満たしてあげるよ
                    <br />
                    [03:07.02] 条件ちらつかせ 様子うかがって
                    <br />
                    [03:11.54] そんな感じの トリヒキしようよ
                    <br />
                    [03:17.42] あのね今のとこ ほんの数％しか
                    <br />
                    [03:22.48] アイツの心に 居场所がないんだ
                    <br />
                    [03:27.19]
                    <br />
                </div>
            </div>
        </>
    );
}

export default Footer;
