import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthorInterface {
  id: number | null;
  email: string;
  avatar: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInterface {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
  author: AuthorInterface;
}

export interface PostInterface {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: AuthorInterface;
}

export interface UserInterface {
  id: number;
  email: string;
  avatar: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentInterface[];
  posts: PostInterface[];
  totalPages: number;
}

const initialState: UserInterface = {
  id: 1,
  email: "",
  avatar: "",
  username: "",
  createdAt: "",
  updatedAt: "",
  comments: [
    {
      id: 1,
      postId: 1,
      content: "",
      createdAt: "",
      author: {
        id: null,
        email: "",
        avatar: "",
        username: "",
        createdAt: "",
        updatedAt: "",
      },
    },
  ],
  posts: [
    {
      id: 1,
      content: "",
      createdAt: "",
      updatedAt: "",
      author: {
        id: 1,
        email: "",
        avatar: "",
        username: "",
        createdAt: "",
        updatedAt: "",
      },
    },
  ],
  totalPages: 1,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updatePhoto(state, action: PayloadAction<{ photoUrl: string }>) {
      state.avatar = action.payload.photoUrl;
    },
    resetAvatar: (state) => {
      state.avatar = "";
    },
    setUser(_, action: PayloadAction<{ user: UserInterface }>) {
      return action.payload.user;
    },
    addComment(state, action: PayloadAction<{ data: CommentInterface }>) {
      state.comments.push(action.payload.data);
    },
    updateComment(state, action: PayloadAction<{ data: CommentInterface }>) {
      state.comments = state.comments.map((el: CommentInterface) =>
        el.id === action.payload.data.id
          ? { ...el, ...action.payload.data }
          : el
      );
    },
    deleteComment(state, action: PayloadAction<{ id: number }>) {
      state.comments = state.comments.filter(
        (el) => el.id !== action.payload.id
      );
    },
    fetchComment(state, action: PayloadAction<{ data: CommentInterface[] }>) {
      state.comments = action.payload.data;
    },
    addPost(state, action: PayloadAction<{ data: PostInterface }>) {
      state.posts.push(action.payload.data);
    },
    deletePost(state, action: PayloadAction<{ id: number }>) {
      state.posts = state.posts.filter((el) => el.id !== action.payload.id);
    },
    updatePost(state, action: PayloadAction<{ data: PostInterface }>) {
      state.posts = state.posts.map((el: PostInterface) =>
        el.id === action.payload.data.id
          ? { ...el, ...action.payload.data }
          : el
      );
    },
    fetchPost(
      state,
      action: PayloadAction<{ data: PostInterface[]; totalPages: number }>
    ) {
      state.posts = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const {
  updatePhoto,
  setUser,
  addComment,
  updateComment,
  deleteComment,
  fetchComment,
  addPost,
  deletePost,
  updatePost,
  fetchPost,
  resetAvatar
} = profileSlice.actions;
export default profileSlice.reducer;
