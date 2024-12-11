import { Box, Grid } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CardComponentHome from "./CardComponentHome";


function FeaturesComponent() {

  return (
    <Grid
    container
    gap={10}
    sx={{justifyContent:'center', p:'40px'}}
  >
        <Box>
          <CardComponentHome
            cardText={
              "Want to make corrections? Yoou can edit you message with ChatZak!"
            }
            cardHeading={"Message Edit"}
            cardIcon={<EditIcon fontSize="large" />}
          />
        </Box>
        <Box>
          {" "}
          <CardComponentHome
            cardText={
              "If you need to delete the message, do it now with ChatZak!"
            }
            cardHeading={"Message Delete"}
            cardIcon={<DeleteIcon fontSize="large" />}
          />{" "}
        </Box>
        <Box>
          {" "}
          <CardComponentHome
            cardText={
              "If you want to block a user, you can do it now with ChatZak!"
            }
            cardHeading={"Block User"}
            cardIcon={<BlockIcon fontSize="large" />}
          />
        </Box>
        <Box>
          {" "}
          <CardComponentHome
            cardText={
              "Invite your family, friends and colleagues to chat with you in ChatZak!"
            }
            cardHeading={"Invite User"}
            cardIcon={<PersonAddIcon fontSize="large" />}
          />
        </Box>

    </Grid>
  );
}

export default FeaturesComponent;
