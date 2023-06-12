import { RootState } from "@/redux/";
import { change as changeDriver } from "@/redux/driverSlice";
import { change as ChangeMenu } from "@/redux/menuSlice";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

const menuItems = [
  {
    id: "menu-1",
    value: "drivers",
  },
  {
    id: "menu-2",
    value: "teams",
  },
  {
    id: "menu-3",
    value: "races",
  },
];

interface menuItemProps {
  id: string;
  value: string;
}

function Menu() {
  const dispatch = useDispatch();
  const menuValue = useSelector((state: RootState) => state.menu.value);
  const driverValue = useSelector((state: RootState) => state.driver.value);

  const changeMenuItem = (value: string) => {
    dispatch(ChangeMenu(value));
    console.log('driverValue', driverValue);
    if (driverValue) dispatch(changeDriver(""));
  };

  return (
    <ul className="menu">
      {menuItems.map(({ value, id }: menuItemProps) => (
        <li
          key={id}
          className={clsx([
            "menu_item",
            value === menuValue && !driverValue ? "menu_item--active" : "",
          ])}
          onClick={() => changeMenuItem(value)}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
