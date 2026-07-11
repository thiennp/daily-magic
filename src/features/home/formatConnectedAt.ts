export function formatConnectedAt(connectedAt: string): string {
  const date = new Date(connectedAt);

  if (Number.isNaN(date.getTime())) {
    return connectedAt;
  }

  return date.toLocaleString();
}
