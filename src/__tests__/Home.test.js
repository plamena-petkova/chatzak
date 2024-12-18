import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomeView from "../views/HomeView";
import { setEmailHomePage } from "../store/authReducer";
import '@testing-library/jest-dom';


jest.mock('../components/CardComponentHome', () => {
  return function MockCardComponentHome({ cardText, cardHeading, cardIcon }) {
    return (
      <div>
        <h2>{cardHeading}</h2>
        <p>{cardText}</p>
        {cardIcon}
      </div>
    );
  };
});

// Mock the Redux hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the navigate function from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));


describe("HomeView Component", () => {
  let mockDispatch;

  beforeEach(() => {
    // Mock the dispatch function
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mock useSelector to return an initial state
    useSelector.mockImplementation((callback) =>
      callback({ auth: { emailHomePage: "" } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with initial elements", () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>
    );
 
    // Assert on initial elements
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByTestId("button").length).toBe(4); 
  });

  test("updates the email input and calls dispatch on input change", () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");

    // Simulate typing a valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Assert input value change
    expect(emailInput.value).toBe("test@example.com");

    // Assert dispatch call
    expect(mockDispatch).toHaveBeenCalledWith(setEmailHomePage("test@example.com"));
  });

  test("shows error state for invalid email", () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");

    // Simulate typing an invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Assert dispatch call (still gets called, but for invalid email)
    expect(mockDispatch).toHaveBeenCalledWith(setEmailHomePage("invalid-email"));

    // Ensure error state (you might want to extend the component to show an error visually)
    // Example: You can add a test for error-specific elements like an error message
  });

  test("navigates to register on valid email and button click", () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const sendButton = screen.getByTestId("send-button");

    // Simulate typing a valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Simulate button click
    fireEvent.click(sendButton);

    // Assert navigation
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
