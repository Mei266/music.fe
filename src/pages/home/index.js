import styles from './home.module.scss';
import classNames from 'classnames/bind';
import MusicItem from './MusicItem';
import { data, dataNormal } from '../../data/Data';
// import { dataNormal } from '../../data/Data';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Gift from './Gift/gift';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';

const cx = classNames.bind(styles);

function Home() {
    const { state, playMusic } = useContext(AuthContext);
    const [musics, setMusics] = useState([]);
    const { indexList } = state;

    // const musics = getData(state['isAnh'])

    useEffect(() => {
        axios.get(`${baseApi}/music`).then((res) => {
            console.log(res);
            setMusics(res.data);
        });
    }, []);

    const handlePlay = (musicId) => {
        console.log(musics);
        playMusic(musicId, musics);
    };

    return (
        <div className={cx('wrapper')}>
            {/* <div>title</div> */}
            <div className={cx('content')}>
                {state['isGift'] ? (
                    <Gift />
                ) : (
                    musics.map((item, index) => {
                        return (
                            <MusicItem
                                key={index}
                                // musicId={item.musicId}
                                // src={item.image}
                                // name={item.name}
                                // author={item.author}
                                src={`${rootBackend}/${item.image}`}
                                name={item.name}
                                author={item.artist_name}
                                onClick={() => {
                                    handlePlay(item.id);
                                }}
                                isPlaying={item.id === indexList ? true : false}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Home;
