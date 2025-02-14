import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../../../common/errors-handler/errors-handler";
import axiosInstance from "../../../axios-interceptor";
import { isLoading } from "../../preloader/slice";
import { SignUpInfo } from "../../../types";

export const signUpThunk = createAsyncThunk("signUp/signUpThunk", async (param, { dispatch, rejectWithValue }) => {
  try {
    dispatch(isLoading({ setPreloading: true }));

    await axiosInstance.post<SignUpInfo>(
      `${import.meta.env.VITE_API_URL}/user/sign-up`,
      param
    );
  } catch (err: unknown) {
    return handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});
