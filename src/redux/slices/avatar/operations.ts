import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoading } from "../preloader/slice";
import axiosInstance from "../../axios-interceptor";
import { updatePhoto } from "../user/slice";
import { handleAxiosError } from "../../../common/errors-handler/errors-handler";
import { UploadResponse } from "../../types";

export const uploadImageThunk = createAsyncThunk<
  void,
  File,
  {
    rejectValue: string;
  }
>("profile/uploadImage", async (file, { dispatch, rejectWithValue }) => {
  try {
    dispatch(isLoading({ setPreloading: true }));

    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post<UploadResponse>(
      `${import.meta.env.VITE_API_URL}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(updatePhoto({ photoUrl: res.data.url }));
  } catch (err: unknown) {
    handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});
