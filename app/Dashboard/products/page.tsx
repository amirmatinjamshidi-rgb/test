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
  Field,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { productsApi, Product } from "@/lib/api/dummyjson";
import { ProductCard } from "@/components/molecule/ProductCard";
import { Plus, X } from "lucide-react";
import { Icon } from "@chakra-ui/react";

const emptyProduct = {
  title: "",
  description: "",
  price: 0,
  brand: "",
  category: "",
  thumbnail: "https://via.placeholder.com/150",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState(emptyProduct);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const openCreate = () => {
    setEditingProduct(null);
    setFormValues(emptyProduct);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormValues({
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      thumbnail: product.thumbnail,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingProduct) {
        await productsApi.update(editingProduct.id, formValues);
      } else {
        await productsApi.create(formValues);
      }
      fetchProducts(search);
      closeForm();
    } catch (error) {
      console.error("Error saving product", error);
    } finally {
      setFormLoading(false);
    }
  };

  const openDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    setDeleteLoading(true);
    try {
      await productsApi.delete(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      closeDelete();
    } catch (error) {
      console.error("Error deleting product", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={8}>
        <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Heading size="lg">Products Management</Heading>
          <HStack gap={4}>
            <Button
              onClick={openCreate}
              colorPalette="cyan"
              gap={2}
            >
              <Icon as={Plus} boxSize={4} />
              Add Product
            </Button>
            <form onSubmit={handleSearch}>
              <HStack>
                <Input
                  color="white"
                  bg="gray.800"
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
        </HStack>

        {loading ? (
          <Center py={20}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>

      {/* Create/Edit Modal */}
      <Dialog open={formOpen} onClose={() => closeForm()}>
        <DialogBackdrop className="fixed inset-0 z-50 bg-black/60" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <DialogPanel
            as={Box}
            bg="bg.panel"
            borderRadius="lg"
            p={6}
            maxW="500px"
            w="full"
            borderWidth="1px"
            pointerEvents="auto"
          >
            <HStack justify="space-between" mb={6}>
              <DialogTitle as={Heading} size="md">
                {editingProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeForm}
                aria-label="Close"
              >
                <Icon as={X} boxSize={5} />
              </Button>
            </HStack>

            <form onSubmit={handleFormSubmit}>
              <Stack gap={4}>
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input
                    color="white"
                    bg="gray.800"
                    value={formValues.title}
                    onChange={(e) =>
                      setFormValues((v) => ({ ...v, title: e.target.value }))
                    }
                    placeholder="Product title"
                    required
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input
                    value={formValues.description}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Product description"
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Price</Field.Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formValues.price || ""}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder="0.00"
                    required
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Brand</Field.Label>
                  <Input
                    value={formValues.brand}
                    onChange={(e) =>
                      setFormValues((v) => ({ ...v, brand: e.target.value }))
                    }
                    placeholder="Brand name"
                    color="white"
                    bg="gray.800"
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Category</Field.Label>
                  <Input
                    value={formValues.category}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Category"
                  />
                </Field.Root>
                <HStack justify="flex-end" gap={2} pt={4}>
                  <Button type="button" variant="outline" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorPalette="cyan"
                    loading={formLoading}
                  >
                    {editingProduct ? "Update" : "Create"}
                  </Button>
                </HStack>
              </Stack>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => closeDelete()}>
        <DialogBackdrop className="fixed inset-0 z-50 bg-black/60" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <DialogPanel
            as={Box}
            bg="bg.panel"
            borderRadius="lg"
            p={6}
            maxW="400px"
            w="full"
            borderWidth="1px"
            pointerEvents="auto"
          >
            <DialogTitle as={Heading} size="md" mb={2}>
              Delete Product
            </DialogTitle>
            <Text mb={6} color="fg.muted">
              Are you sure you want to delete &quot;{productToDelete?.title}
              &quot;? This action cannot be undone.
            </Text>
            <HStack justify="flex-end" gap={2}>
              <Button variant="outline" onClick={closeDelete}>
                Cancel
              </Button>
              <Button
                colorPalette="red"
                onClick={handleDelete}
                loading={deleteLoading}
              >
                Delete
              </Button>
            </HStack>
          </DialogPanel>
        </div>
      </Dialog>
    </Container>
  );
}
