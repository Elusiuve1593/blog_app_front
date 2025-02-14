import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { memo } from "react";

interface BlindButtonProps {
  blind: boolean;
  setBlind: (blind: boolean) => void;
}

export const BlindButton = memo(({ blind, setBlind }: BlindButtonProps) => {
  return (
    <>
      <IconButton type="button" onClick={() => setBlind(!blind)}>
        {blind ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </>
  );
});
