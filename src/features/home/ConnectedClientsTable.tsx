import type ConnectedClient from "@/features/home/types/ConnectedClient.type";
import { formatClientId } from "@/features/home/formatClientId";
import { formatConnectedAt } from "@/features/home/formatConnectedAt";

interface ConnectedClientsTableProps {
  readonly clients: readonly ConnectedClient[];
}

const formatClientLabel = (client: ConnectedClient): string => {
  if (client.role === "agent" && client.deviceLabel) {
    return client.deviceLabel;
  }

  if (client.role === "dashboard") {
    return "Browser";
  }

  return formatClientId(client.id);
};

export default function ConnectedClientsTable({
  clients,
}: ConnectedClientsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-3 py-2">Connection</th>
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
              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                <span className="text-sm">{formatClientLabel(client)}</span>
                {client.role === "agent" ? (
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-800 px-2 py-0.5 text-xs font-medium text-white">
                    Online
                  </span>
                ) : null}
              </td>
              <td className="px-3 py-2 capitalize">{client.role}</td>
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
