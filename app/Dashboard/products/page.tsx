"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Spinner,
  Center,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";
import { productsApi, Product } from "@/lib/api/dummyjson";
import { ProductCard } from "@/components/molecule/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const data = await productsApi.getAll({ q: query });
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={8}>
        <HStack justify="space-between" align="center">
          <Heading size="lg">Products Management</Heading>
          <form onSubmit={handleSearch}>
            <HStack>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                maxW="300px"
              />
              <Button type="submit" colorPalette="cyan">
                Search
              </Button>
            </HStack>
          </form>
        </HStack>

        {loading ? (
          <Center py={20}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
