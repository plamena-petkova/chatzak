import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Divider from "@mui/joy/Divider";
import { Button, Dropdown, Input, MenuButton } from "@mui/joy";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchString } from "../store/chatReducer";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";

function SearchBarMessages({
  searchMessages,
  goNext,
  goPrevious,
  currentIndex,
  indexes,
}) {
  const dispatch = useDispatch();

  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleSearch = (e) => {
    const searchString = e.target.value;
    dispatch(setSearchString(searchString));
  };

  return (
    <>
      <Dropdown>
        <MenuButton
          onClick={() => {
            setOpenSearchBar(!openSearchBar);
            dispatch(setSearchString(""));
          }}
          slots={{ root: IconButton }}
        >
          <SearchIcon />
        </MenuButton>
        <Menu sx={{ border: "none", p: 1 }}>
          <Input
            onBlur={(e) => handleSearch(e)}
            endDecorator={
              <>
                <Divider orientation="vertical" />
                {`${currentIndex ? (currentIndex+1) : 0}/${indexes}`}
                <Button onClick={goNext} variant="plain">
                  <KeyboardArrowDownIcon fontSize="small" />
                </Button>
                <Button onClick={goPrevious} variant="plain">
                  <KeyboardArrowUpIcon fontSize="small" />
                </Button>
                <Button variant="soft" onClick={() => searchMessages()}>
                  Search
                </Button>
              </>
            }
          />
        </Menu>
      </Dropdown>
    </>
  );
}

export default SearchBarMessages;
