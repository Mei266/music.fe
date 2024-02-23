import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import gyphy from '../../../assets/images/giphy.gif';

const cx = classNames.bind(styles);

function MusicItem({ onClick, src, name, author, isPlaying }) {
    return (
        <button className={cx('wrapper')} onClick={onClick ? onClick : () => {}}>
            <div className={cx('display')}>
                <BsFillPlayCircleFill className={cx('display-icon')} />
            </div>
            <div className={cx('content')}>
                <img className={cx('image')} src={src} alt="#"></img>
                {isPlaying ? <img className={cx('image-playing')} src={gyphy} alt="#"></img> : ''}
                <div className={cx('name')}>
                    <span>{name}</span>
                </div>
                {author?.map((item, idx) => {
                    return (
                        <div key={idx} className={cx('author')}>
                            {item} {author[idx + 1] ? ',' : ''}
                        </div>
                    );
                })}
            </div>
        </button>
    );
}

export default MusicItem;
