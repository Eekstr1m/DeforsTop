import React from "react";
import s from "./CustomButton.module.scss";
import { Link } from "react-router-dom";

type ButtonTypes = {
  children: JSX.Element;
  link: string;
  style?: React.CSSProperties;
};

type CategoryButtonTypes = {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
};

export default function CustomButton({ children, link, style }: ButtonTypes) {
  return (
    <Link to={link}>
      <div className={s.btn} style={style}>
        {children}
      </div>
    </Link>
  );
}

export function CustomButtonStyle({
  children,
  style,
}: {
  children: JSX.Element;
  style?: React.CSSProperties;
}) {
  return (
    <div className={s.btn} style={style}>
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const CustomBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button type="submit" className={s.btn} {...props}>
      {children}
    </button>
  );
};

// export function CustomBtn({
//   children,
//   style,
//   type,
// }: {
//   children: JSX.Element;
//   style?: React.CSSProperties;
//   type: React.ButtonHTMLAttributes<HTMLButtonElement>;
// }) {
//   return (
//     <button className={s.btn} type={type} style={style}>
//       {children}
//     </button>
//   );
// }

export function CategoryButton({
  children,
  onClick,
  style,
}: CategoryButtonTypes) {
  return (
    <div className={s.btn} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
