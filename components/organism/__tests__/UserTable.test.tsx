import { render, screen } from '@testing-library/react'
import { UserTable } from '../UserTable'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { describe, it, expect } from 'vitest'

const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    username: 'johndoe',
    image: 'https://example.com/john.jpg',
    role: 'admin',
    company: {
      name: 'Test Co',
      title: 'Manager',
    },
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    image: 'https://example.com/jane.jpg',
    role: 'user',
    company: {
      name: 'Demo Inc',
      title: 'Developer',
    },
  },
]

describe('UserTable', () => {
  it('renders users in the table correctly', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <UserTable users={mockUsers} />
      </ChakraProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('@johndoe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('Test Co')).toBeInTheDocument()

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('@janesmith')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('user')).toBeInTheDocument()
    expect(screen.getByText('Demo Inc')).toBeInTheDocument()
  })
})
