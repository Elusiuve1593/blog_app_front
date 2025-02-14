import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { memo } from "react";
import { UseFormReset } from "react-hook-form";

interface PostFormData {
  content: string;
}

interface FormButtonstProps {
  reset: UseFormReset<PostFormData>;
  isSubmitting: boolean;
  callback?: () => void;
}

export const FormButtonst = memo(
    ({ reset, isSubmitting, callback }: FormButtonstProps) => {
    const handleCancel = () => {
      reset();
      if (callback) {
        callback();
      }
    };
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          sx={{ mr: 2 }}
          variant="outlined"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          Post
        </Button>
      </Box>
    );
  }
);
