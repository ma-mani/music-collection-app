import './AlbumCard.css';

import {useState} from 'react';

import {Album} from '../types/data';
import SongList from './SongList';

interface Props extends Omit<Album, 'release_date' | 'uri'> {
    onToggleId: (id: string) => void;
    savedAlbumIds: string[];
}

const AlbumCard = ({
    artist,
    title,
    image,
    tracks,
    id,
    onToggleId,
    savedAlbumIds,
}: Props) => {
    const [toggle, setToggle] = useState<Boolean>(false);

    const checkSaved = savedAlbumIds.includes(id);

    return (
        <li className='list'>
            <div className='list-buttons'>
                <button
                    className='image__Button'
                    onClick={() => setToggle((prevToggle) => !prevToggle)}
                >
                    <img src={image?.url} alt='' />
                </button>
                <button
                    onClick={() => onToggleId(id)}
                    className={`button__save ${checkSaved ? 'change__bg' : ''}`}
                >
                    {checkSaved ? 'saved' : 'save'}
                </button>
            </div>

            <div
                className={`list__info ${
                    checkSaved ? 'change__bottomline' : ''
                }`}
            >
                <span className='list__info-title'>{title}</span>
                <span className='list__info-author'>{artist}</span>
            </div>
            {tracks && toggle && <SongList tracks={tracks} />}
        </li>
    );
};

export default AlbumCard;
