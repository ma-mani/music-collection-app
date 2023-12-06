import './App.css';

import { useEffect, useState } from 'react';

import AlbumList from './Components/AlbumList';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import { Album } from './types/data';

function App() {
    const [data, setData] = useState<Album[]>([]);
    const [savedData, setSavedData] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [queryName, setQueryName] = useState('');
    const [currentPage, setCurrentPage] = useState('FEATURE');

    const [savedAlbumIds, setSavedAlbumIds] = useState<string[]>([]);

    const handleSearchName = (data: string) => {
        setQueryName(data);
        setCurrentPage('SEARCHED');
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

    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';

    useEffect(() => {
        async function fetchData() {
            const URL =
                currentPage === 'FEATURE'
                    ? `${baseURL}/featured`
                    : `${baseURL}/search?artist=${queryName}`;
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
    }, [queryName, currentPage]);

    useEffect(() => {
        async function fetchSavedData() {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `${baseURL}/albums?ids=${JSON.stringify(savedAlbumIds)}`,
                );
                if (!res.ok) throw new Error('fetching does not work');
                const data = await res.json();
                setSavedData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSavedData();
    }, [savedAlbumIds]);

    return (
        <main className='app'>
            <Header>Music Collector</Header>
            <SearchBar onSearchName={handleSearchName} />
            {isLoading ? (
                <p style={{fontSize: 50}}>Is Loading ...</p>
            ) : (
                <>
                    {data.length !== 0 ? (
                        <AlbumList
                            onToggleId={handleToggleSavedAlbum}
                            data={data}
                            title={
                                currentPage === 'SEARCHED'
                                    ? `Results for: ${queryName}`
                                    : 'Featured'
                            }
                            savedAlbumIds={savedAlbumIds}
                        />
                    ) : (
                        <p>No Albums :/</p>
                    )}

                    {savedData.length !== 0 ? (
                        <AlbumList
                            onToggleId={handleToggleSavedAlbum}
                            data={savedData}
                            title={'Saved'}
                            savedAlbumIds={savedAlbumIds}
                        />
                    ) : null}
                </>
            )}
        </main>
    );
}

export default App;
