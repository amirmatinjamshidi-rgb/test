import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../page";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { describe, it, expect, vi } from "vitest";
import { authApi } from "@/lib/api/dummyjson";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/lib/api/dummyjson", () => ({
  authApi: {
    login: vi.fn(),
  },
}));

describe("LoginPage", () => {
  it("renders login form and handles submission", async () => {
    const mockToken = "test-token";
    vi.mocked(authApi.login).mockResolvedValue({
      token: mockToken,
      firstName: "Emily",
      id: 0,
      username: "",
      email: "",
      lastName: "",
      gender: "",
      image: "",
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <LoginPage />
      </ChakraProvider>,
    );

    expect(screen.getByText("Log in to your account")).toBeInTheDocument();

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpass",
      });
    });
  });

  it("displays error message on login failure", async () => {
    vi.mocked(authApi.login).mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <LoginPage />
      </ChakraProvider>,
    );

    const submitButton = screen.getByText("Sign in");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
