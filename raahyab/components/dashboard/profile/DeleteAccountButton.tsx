"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Trash2, X } from "lucide-react";

export function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/account", { method: "DELETE" });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setLoading(false);
      setError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    await signOut({ callbackUrl: "/" });
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
      >
        <Trash2 className="h-4 w-4" />
        Delete account
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-red-300 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-red-900">
        Are you sure? This cannot be undone.
      </p>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Deleting..." : "Yes, delete my account"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-lg border border-black/40 px-4 py-2 text-sm font-medium text-black/80 transition hover:bg-foreground/60"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}