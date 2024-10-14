import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { Box } from "@mui/joy";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  minWidth: 265,
});

function InputFileUpload({onModalClose}) {

  const [selectedFile, setSelectedFile] = useState(null);



  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onModalClose();
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button component="label" startIcon={<CloudUploadIcon />}>
        Upload
        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Get my avatar
      </Button>
    </Box>
  );
}

export default InputFileUpload;
