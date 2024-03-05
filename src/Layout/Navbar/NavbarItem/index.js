import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function NavbarItem({ onClick, children, text, disable }) {
    return (
        <div onClick={onClick ? onClick : () => {}} className={cx('wrapper', disable ? 'disable' : '')}>
            <div className={cx('icon')}>{children}</div>
            <span className={cx('text', disable ? 'disable' : '')}>{text}</span>
        </div>
    );
}

export default NavbarItem;
