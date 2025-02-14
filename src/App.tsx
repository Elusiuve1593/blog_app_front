import { Route, Routes } from "react-router-dom";
import "./App.css";
import pulse from "./common/preloader/Pulse.gif";
import { Img, PreloaderContainer } from "./common/styles/styles";
import { Login } from "./components/auth/login/Login";
import { SignUp } from "./components/auth/registration/SignUp";
import { Comments } from "./components/comments/Comments";
import { Header } from "./components/header/Header";
import { NotFoundPage } from "./components/not-found-page/NotFoundPage";
import { Posts } from "./components/posts/Posts";
import { useAppSelector } from "./redux/redux-hooks";

function App() {
  const isLoading: boolean = useAppSelector(
    (state) => state.preloader.isLoading
  );
  return (
    <div>
      {isLoading && (
        <PreloaderContainer>
          <Img src={pulse} alt="Loading..." />
        </PreloaderContainer>
      )}
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/comments/:postId" element={<Comments />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
