import Button from "@mui/material/Button";
import { memo, ReactElement } from "react";

interface SaveButtonProps {
  text: string;
  buttonType: "button" | "reset" | "submit";
  icon?: ReactElement;
  isValid?: boolean;
  callback?: () => void;
}

export const SaveButton = memo(
  ({ text, buttonType, icon, isValid, callback }: SaveButtonProps) => {
    return (
      <Button
        type={buttonType}
        variant="outlined"
        color="primary"
        startIcon={icon}
        disabled={isValid}
        onClick={callback}
      >
        {text}
      </Button>
    );
  }
);
