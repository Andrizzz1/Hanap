"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth/auth.client";

export default function MarkDashboardVisited({
  hasVisited,
}: {
  hasVisited: boolean;
}) {
  useEffect(() => {
    if (hasVisited) return;

    async function markVisited() {
      const { error } = await authClient.updateUser({
        hasVisitedDashboard: true,
      });

      if (error) {
        console.error("Could not save dashboard visit:", error.message);
      }
    }

    void markVisited();
  }, [hasVisited]);

  return null;
}