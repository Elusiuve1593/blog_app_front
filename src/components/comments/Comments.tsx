import { useParams } from "react-router-dom";
import { CommentForm } from "./comment-form/CommentForm";
import { Comment } from "./comment/Comment";

export const Comments = () => {
  const { postId } = useParams();
  const postIdtoNum = Number(postId?.replace(/\D/g, ""));
  return (
    <>
      <Comment postIdtoNum={postIdtoNum} />
      <CommentForm postIdtoNum={postIdtoNum} />
    </>
  );
};
