import { Link, redirect } from "react-router-dom";
import { AuthUserDataI, GuestUserDataI } from "../../interfaces/authUser";
import s from "./ProfilePage.module.scss";
import { API } from "../../API/api";

export default function ProfilePage({
  authUserData,
  setAuthUserData,
}: {
  authUserData: AuthUserDataI;
  setAuthUserData: React.Dispatch<
    React.SetStateAction<AuthUserDataI | GuestUserDataI>
  >;
}) {
  const dateOfBirth = authUserData.birth
    ? new Date(authUserData.birth).toISOString().split("T")[0]
    : "Not specified";

  const onClickHandler = async () => {
    const logOutData = await API.logout();

    if (logOutData.status === 200) {
      setAuthUserData(logOutData.data);
    } else
      setAuthUserData({
        _id: "",
        status: "guest",
      });
    return redirect("/login");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <h2>Welcome to your account</h2>
      </div>
      <div className={s.profile}>
        <div className={s.profile_categories}>
          <div className={s.categories_item}>Personal information</div>
          {authUserData.role === "admin" && (
            <div className={s.categories_item}>
              <Link to={"/admin"}>Admin panel</Link>
            </div>
          )}
          <div
            className={`${s.categories_item} ${s.logOut}`}
            onClick={() => onClickHandler()}
          >
            Log out <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
        <div className={s.profile_info}>
          <div className={s.info_wrapper}>
            <div className={s.info_item}>
              <span>Name</span>
              <span>
                {authUserData.firstName
                  ? authUserData.firstName
                  : "Not specified"}
              </span>
            </div>
            <div className={s.info_item}>
              <span>Surname</span>
              <span>
                {authUserData.lastName
                  ? authUserData.lastName
                  : "Not specified"}
              </span>
            </div>
            <div className={s.info_item}>
              <span>Date of birth</span>
              <span>{dateOfBirth}</span>
            </div>
            <div className={s.info_item}>
              <span>E-mail</span>
              <span>
                {authUserData.email ? authUserData.email : "Not specified"}
              </span>
            </div>
            <div className={s.info_item}>
              <span>Phone</span>
              <span>
                {authUserData.phone ? authUserData.phone : "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
