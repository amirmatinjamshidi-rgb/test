"use client";

import {
  Box,
  Table,
  HStack,
  Avatar,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { User } from "@/lib/api/dummyjson";

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" bg="bg.panel">
      <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>User</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Company</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <HStack gap={3}>
                  <Avatar.Root size="sm">
                    <Avatar.Image src={user.image} />
                    <Avatar.Fallback
                      name={`${user.firstName} ${user.lastName}`}
                    />
                  </Avatar.Root>
                  <Stack gap={0}>
                    <Text fontWeight="medium">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      @{user.username}
                    </Text>
                  </Stack>
                </HStack>
              </Table.Cell>
              <Table.Cell color="green.300">{user.email}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={user.role === "admin" ? "red" : "green"}>
                  {user.role || "User"}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Stack gap={0}>
                  <Text fontSize="sm">{user.company.name}</Text>
                  <Text fontSize="xs" color="fg.muted">
                    {user.company.title}
                  </Text>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
