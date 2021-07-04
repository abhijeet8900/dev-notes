import { MouseEventHandler } from "react";
import "./menus.scss";



type menu = {
  label: string;
  onClick: MouseEventHandler;
};

interface props {
  menus: menu[];
}

const Menus = (props: props) => {
  return (
    <div className="menus-container">
      {props.menus.map((menu: menu) => (
        <span onClick={menu.onClick} className="menu">
          {menu.label}
        </span>
      ))}
    </div>
  );
};
export default Menus;
