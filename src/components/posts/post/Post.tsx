import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IsCurrentUser } from "../../../common/components/IsCurrentUser";
import { UserInfoCard } from "../../../common/components/UserInfoCard";
import { useAppSelector } from "../../../redux/redux-hooks";
import {
  deletePostThunk,
  fetchPostsThunk,
  updatePostThunk,
} from "../../../redux/slices/user/operations";
import { AppDispatch } from "../../../redux/store";
import { EditForm } from "../../../common/components/EditForm";
import { PostInterface } from "../../../redux/types";

export const Post = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const posts = useAppSelector((state) => state.profile.posts);
  const totalPages = useAppSelector((state) => state.profile.totalPages);

  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    dispatch(fetchPostsThunk({ page, limit: 5 }));
  }, [page, dispatch]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onDelete = async (id: number) => {
    await dispatch(deletePostThunk(id));
    await dispatch(fetchPostsThunk({ page, limit: 5 }));
  };

  const onUpdate = (data: { content: string }, id: number) => {
    dispatch(updatePostThunk({ id, content: data.content }));
    setEditId(null);
    reset();
  };

  const onEdit = (id: number, text: string) => {
    setEditId(id);
    setValue("content", text);
  };

  return (
    <Box sx={{ mt: 3 }}>
      {posts &&
        posts.map(({ id, author, content, createdAt }: PostInterface) => {
          return (
            <Paper
              key={id}
              sx={{ p: 2, mb: 2, maxWidth: 500, position: "relative" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <UserInfoCard author={author} createdAt={createdAt} />
                <IsCurrentUser
                  email={author.email}
                  onEdit={onEdit}
                  editId={editId}
                  id={id}
                  content={content}
                  onDelete={onDelete}
                />
              </Box>
              {editId === id ? (
                <form onSubmit={handleSubmit((data) => onUpdate(data, id))}>
                  <EditForm control={control} setEditId={setEditId} />
                </form>
              ) : (
                <Typography sx={{ mt: 1 }}>{content}</Typography>
              )}
              {editId !== id && (
                <IconButton
                  sx={{ position: "absolute", bottom: 5, right: 16 }}
                  size="small"
                  onClick={() => navigate(`/comments/postId=${id}`)}
                >
                  <ReplyIcon fontSize="small" />
                </IconButton>
              )}
            </Paper>
          );
        })}

      {!posts.length ? (
        ""
      ) : (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
};
