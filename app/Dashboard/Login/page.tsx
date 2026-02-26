/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/dummyjson";

export default function LoginPage() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login({ username, password });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/Dashboard/products");
    } catch (err: any) {
      console.error("Login failed", err);
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your username or password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack gap="8">
        <Stack gap="6" textAlign="center">
          <Heading size="xl">Welocme to task 1</Heading>
          <Text color="fg.muted">Login to see products and users</Text>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "border.info" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form onSubmit={handleLogin}>
            <Stack gap="6">
              <Stack gap="5">
                {error && (
                  <Text color="red.500" fontSize="sm" textAlign="center">
                    {error}
                  </Text>
                )}
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input
                    color="white"
                    bg="gray.800"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    color="white"
                    bg="gray.800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </Field.Root>
              </Stack>
              <Stack gap="4">
                <Button type="submit" loading={isLoading} colorPalette="cyan">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
