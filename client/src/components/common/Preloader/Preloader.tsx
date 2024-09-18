import React from "react";
import c from "./Preloader.module.scss";

export default function Preloader() {
  return (
    <div className={c.preloader_box}>
      <div className={c.preloader}>
        <span className={c.loader}></span>
      </div>
    </div>
  );
}
