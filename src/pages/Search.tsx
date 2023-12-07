import {useEffect, useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';

import AlbumList from '../Components/AlbumList';
import SearchBar from '../Components/SearchBar';
import {Album} from '../types/data';

const SearchPage = () => {
    const [data, setData] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [queryName, setQueryName] = useState('');
    const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState<string[]>(
        'savedAlbumIds',
        {
            defaultValue: [],
        },
    );
    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';

    const handleSearchName = (data: string) => {
        setQueryName(data);
    };

    const handleToggleSavedAlbum = (newId: string) => {
        if (savedAlbumIds.includes(newId)) {
            // remove id
            setSavedAlbumIds((prevAlbumIds) =>
                prevAlbumIds.filter((prevId) => prevId !== newId),
            );
        } else {
            // add id
            setSavedAlbumIds((prevAlbumIds) => [newId, ...prevAlbumIds]);
        }
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
                    onToggleId={handleToggleSavedAlbum}
                    data={data}
                    title={`Results for ${queryName}`}
                    savedAlbumIds={savedAlbumIds}
                />
            )}
        </>
    );
};

export default SearchPage;
