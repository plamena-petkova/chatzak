import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Divider from "@mui/joy/Divider";
import { Button, Dropdown, Input, MenuButton } from "@mui/joy";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIndex,
  setIndexes,
  setSearchString,
} from "../store/chatReducer";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";

function SearchBarMessages({ searchMessages, goNext, goPrevious }) {
  const dispatch = useDispatch();

  const currentIndex = useSelector((state) => state.chat.currentIndex);
  const indexes = useSelector((state) => state.chat.indexes);

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
            dispatch(setIndexes(0));
            dispatch(setCurrentIndex(0));
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
                {indexes > 0 ? `${currentIndex + 1}/${indexes}` : "0/0"}
                <Button
                  onClick={goNext}
                  variant="plain"
                  disabled={currentIndex >= indexes - 1}
                >
                  <KeyboardArrowDownIcon fontSize="small" />
                </Button>
                <Button
                  onClick={goPrevious}
                  variant="plain"
                  disabled={currentIndex <= 0}
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </Button>
                <Button variant="soft" onClick={searchMessages}>
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
