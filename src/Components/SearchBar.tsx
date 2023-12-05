import './SearchBar.css';

import {FormEvent} from 'react';

interface Props {
    onSearchName: (data: string) => void;
}

const SearchBar = ({onSearchName}: Props) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = formData.get('name') as string;
        onSearchName(data);
        e.currentTarget.reset();
    };

    return (
        <form onSubmit={handleSubmit} className='searchbar'>
            <input
                type='text'
                name='name'
                id='name'
                placeholder='enter artist name'
            />
            <button type='submit'>search</button>
        </form>
    );
};

export default SearchBar;
