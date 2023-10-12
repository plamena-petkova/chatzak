import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton } from "@mui/joy";

function ErrorAlert({ onCloseHandler }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Alert
        startDecorator={<WarningIcon />}
        variant="soft"
        color="danger"
        endDecorator={
          <>
            <IconButton
              onClick={onCloseHandler}
              variant="soft"
              size="sm"
              color="danger"
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      >
        Incorrect username or password
      </Alert>
    </Box>
  );
}

export default ErrorAlert;
