import CustomButton from "../../common/Button/CustomButton";
import s from "./MainBanner.module.scss";

export default function MainBanner() {
  return (
    <div className={s.wrapper}>
      <div className={s.bg_image}>
        <div className={s.content}>
          <h1 className={s.title}>
            DeforsTop - Your Ultimate Electronics Store
          </h1>
          <CustomButton link={"/category"}>
            <div>Shop now</div>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
