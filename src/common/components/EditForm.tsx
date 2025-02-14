import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { memo } from "react";
import { Control, Controller } from "react-hook-form";

interface FormValues {
  content: string;
}

interface EditFormProps {
  control: Control<FormValues>;
  setEditId: (id: number | null) => void;
}

export const EditForm = memo(({ control, setEditId }: EditFormProps) => {
  return (
    <>
      <Box sx={{ mt: 1 }}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Button variant="outlined" onClick={() => setEditId(null)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Box>
      </Box>
    </>
  );
});
