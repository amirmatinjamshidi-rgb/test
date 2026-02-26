"use client";

import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Badge,
  HStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { Icon } from "@chakra-ui/react";
import { Product } from "@/lib/api/dummyjson";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="bg.panel"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        height="200px"
        width="100%"
        objectFit="cover"
      />
      <Box p={4}>
        <Stack gap={2}>
          <HStack justify="space-between">
            <Badge colorPalette="cyan">{product.category}</Badge>
            <Text fontWeight="bold" color="cyan.600">
              ${product.price}
            </Text>
          </HStack>
          <Heading size="md" lineClamp={1}>
            {product.title}
          </Heading>
          <Text fontSize="sm" color="fg.muted" lineClamp={2}>
            {product.description}
          </Text>
          <Text fontSize="xs" color="fg.subtle">
            Brand: {product.brand}
          </Text>
          {(onEdit || onDelete) && (
            <ButtonGroup size="sm" mt={2}>
              {onEdit && (
                <Button
                  onClick={() => onEdit(product)}
                  colorPalette="blue"
                  variant="outline"
                  gap={2}
                >
                  <Icon as={Pencil} boxSize={4} />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={() => onDelete(product)}
                  colorPalette="red"
                  variant="outline"
                  gap={2}
                >
                  <Icon as={Trash2} boxSize={4} />
                  Delete
                </Button>
              )}
            </ButtonGroup>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
