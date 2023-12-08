import { useEffect, useState } from 'react';

import AlbumList from '../Components/AlbumList';
import SearchBar from '../Components/SearchBar';
import { Album } from '../types/data';

interface Props {
    onToggleId: (id: string) => void;
    savedAlbumIds: string[];
}

const SearchPage = ({onToggleId, savedAlbumIds}: Props) => {
    const [data, setData] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [queryName, setQueryName] = useState('');

    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';

    const handleSearchName = (data: string) => {
        setQueryName(data);
    };

    useEffect(() => {
        if (!queryName) return;
        async function fetchData() {
            const URL = `${baseURL}/search?artist=${queryName}`;
            setIsLoading(true);
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('fetching does not work');
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [queryName]);
    return (
        <>
            <SearchBar onSearchName={handleSearchName} />
            {isLoading ? (
                <p className='loader'></p>
            ) : (
                <AlbumList
                    onToggleId={onToggleId}
                    data={data}
                    title={`Results for ${queryName}`}
                    savedAlbumIds={savedAlbumIds}
                />
            )}
        </>
    );
};

export default SearchPage;
