import axios, { AxiosError } from "axios";
import { style } from "../styles/styles";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

export const handleAxiosError = (
  err: unknown,
  rejectWithValue: (value: ErrorResponse) => void,
  redirection?: string
) => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      toast.error(axiosError.response?.data.message, { style });
      if (redirection && redirection.length > 0) {
        window.location.href = `/${redirection}`;
      }
      return rejectWithValue(axiosError.response.data);
    }
  }
  return rejectWithValue({
    message: err instanceof Error ? err.message : "Unknown error",
  });
};
