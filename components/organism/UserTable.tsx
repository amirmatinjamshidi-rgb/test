"use client";

import {
  Box,
  Table,
  HStack,
  Avatar,
  Stack,
  Text,
  Badge,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { User } from "@/lib/api/dummyjson";

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export const UserTable = ({
  users,
  onEdit,
  onDelete,
}: UserTableProps) => {
  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" bg="bg.panel">
      <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>User</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Company</Table.ColumnHeader>
            {(onEdit || onDelete) && (
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            )}
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
              {(onEdit || onDelete) && (
                <Table.Cell>
                  <ButtonGroup size="sm">
                    {onEdit && (
                      <Button
                        onClick={() => onEdit(user)}
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
                        onClick={() => onDelete(user)}
                        colorPalette="red"
                        variant="outline"
                        gap={2}
                      >
                        <Icon as={Trash2} boxSize={4} />
                        Delete
                      </Button>
                    )}
                  </ButtonGroup>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
