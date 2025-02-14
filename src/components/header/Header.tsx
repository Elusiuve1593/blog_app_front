import { AppBar, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/redux-hooks";
import { fetchProfileThunk } from "../../redux/slices/user/operations";
import { AppDispatch } from "../../redux/store";
import { AuthButtons } from "./buttons/AuthButtons";
import { Indicator } from "./indicator/Indicator";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth: boolean = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, [dispatch]);
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        height: "10%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Indicator isAuth={isAuth} />
        <AuthButtons isAuth={isAuth} />
      </Toolbar>
    </AppBar>
  );
};
