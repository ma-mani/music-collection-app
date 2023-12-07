import SearchBar from '../Components/SearchBar';

interface Props {
    onSearchName: (data: string) => void;
}
const SearchPage = ({onSearchName}: Props) => {
    return (
        <>
            <SearchBar onSearchName={onSearchName} />
        </>
    );
};

export default SearchPage;
