"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

type AccountActionsProps = {
  isAdmin: boolean;
};

export function AccountActions({ isAdmin }: AccountActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {isAdmin ? (
        <Button asChild variant="secondary">
          <a href="/admin">Open Admin Dashboard</a>
        </Button>
      ) : null}
      <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </Button>
    </div>
  );
}
