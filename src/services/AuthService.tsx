import { AxiosResponse } from "axios";
import { API, setAccess, storeAccess } from "@/configs";

export const AuthService = () => {
  const URL = "/member";

  const signin = async (body: User.SignInReqDto) => {
    const {
      data: { accessToken },
    } = (await API.post(
      `${URL}/sign-in`,
      body
    )) as AxiosResponse<User.SignInResDto>;

    setAccess(accessToken);
    storeAccess(accessToken);
  };

  const signup = async (body: User.SignUpResDto) => {
    const {
      data: { accessToken },
    } = (await API.post(`${URL}/sign-up`, body)) as AxiosResponse<{
      accessToken: string;
    }>;

    setAccess(accessToken);
    storeAccess(accessToken);
  };

  return { signin, signup };
};
