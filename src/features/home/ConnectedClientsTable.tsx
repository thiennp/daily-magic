import type ConnectedClient from "@/features/home/types/ConnectedClient.type";
import { formatClientId } from "@/features/home/formatClientId";
import { formatConnectedAt } from "@/features/home/formatConnectedAt";

interface ConnectedClientsTableProps {
  readonly clients: readonly ConnectedClient[];
}

export default function ConnectedClientsTable({
  clients,
}: ConnectedClientsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-3 py-2">Client</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Connected at</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-b border-gray-100 dark:border-gray-800/80"
            >
              <td className="px-3 py-2 font-mono text-xs text-gray-700 dark:text-gray-300">
                {formatClientId(client.id)}
              </td>
              <td className="px-3 py-2">{client.role}</td>
              <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                {formatConnectedAt(client.connectedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
