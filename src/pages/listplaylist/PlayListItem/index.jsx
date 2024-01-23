import MusicItem from '../../home/MusicItem';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Chip, Tooltip } from '@mui/material';
import { rootBackend } from '../../../constant';
import { SiYoutubemusic } from 'react-icons/si';
import { TbMusicOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function PlayListItem({ id, title, musics, description }) {
    const { playMusic } = useContext(AuthContext);
    const navigate = useNavigate();

    const handlePlay = (musicId) => {
        navigate(`/playlist/${id}`);
        playMusic(musicId, musics);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Tooltip title={description} arrow>
                    <div className={cx('title')}>
                        <span style={{ fontSize: '30px', fontWeight: '800' }}>{title}</span>
                    </div>
                </Tooltip>
                <div className={cx('show')}>
                    <Chip
                        sx={{ color: 'white', borderColor: 'white' }}
                        label="Xem tất cả"
                        onClick={() => {
                            navigate(`/playlist/${id}`);
                        }}
                        variant="outlined"
                    />
                    <span style={{ fontSize: '18px', fontWeight: '600' }}></span>
                </div>
            </div>
            <div style={{ display: 'flex' }} onClick={() => {}}>
                {musics.length > 0 ? (
                    musics.map((item, idx) => {
                        return (
                            <MusicItem
                                key={idx}
                                musicId={item.id}
                                src={`${rootBackend}/${item.image}`}
                                name={item.name}
                                author={item.artist_name}
                                onClick={() => {
                                    handlePlay(item.id);
                                }}
                            />
                        );
                    })
                ) : (
                    <div
                        style={{
                            color: 'white',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        onClick={() => {
                            navigate(`/playlist/${id}`);
                        }}
                    >
                        <TbMusicOff style={{ width: '100px', height: '100px', color: '#282828', margin: '20px 0' }} />
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <SiYoutubemusic
                                style={{ color: '#1ed760', height: '24px', width: '24px', marginRight: '4px' }}
                            />
                            <span>Thêm</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayListItem;
