import { Role } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { getMockUserByEmail } from "@/lib/mock-users";
import { prisma } from "@/lib/prisma";

const demoAdmin = {
  id: "demo-admin-user",
  name: "HopKicks Admin",
  email: "admin@hopkicks.pk",
  password: "Admin123!",
  role: Role.ADMIN
};

export const authOptions: NextAuthOptions = {
  adapter: prisma ? PrismaAdapter(prisma) : undefined,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/account/sign-in"
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        if (
          credentials.email.toLowerCase() === demoAdmin.email &&
          credentials.password === demoAdmin.password
        ) {
          return {
            id: demoAdmin.id,
            name: demoAdmin.name,
            email: demoAdmin.email,
            role: demoAdmin.role
          };
        }

        const mockUser = getMockUserByEmail(credentials.email);

        if (mockUser) {
          const isValid = await bcrypt.compare(credentials.password, mockUser.password);

          if (!isValid) {
            return null;
          }

          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role
          };
        }

        if (!prisma) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase()
          }
        });

        if (!user?.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role | undefined) ?? Role.CUSTOMER;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const demoAdminCredentials = {
  email: demoAdmin.email,
  password: demoAdmin.password
};
