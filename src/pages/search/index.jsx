import image from '../../assets/artist/hoangdung.jpg';
import { CiHeart } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import SearchItem from './SearchItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseApi, rootBackend } from '../../constant';

function Search() {
    const [musics, setMusics] = useState(null);
    const [artists, setArtists] = useState(null);
    const [albums, setAlbums] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    let query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        query = query ? query : '';
        axios.post(`${baseApi}/search`, { search_text: query }).then((res) => {
            setMusics(res.data.musics);
            setArtists(res.data.artists);
            setAlbums(res.data.albums);
        });
    }, [query]);

    return (
        <div style={{ color: 'white', padding: '28px 56px' }}>
            <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
                <div style={{ width: '40%' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>
                        Top result
                    </div>
                    <div style={{ padding: '20px', border: '1px solid white', borderRadius: '6px', marginTop: '14px' }}>
                        <img style={{ width: '88px', height: '88px' }} src={image} alt="" />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'white', fontSize: '28px', fontWeight: '600' }}>name</span>
                            <span>artist</span>
                        </div>
                    </div>
                </div>
                <div style={{ width: '58%' }}>
                    <div style={{ color: 'white', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>
                        Songs
                    </div>
                    <div>
                        {musics?.map((item, idx) => {
                            return (
                                <div key={idx} style={{ display: 'flex', padding: '8px' }}>
                                    <div style={{ width: '60%', display: 'flex' }}>
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
                                        <CiHeart />
                                    </div>
                                    <div style={{ width: '10%' }}>{item?.duration}</div>
                                    <div style={{ width: '10%' }}>
                                        <BsThreeDots />
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
