"use client";

import { Providers } from "./providers";
import { useEffect } from "react";
import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  Link,
  HStack,
  Avatar,
  IconButton,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Users, LogOut, Menu } from "lucide-react";

const NAV_ITEMS = [
  { label: "Products", icon: Package, href: "/Dashboard/products" },
  { label: "Users", icon: Users, href: "/Dashboard/users" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/Dashboard/Login";

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token && !isLoginPage) {
      router.push("/Dashboard/Login");
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return (
      <Providers>
        <Box minH="100vh" bg="bg.canvas">
          <Box px={4} pt={4}>
            <Link href="/" color="cyan.600" _hover={{ textDecoration: "underline" }} fontSize="sm">
              ← Back to main menu
            </Link>
          </Box>
          {children}
        </Box>
      </Providers>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    router.push("/Dashboard/Login");
  };

  return (
    <Providers>
      <Flex minH="100vh" bg="bg.canvas">
        <Box
          w={{ base: "full", md: "240px" }}
          pos="fixed"
          h="full"
          bg="bg.panel"
          borderRightWidth="1px"
          display={{ base: "none", md: "block" }}
        >
          <Stack h="full" p={4} gap={6}>
            <HStack px={2} gap={3}>
              <Icon as={LayoutDashboard} color="cyan.600" boxSize={6} />
              <Text fontSize="xl" fontWeight="bold">
                Admin Dash
              </Text>
            </HStack>

            <Stack gap={1} flex={1}>
              <Link
                href="/"
                px={3}
                py={2}
                borderRadius="md"
                color="fg.muted"
                _hover={{ bg: "gray.100", color: "fg.default" }}
                fontSize="sm"
                style={{ textDecoration: "none" }}
              >
                ← Back to main menu
              </Link>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ textDecoration: "none" }}
                  >
                    <HStack
                      px={3}
                      py={2}
                      borderRadius="md"
                      bg={isActive ? "cyan.50" : "transparent"}
                      color={isActive ? "cyan.700" : "fg.muted"}
                      _hover={{ bg: "gray.100", color: "fg.default" }}
                      transition="all 0.2s"
                    >
                      <Icon as={item.icon} boxSize={5} />
                      <Text fontWeight={isActive ? "semibold" : "medium"}>
                        {item.label}
                      </Text>
                    </HStack>
                  </Link>
                );
              })}
            </Stack>

            <Stack gap={4} pt={4} borderTopWidth="1px">
              <HStack px={2} gap={3}>
                <Avatar.Root size="sm">
                  <Avatar.Fallback name="Admin" />
                </Avatar.Root>
                <Box overflow="hidden">
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="fg.subtle"
                    truncate
                  >
                    Admin User
                  </Text>
                  <Text fontSize="xs" color="fg.success" truncate>
                    admin@example.com
                  </Text>
                </Box>
              </HStack>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={3}
                onClick={handleLogout}
                colorPalette="red"
                size="sm"
              >
                <Icon as={LogOut} boxSize={4} />
                Logout
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box ml={{ base: 0, md: "240px" }} w="full">
          <Flex
            display={{ base: "flex", md: "none" }}
            px={4}
            h="60px"
            align="center"
            bg="bg.subtle"
            borderBottomWidth="1px"
            justify="space-between"
          >
            <HStack gap={3} flex={1}>
              <Link href="/" fontSize="sm" color="cyan.600" _hover={{ textDecoration: "underline" }} style={{ textDecoration: "none" }}>
                ← Main menu
              </Link>
              <Icon as={LayoutDashboard} color="cyan.600" boxSize={6} />
              <Text fontWeight="bold" color="fg.warning">
                Admin Dash
              </Text>
            </HStack>
            <IconButton aria-label="Menu" variant="ghost">
              <Menu />
            </IconButton>
          </Flex>

          <Box as="main" p={{ base: 4, md: 8 }}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Providers>
  );
}
