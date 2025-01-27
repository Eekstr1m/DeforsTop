import styled from "styled-components";
import AdminHeader from "../components/AdminPage/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminPage/AdminSidebar/AdminSidebar";
import { useAuthData } from "../provider/provider";
import { Navigate, Outlet } from "react-router-dom";

export default function Admin() {
  const { authUserData } = useAuthData();

  if ("role" in authUserData) {
    if (authUserData.role === "admin") {
      return (
        <>
          <AdminHeader />
          <Wrapper>
            <AdminSidebar />
            <Outlet />
          </Wrapper>
        </>
      );
    } else return <Navigate to={"/profile"} />;
  } else return <Navigate to={"/login"} />;
}

const Wrapper = styled.div`
  /* display: grid; */
  /* grid-template-columns: 200px 1fr; */
  display: flex;
  gap: 20px;
`;
