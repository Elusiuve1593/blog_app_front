import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux-hooks";
import { loginThunk } from "../../../redux/slices/auth/sign-in/operations";
import { signUpThunk } from "../../../redux/slices/auth/sign-up/operations";
import { fetchProfileThunk } from "../../../redux/slices/user/operations";
import { AppDispatch } from "../../../redux/store";
import { SignUpForm } from "./sign-up-form/SignUpForm";
import { schema } from "./yup/yup";

export interface SignUpFormInterface {
  username: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [blind, setBlind] = useState<boolean>(true);
  const avatar: string | null | undefined = useAppSelector(
    (state) => state.profile.avatar
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SignUpFormInterface> = async (data) => {
    const payload = {
      ...data,
      avatar: avatar ? avatar : " ",
    };
    const res = await dispatch(signUpThunk(payload));
    if (signUpThunk.fulfilled.match(res)) {
      const { email, password } = data;
      const res = await dispatch(loginThunk({ email, password }));
      await dispatch(fetchProfileThunk());
      if (loginThunk.fulfilled.match(res)) {
        navigate("/");
      }
    }
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={4.5} margin={7}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 0 }}>
          <SignUpForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            isValid={isValid}
            blind={blind}
            setBlind={setBlind}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
