import { Box } from '@mui/material';
// import { BsFillImageFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { rootBackend } from '../../../constant';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Item(props) {
    const { image, name, artist_name, onClick } = props.props;
    // console.log(props, src, name, artist);
    return (
        <Box
            display={'flex'}
            width={'46%'}
            sx={{
                borderRadius: '4px',
                '&:hover': { backgroundColor: '#202020' },
                padding: '4px',
                margin: '10px',
                cursor: 'pointer',
            }}
            alignItems={'center'}
        >
            <Box width={44} height={44} margin={'4px 10px'}>
                {/* <BsFillImageFill style={{ width: '44px', height: '44px' }} /> */}
                <img
                    style={{ width: '44px', height: '44px', borderRadius: '4px' }}
                    src={`${rootBackend}${image}`}
                    alt="#"
                />
            </Box>
            <Box display={'flex'} flexDirection={'column'} marginLeft={2}>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>{name}</span>
                {/* <span>{artist_name}</span> */}
                <div>
                    {artist_name?.map((item, idx) => {
                        return (
                            <span key={idx}>
                                {item}
                                {artist_name[idx + 1] ? ', ' : ''}
                            </span>
                        );
                    })}
                </div>
            </Box>
            <Box margin={'0 10px 0 auto'}>
                <IoMdAdd onClick={onClick} color="white" className={cx('hover')} />
            </Box>
        </Box>
    );
}

export default Item;
