import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AuthorInterface } from "../../redux/slices/user/slice";
import defaultPic from "../../assets/default.png";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { memo } from "react";

interface UserInfoCardProps {
  author: AuthorInterface;
  createdAt: string;
}

export const UserInfoCard = memo(({ author, createdAt }: UserInfoCardProps) => {
  const date =
    createdAt &&
    format(toZonedTime(new Date(createdAt), "Europe/Kiev"), "dd.MM.yy HH:mm");

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src={
          author.avatar && author.avatar.trim() !== ""
            ? author.avatar
            : defaultPic
        }
        alt="Avatar"
        width={30}
        height={30}
        style={{ borderRadius: "50%", marginRight: 10 }}
      />
      <Typography
        sx={{ marginRight: "5px", fontWeight: "bold" }}
        variant="caption"
        color="#000"
      >
        {author.username}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
    </Box>
  );
});
