import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "../../redux/redux-hooks";
import { memo } from "react";

interface IsCurrentUserProps {
  email: string;
  editId: number | null;
  id: number;
  content: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export const IsCurrentUser = memo(({
  email,
  editId,
  id,
  content,
  onDelete,
  onEdit,
}: IsCurrentUserProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const currentUserEmail = useAppSelector((state) => state.profile.email);
  const isCurrentUser = isAuth && currentUserEmail === email;

  return (
    <>
      {isCurrentUser && editId !== id && (
        <Box>
          <IconButton
            size="small"
            color="warning"
            onClick={() => onEdit(id, content)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => onDelete(id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
});
