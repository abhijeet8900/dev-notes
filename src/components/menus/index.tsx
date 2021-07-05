import { MouseEventHandler } from "react";
import "./menus.scss";

type menu = {
  label: string;
  onClick: MouseEventHandler;
  icon: any;
};

interface props {
  menus: menu[];
}

const Menus = (props: props) => {
  return (
    <div className="menus-container">
      {props.menus.map((menu: menu) => (
        <span onClick={menu.onClick} className="menu" aria-label="Text">
          {menu.icon}
        </span>
      ))}
    </div>
  );
};
export default Menus;
