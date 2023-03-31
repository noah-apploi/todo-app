import {render as baseRender, waitFor} from "@testing-library/react";
import { TodoForm } from "./todo-form";
import user from "@testing-library/user-event";
import {suppressActWarnings} from "../test-utils";

describe("<TodoForm />", () => {
  let render;
  let queryForTitleInput;
  let typeInTitleInput;
  let queryForAddItemButton;
  let saveTodo;
  suppressActWarnings()

  beforeEach(() => {
    saveTodo = jest.fn();

    render = () => {
      const renderResult = baseRender(<TodoForm saveTodo={saveTodo} />);

      const { queryByTestId } = renderResult;

      queryForTitleInput = () => queryByTestId("todo-form.title-input");

      typeInTitleInput = async (text) => {
        await waitFor(async () => {

          await user.type(queryForTitleInput(), text);

          expect(queryForTitleInput()).toHaveValue(text);
        });
      };

      queryForAddItemButton = () => queryByTestId("todo-form.add-item");

      return renderResult;
    };
  });

  it("renders the title of the todo form", () => {
    const { queryByText } = render();

    expect(queryByText("Noah's Todo App")).not.toBeNull();
  });

  it("allows the user to type a todo item title", async () => {
    render();

    await user.type(queryForTitleInput(), "Do laundry");

    expect(queryForTitleInput()).toHaveValue("Do laundry");
  });

  it("renders an add item button", () => {
    render();

    expect(queryForAddItemButton()).not.toBeNull();
  });

  it("saves the todo when the add button is clicked", async () => {
    render();

    expect(saveTodo).not.toHaveBeenCalled();

    await typeInTitleInput("Learn Di");
    user.click(queryForAddItemButton());

    expect(saveTodo).toHaveBeenCalledTimes(1);
    expect(saveTodo).toHaveBeenCalledWith({
      title: "Learn Di",
    });
  });
});

/*
Todo List Todo list:

saves the todo item when the add item button is clicked by the user 
(so the contents of the title-input turn blank) and the contents turn into a span with an x button 

*/
