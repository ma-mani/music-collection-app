import './App.css';

import { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import Header from './Components/Header';
import Navigation, { PageName } from './Components/Navigation';
import Albums from './pages/Albums';
import Home from './pages/Home';
import SearchPage from './pages/Search';

function App() {
    const [currentPage, setCurrentPage] = useState<PageName>('home');

    const handleClickPage = (page: PageName) => setCurrentPage(page);

    const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState<string[]>(
        'savedAlbumIds',
        {
            defaultValue: [],
        },
    );

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

    return (
        <>
            <Navigation
                currentPage={currentPage}
                onClickPage={handleClickPage}
            />
            <main className='app'>
                <Header>Music Collector</Header>
                {currentPage === 'home' && (
                    <Home
                        onToggleId={handleToggleSavedAlbum}
                        savedAlbumIds={savedAlbumIds}
                    />
                )}
                {currentPage === 'search' && (
                    <SearchPage
                        onToggleId={handleToggleSavedAlbum}
                        savedAlbumIds={savedAlbumIds}
                    />
                )}
                {currentPage === 'albums' && (
                    <Albums
                        onToggleId={handleToggleSavedAlbum}
                        savedAlbumIds={savedAlbumIds}
                    />
                )}
            </main>
        </>
    );
}

export default App;
