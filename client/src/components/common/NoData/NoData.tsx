import s from "./NoData.module.scss";

export default function NoData({ children }: { children?: React.ReactNode }) {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{children || "No data found."}</div>
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
