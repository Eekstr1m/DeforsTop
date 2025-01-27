import { BaseAssetsPath } from "../../../API/api";
import s from "./Image.module.scss";

export default function CustomImage({ thumbnail }: { thumbnail: string }) {
  const path = imagePathCreator(thumbnail);

  return (
    <div>
      <img className={s.img} src={path} />
    </div>
  );
}

function imagePathCreator(thumbnail: string) {
  const http = new XMLHttpRequest();

  http.open("HEAD", BaseAssetsPath + thumbnail, false);
  http.send();

  const path =
    http.status === 404
      ? BaseAssetsPath + "placeholder.png"
      : BaseAssetsPath + thumbnail;
  return path;
}
