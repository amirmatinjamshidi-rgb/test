"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Spinner,
  Center,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";
import { usersApi, User } from "@/lib/api/dummyjson";
import { UserTable } from "@/components/organism/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async (query = "") => {
    setLoading(true);
    try {
      const data = await usersApi.getAll({ q: query });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(search);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={8}>
        <HStack justify="space-between" align="center">
          <Heading size="lg">Users Management</Heading>
          <form onSubmit={handleSearch}>
            <HStack>
              <Input
                placeholder="Search users..."
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
          <UserTable users={users} />
        )}
      </Stack>
    </Container>
  );
}
