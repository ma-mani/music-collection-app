import './AlbumCardList.css';

import {Album} from '../types/data';
import AlbumCard from './AlbumCard';

interface Props {
    data: Album[];
}

const AlbumCardList = ({data}: Props) => {
    return (
        <>
            <ul className='album'>
                {data.map((item) => (
                    <AlbumCard
                        key={item.id}
                        artist={item.artist}
                        title={item.title}
                        image={item.image}
                        tracks={item.tracks}
                    />
                ))}
            </ul>
        </>
    );
};

export default AlbumCardList;
