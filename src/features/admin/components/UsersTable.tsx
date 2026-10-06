import Button from "@/components/ui/button/Button";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface UserItem {
  readonly id: string;
  readonly email: string;
  readonly name: string | null;
  readonly globalRole: string;
}

interface UsersTableProps {
  readonly users: readonly UserItem[];
  readonly currentUserId?: string;
  readonly onRemoveRequest: (userId: string) => void;
}

export default function UsersTable({
  users,
  currentUserId,
  onRemoveRequest,
}: UsersTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Global role</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-100 dark:border-gray-800/80"
            >
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">
                {formatGlobalRole(user.globalRole as GlobalRoleValue)}
              </td>
              <td className="px-3 py-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={user.id === currentUserId}
                  onClick={() => {
                    onRemoveRequest(user.id);
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { UserItem };
