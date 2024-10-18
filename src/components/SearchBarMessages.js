import SearchIcon from '@mui/icons-material/Search';
import { Button, Input } from '@mui/joy';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchString } from '../store/chatReducer';

function SearchBarMessages({searchMessages}) {

    const dispatch =useDispatch();

    const [openSearchBar, setOpenSearchBar] = useState(false);


    const handleSearch = (e) => {
        const searchString = e.target.value;
        dispatch(setSearchString(searchString));
    }

    const searchInMessages = () => {
        searchMessages();
    }

    return(
        <>
        {openSearchBar && <Input onBlur={(e) => handleSearch(e)} endDecorator={<Button variant='soft' onClick={() => searchInMessages()}>Search</Button>} />}
        <Button onClick={() => setOpenSearchBar(!openSearchBar)} variant='plain' sx={{color:'black'}}><SearchIcon /></Button>
        
        </>
    )

}

export default SearchBarMessages;