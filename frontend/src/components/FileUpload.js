import { Button, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";

const FileUpload = ({ file, onFileChange }) => {
  return (
    <>
      <input
        accept="application/pdf"
        style={{ display: "none" }}
        id="upload-file"
        type="file"
        onChange={(e) =>
          onFileChange(
            e.target.files.length ? e.target.files[0] : null
          )
        }
      />

      <label htmlFor="upload-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<UploadIcon />}
          sx={{ mt: 2 }}
        >
          {file ? file.name : "Upload PDF"}
        </Button>
      </label>

      {file && (
        <IconButton
          onClick={() => onFileChange(null)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}
    </>
  );
};

export default FileUpload;