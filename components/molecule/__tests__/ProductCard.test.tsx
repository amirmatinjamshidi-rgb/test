import { render, screen } from "@testing-library/react";
import { ProductCard } from "../ProductCard";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { describe, it, expect } from "vitest";

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 99.99,
  thumbnail: "/file.svg",
  category: "test-category",
  brand: "test-brand",
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  images: ["/file.svg"],
};

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ProductCard product={mockProduct} />
      </ChakraProvider>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("test-category")).toBeInTheDocument();
    expect(screen.getByText("Brand: test-brand")).toBeInTheDocument();
  });
});
