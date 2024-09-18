import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../API/api";
import Preloader from "../components/common/Preloader/Preloader";
import { AuthUserI } from "../interfaces/authUser";

interface UserContextI {
  authUserData: AuthUserI;
  setAuthUserData: React.Dispatch<React.SetStateAction<AuthUserI>>;
}

const initialUserState = {
  authUserData: {
    authStatus: "guest",
    userData: { _id: "", status: "guest" },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthUserData: () => {},
} as UserContextI;

// const UserContext = createContext<Partial<UserContextI>>({});
const UserContext = createContext(initialUserState);

export default function ContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [authUserData, setAuthUserData] = useState<AuthUserI>({
    authStatus: "guest",
    userData: { _id: "", status: "guest" },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.getAuthMe();

      setAuthUserData(data);
      setIsInitializing(false);
    };

    fetchData();
  }, []);

  if (isInitializing) {
    return <Preloader />;
  }

  return (
    <UserContext.Provider value={{ authUserData, setAuthUserData }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthData() {
  return useContext(UserContext);
}
