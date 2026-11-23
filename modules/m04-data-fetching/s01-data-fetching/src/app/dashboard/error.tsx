"use client";

export default function DashboardError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <div>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      <button type="button" onClick={() => retry()}>
        Try again
      </button>
    </div>
  );
}
