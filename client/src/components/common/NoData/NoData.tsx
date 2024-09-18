import s from "./NoData.module.scss";

export default function NoData({ childrenText }: { childrenText?: string }) {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{childrenText || "No data found."}</div>
    </div>
  );
}

export function EmptyBasket() {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>Your cart is e</div>
    </div>
  );
}
