import { fireEvent, render } from "@testing-library/react";
import Menus from ".";

describe("Menus Component : ", () => {
  it("Renders menus ", async () => {
    const mockedMenus = [
      {
        icon: <div data-testid="Theme" />,
        label: "Theme",
        onClick: () => {},
      },
      {
        label: "Font",
        icon: <div data-testid="Font" />,
        onClick: () => {},
      },
      {
        label: "Save",
        icon: <div data-testid="Save" />,
        onClick: () => {},
      },
    ];
    const { getByTestId } = render(<Menus menus={mockedMenus} />);
    mockedMenus.forEach((menu) => {
      expect(getByTestId(menu.label)).toBeTruthy();
    });
  });

  it("To have clickable menus ", async () => {
    let clicked = false;
    const mockedMenus = [
      {
        icon: <div data-testid="test-menu" />,
        label: "TestMenu",
        onClick: () => {
          clicked = true;
        },
      },
    ];
    const { getByTestId } = render(<Menus menus={mockedMenus} />);
    expect(clicked).toBeFalsy();
    fireEvent.click(getByTestId("test-menu"));
    expect(clicked).toBeTruthy();
  });
});
