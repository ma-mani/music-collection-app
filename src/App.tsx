import './App.css';

import {useState} from 'react';

import Header from './Components/Header';
import Navigation, {PageName} from './Components/Navigation';
import Albums from './pages/Albums';
import Home from './pages/Home';
import SearchPage from './pages/Search';

function App() {
    const [currentPage, setCurrentPage] = useState<PageName>('home');

    const handleClickPage = (page: PageName) => setCurrentPage(page);

    return (
        <>
            <Navigation
                currentPage={currentPage}
                onClickPage={handleClickPage}
            />
            <main className='app'>
                <Header>Music Collector</Header>
                {currentPage === 'home' && <Home />}
                {currentPage === 'search' && <SearchPage />}
                {currentPage === 'albums' && <Albums />}
            </main>
        </>
    );
}

export default App;
