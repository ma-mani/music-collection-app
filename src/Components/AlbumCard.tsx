import './AlbumCard.css';

import {useState} from 'react';

import {Album} from '../types/data';
import SongList from './SongList';

interface Props extends Partial<Album> {}

const AlbumCard = ({artist, title, image, tracks}: Props) => {
    const [toggle, setToggle] = useState<Boolean>(false);
    return (
        <li className='list'>
            <button onClick={() => setToggle((prevToggle) => !prevToggle)}>
                <img src={image?.url} alt='' />
            </button>
            <div className='list__info'>
                <span className='list__info-title'>{title}</span>
                <span className='list__info-author'>{artist}</span>
            </div>
            {tracks && toggle && <SongList tracks={tracks} />}
        </li>
    );
};

export default AlbumCard;
