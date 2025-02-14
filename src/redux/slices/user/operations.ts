import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios-interceptor";
import {
  addComment,
  addPost,
  CommentInterface,
  deleteComment,
  deletePost,
  updateComment,
  fetchComment,
  PostInterface,
  setUser,
  UserInterface,
  updatePost,
  fetchPost,
} from "./slice";
import { isLoading } from "../preloader/slice";
import { handleAxiosError } from "../../../common/errors-handler/errors-handler";

export const fetchCommentsThunk = createAsyncThunk(
  "profile/fetchComments",
  async (postId: number, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<CommentInterface[]>(
        `${import.meta.env.VITE_API_URL}/comments?postId=${postId}`
      );
      dispatch(fetchComment({ data: res.data }));
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export interface fetchPostsPaginationInterface {
  data: PostInterface[];
  total: number;
  page: number;
  totalPages: number;
}

export const fetchPostsThunk = createAsyncThunk(
  "profile/fetchPosts",
  async (
    data: { page: number; limit: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get<fetchPostsPaginationInterface>(
        `${import.meta.env.VITE_API_URL}/posts?page=${data.page}&limit=${data.limit}`
      );
      dispatch(fetchPost({ data: res.data.data, totalPages: res.data.totalPages }));
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const fetchProfileThunk = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<UserInterface>(
        `${import.meta.env.VITE_API_URL}/user`
      );
      dispatch(setUser({ user: res.data }));
    } catch (err) {
      console.error(err, rejectWithValue);
    }
  }
);

export const addCommentThunk = createAsyncThunk<
  void,
  { content: string; postId: number }
  >("profile/addComment", async (data, { dispatch, rejectWithValue }) => {
  
  try {
    dispatch(isLoading({ setPreloading: true }));

    const res = await axiosInstance.post<CommentInterface>(
      `${import.meta.env.VITE_API_URL}/comments`,
      { content: data.content, postId: data.postId }
    );

    dispatch(addComment({ data: res.data }));
  } catch (err: any) {
    handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});

export const addPostThunk = createAsyncThunk<void, { content: string }>(
  "profile/addPost",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));

      const res = await axiosInstance.post<PostInterface>(
        `${import.meta.env.VITE_API_URL}/posts`,
        { content: data.content }
      );

      dispatch(addPost({ data: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const updateCommentThunk = createAsyncThunk<void, any>(
  "profile/updateComment",
  async (
    data: { id: number; content: string, postId: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));

      const res = await axiosInstance.put<CommentInterface>(
        `${import.meta.env.VITE_API_URL}/comments/${data.id}`,
        { content: data.content, postId: data.postId }
      );

      dispatch(updateComment({ data: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const updatePostThunk = createAsyncThunk<void, any>(
  "profile/updatePost",
  async (
    data: { id: number; content: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));

      const res = await axiosInstance.put<PostInterface>(
        `${import.meta.env.VITE_API_URL}/posts/${data.id}`,
        { content: data.content }
      );

      dispatch(updatePost({ data: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "profile/deleteComment",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      dispatch(deleteComment({ id }));
    } catch (err) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  "profile/deletePost",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      dispatch(deletePost({ id }));
    } catch (err) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
