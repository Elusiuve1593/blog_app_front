import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/redux-hooks";
import {
  addPostThunk,
  fetchPostsThunk,
} from "../../../redux/slices/user/operations";
import { AppDispatch } from "../../../redux/store";
import { postSchema } from "../yup/yup";
import { FormButtonst } from "../../../common/components/FormButtons";

interface PostFormData {
  content: string;
}

export const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
    defaultValues: { content: "" },
  });

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    await dispatch(addPostThunk({ content: data.content }));
    await dispatch(fetchPostsThunk({ page: 1, limit: 5 }));
    reset();
    setIsOpen(false);
  };

  return (
    <Box sx={{ minWidth: 350, mt: 10, position: "relative" }}>
      {!isOpen ? (
        <Button
          sx={{ maxWidth: 150 }}
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isAuth}
          onClick={() => setIsOpen(true)}
        >
          Create Post
        </Button>
      ) : (
        <Paper sx={{ padding: 2, position: "relative" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Your post"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              {...register("content")}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <FormButtonst
              reset={reset}
              isSubmitting={isSubmitting}
              callback={() => setIsOpen(false)}
            />
          </form>
        </Paper>
      )}
    </Box>
  );
};
