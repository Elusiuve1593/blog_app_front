import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux-hooks";
import {
  addCommentThunk,
  fetchCommentsThunk,
} from "../../../redux/slices/user/operations";
import { AppDispatch } from "../../../redux/store";
import { commentSchema } from "../yup/yup";
import { FormButtonst } from "../../../common/components/FormButtons";
import { memo } from "react";

interface CommentFormData {
  content: string;
}

interface CommentFormProps {
  postIdtoNum: number;
}

export const CommentForm = memo(({ postIdtoNum }: CommentFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: yupResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    await dispatch(
      addCommentThunk({ content: data.content, postId: postIdtoNum })
    );
    await dispatch(fetchCommentsThunk(postIdtoNum));
    reset();
  };

  return (
    <>
      {isAuth ? (
        <Paper sx={{ padding: 2, maxWidth: 400, margin: "auto", mb: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Your comment"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              {...register("content")}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <FormButtonst
              reset={reset}
              isSubmitting={isSubmitting}
              callback={() => navigate("/")}
            />
          </form>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Go to posts
          </Button>
        </Box>
      )}
    </>
  );
});
