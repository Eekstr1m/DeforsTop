import CustomButton from "../../common/Button/CustomButton";
import s from "./AboutBlock.module.scss";

export default function AboutBlock() {
  return (
    <div className={s.wrapper}>
      <div className={s.bg_image}>
        <div className={s.content}>
          <h1 className={s.title}>Your Safety, Our Priority</h1>
          <div className={s.desc}>
            At DeforsTop, we believe that safety is paramount. We are committed
            to providing our customers with the latest and most advanced
            technology to ensure their safety and security. Shop with us and
            experience the peace of mind that comes with knowing that you are
            protected by the best electronics on the market.
          </div>
          <div>
            <CustomButton link={"/about"}>
              <div>About Us</div>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
