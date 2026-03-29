import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};

let mockUsers: MockUser[] = [];

export function getMockUserByEmail(email: string) {
  return mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function addMockUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user: MockUser = {
    id: `mock-user-${Date.now()}`,
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashedPassword,
    role: Role.CUSTOMER
  };

  mockUsers = [user, ...mockUsers];
  return user;
}
