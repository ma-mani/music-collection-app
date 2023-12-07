import './AlbumList.css';

import { Album } from '../types/data';
import AlbumCard from './AlbumCard';

interface Props {
    data: Album[];
    title: string;
    onToggleId: (id: string) => void;
    savedAlbumIds: string[];
}

const AlbumList = ({data, title, onToggleId, savedAlbumIds}: Props) => {
    return (
        <div className='album'>
            <h2>{title}</h2>
            <ul className='albumlist'>
                {data.map((item) => (
                    <AlbumCard
                        key={item.id}
                        artist={item.artist}
                        title={item.title}
                        image={item.image}
                        tracks={item.tracks}
                        onToggleId={onToggleId}
                        id={item.id}
                        savedAlbumIds={savedAlbumIds}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AlbumList;
