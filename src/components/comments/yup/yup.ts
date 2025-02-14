import * as yup from "yup";

export const commentSchema = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required("Content is required")
    .max(300, "The maximum length of the message is 300 characters"),
});
