import { Box, Paper, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IsCurrentUser } from "../../../common/components/IsCurrentUser";
import { UserInfoCard } from "../../../common/components/UserInfoCard";
import { useAppSelector } from "../../../redux/redux-hooks";
import {
  deleteCommentThunk,
  fetchCommentsThunk,
  updateCommentThunk,
} from "../../../redux/slices/user/operations";
import { AppDispatch } from "../../../redux/store";
import { EditForm } from "../../../common/components/EditForm";
import { CommentInterface, PostInterface } from "../../../redux/types";

interface CommentProps {
  postIdtoNum: number;
}

export const Comment = memo(({ postIdtoNum }: CommentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useAppSelector((state) => state.profile.comments);
  const post = useAppSelector((state) =>
    state.profile.posts.find((post: PostInterface) => post.id === postIdtoNum)
  );

  const [editId, setEditId] = useState<number | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onUpdate = (data: { content: string }, id: number) => {
    dispatch(
      updateCommentThunk({ id, content: data.content, postId: postIdtoNum })
    );
    setEditId(null);
    reset();
  };

  const onDelete = (id: number) => {
    dispatch(deleteCommentThunk(id));
  };

  const onEdit = (id: number, text: string) => {
    setEditId(id);
    setValue("content", text);
  };

  useEffect(() => {
    dispatch(fetchCommentsThunk(postIdtoNum));
  }, [dispatch, postIdtoNum]);

  return (
    <Box sx={{ marginTop: 7 }}>
      {post && (
        <Paper sx={{ p: 2, mb: 2, maxWidth: 500 }}>
          <Typography variant="h6">{post.content}</Typography>
        </Paper>
      )}

      {comments &&
        comments.map(({ id, author, content, createdAt }: CommentInterface) => {
          return (
            <Paper
              key={id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minWidth: 350,
                  minHeight: 60,
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
                <Typography sx={{ mt: 1, wordBreak: "break-word" }}>
                  {content}
                </Typography>
              )}
            </Paper>
          );
        })}
    </Box>
  );
});
