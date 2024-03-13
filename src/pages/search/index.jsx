import image from '../../assets/artist/hoangdung.jpg';
import { CiHeart } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import SearchItem from './SearchItem';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseApi, rootBackend } from '../../constant';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Search() {
    const [musics, setMusics] = useState(null);
    const [artists, setArtists] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [heart, setHeart] = useState(null);
    const [top, setTop] = useState(null);
    const [type, setType] = useState(null);
    const [refesh, setRefesh] = useState(0);
    const { playMusic, insertAfterIdOne, state } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    let query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        query = query ? query : '';
        axios.post(`${baseApi}/search`, { search_text: query }).then((res) => {
            console.log(res.data);
            setMusics(res.data.musics);
            setArtists(res.data.artists);
            setAlbums(res.data.albums);

            let maxMusic;
            if (res.data?.musics.length > 0) {
                maxMusic = res.data?.musics?.reduce((max, current) => {
                    return max.number_listens > current.number_listens ? max : current;
                });
            }
            let maxTotalNum = -Infinity; // Giả sử tổng `num` lớn nhất là âm vô cùng
            let maxTotalNumAlbum = null;

            res.data.albums.forEach((album) => {
                const totalNum = album.music_list?.reduce(
                    (accumulator, current) => accumulator + current.number_listens,
                    0,
                );
                if (totalNum > maxTotalNum) {
                    maxTotalNum = totalNum;
                    maxTotalNumAlbum = album;
                }
            });
            let maxTotalNumAr = -Infinity; // Giả sử tổng `num` lớn nhất là âm vô cùng
            let maxTotalNumAlbumAr = null;

            res.data.artists.forEach((artist) => {
                const totalNum = artist.music_list?.reduce(
                    (accumulator, current) => accumulator + current.number_listens,
                    0,
                );
                if (totalNum > maxTotalNum) {
                    maxTotalNumAr = totalNum;
                    maxTotalNumAlbumAr = artist;
                }
            });
            console.log(maxMusic?.number_listens, maxTotalNum, maxTotalNumAr);
            const music_count = maxMusic?.number_listens ? maxMusic?.number_listens : -Infinity;
            if (music_count >= maxTotalNum && music_count >= maxTotalNumAr) {
                setTop(maxMusic);
                setType('music');
            } else if (maxTotalNum > music_count && maxTotalNum > maxTotalNumAr) {
                console.log('maxTotalNumAlbum: ', maxTotalNumAlbum);
                setTop(maxTotalNumAlbum);
                setType('album');
            } else {
                setTop(maxTotalNumAlbumAr);
                setType('artist');
            }
        });
    }, [query]);

    useEffect(() => {
        axios.get(`${baseApi}/user/${state['userid']}/heart`).then((res) => {
            console.log(res);
            setHeart(res.data);
        });
    }, [refesh]);

    const handleAddHeart = (musicid) => {
        axios.post(`${baseApi}/heart`, { user: state['userid'], music: musicid }).then((res) => {
            // setRefeshHeart(refeshHeart + 1);
            setRefesh(refesh + 1);
        });
    };

    const handleRemoveHeart = (musicid) => {
        axios.post(`${baseApi}/heart/delete`, { user: state['userid'], music: musicid }).then((res) => {
            // setRefeshHeart(refeshHeart + 1);
            setRefesh(refesh + 1);
        });
    };

    const handlePlayMusicInPlaylist = (id, list) => {
        playMusic(id, list);
    };
    console.log('top: ', top);
    return (
        <div style={{ color: 'white', padding: '28px 56px' }}>
            <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
                <div style={{ width: '40%' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>
                        Top kết quả
                    </div>
                    <div
                        style={{
                            padding: '20px',
                            border: '1px solid white',
                            borderRadius: '6px',
                            marginTop: '14px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            if (type === 'artist') {
                                navigate(`/artist/${top?.id}`);
                            } else if (type === 'album') {
                                navigate(`/album/${top?.id}`);
                            } else if (type === 'music') {
                                handlePlayMusicInPlaylist(top?.id, musics);
                            }
                        }}
                    >
                        {top ? (
                            <img
                                style={{ width: '88px', height: '88px', borderRadius: '4px' }}
                                src={`${rootBackend}${top?.image}`}
                                alt=""
                            />
                        ) : (
                            <span>Không tìm thấy kết quả</span>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>
                                {type === 'album' ? top?.title : top?.name}
                            </span>
                            <span>
                                {type === 'artist'
                                    ? 'Artist'
                                    : top?.artist_name.map((item, idx) => {
                                          const au_list = top?.artist_name[idx + 1] ? ',' : '';
                                          return item + au_list;
                                      })}
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ width: '58%' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>
                        Bài hát
                    </div>
                    <div>
                        {musics?.map((item, idx) => {
                            return (
                                <div key={idx} style={{ display: 'flex', padding: '8px', cursor: 'pointer' }}>
                                    <div
                                        style={{ width: '60%', display: 'flex' }}
                                        onClick={() => {
                                            handlePlayMusicInPlaylist(item?.id, musics);
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '4px',
                                                marginRight: '8px',
                                            }}
                                            src={`${rootBackend}${item.image}`}
                                            alt=""
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '600', fontSize: '18px' }}>{item.name}</span>
                                            <span>
                                                {item?.artist_name?.map((ele, idx) => {
                                                    const au_list = item?.artist_name[idx + 1] ? ',' : '';
                                                    return ele + au_list;
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ width: '10%' }}>
                                        {heart?.find((ele) => ele.id === item.id) ? (
                                            <AiFillHeart
                                                onClick={() => {
                                                    handleRemoveHeart(item.id);
                                                }}
                                                color="#f26398"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                onClick={() => {
                                                    handleAddHeart(item.id);
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div style={{ width: '10%' }}>{item?.duration}</div>
                                    <div style={{ width: '10%' }}>
                                        <BsThreeDots
                                            onClick={() => {
                                                insertAfterIdOne(item, state['musicId']);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div>
                {artists?.length === 0 ? (
                    ''
                ) : (
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginTop: '20px' }}>
                        Artists
                    </div>
                )}
                <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                    {artists?.map((item, idx) => {
                        return (
                            <SearchItem
                                onClick={() => {
                                    navigate(`/artist/${item?.id}`);
                                }}
                                key={idx}
                                src={`${rootBackend}${item?.image}`}
                                name={item?.name}
                                type={'Artist'}
                            />
                        );
                    })}
                </div>
            </div>
            <div>
                {albums?.length === 0 ? (
                    ''
                ) : (
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginTop: '20px' }}>Albums</div>
                )}
                <div style={{ display: 'flex', width: '90%' }}>
                    {albums?.map((item, idx) => {
                        return (
                            <SearchItem
                                onClick={() => {
                                    navigate(`/album/${item?.id}`);
                                }}
                                key={idx}
                                src={`${rootBackend}${item?.image}`}
                                name={item?.title}
                                type={'Album'}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Search;
