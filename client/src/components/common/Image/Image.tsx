import { BaseURL } from "../../../API/api";
import s from "./Image.module.scss";

export default function Image({ thumbnail }: { thumbnail: string }) {
  return (
    <div>
      <img className={s.img} src={`${BaseURL}/assets/` + thumbnail} />
    </div>
  );
}
