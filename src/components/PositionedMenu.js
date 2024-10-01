import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";

function PositionedMenu({ onDelete, onEdit }) {
  return (
    <Dropdown>
      <MenuButton
        sx={{":hover":'none'}}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size:'5px' } }}
      >
        <MoreVert fontSize="5px" sx={{alignSelf:'start'}} />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem onClick={() => onEdit()}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{" "}
          Edit message
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={() => onDelete()} variant="soft" color="danger">
          <ListItemDecorator sx={{ color: "inherit" }}>
            <DeleteForever />
          </ListItemDecorator>{" "}
          Delete Message
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default PositionedMenu;
  