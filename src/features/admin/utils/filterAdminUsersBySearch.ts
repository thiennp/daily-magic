/** Case-insensitive match on email (and name when present). Empty query keeps all. */
const filterAdminUsersBySearch = <
  T extends { readonly email: string; readonly name?: string | null },
>(
  users: readonly T[],
  query: string,
): readonly T[] => {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) {
    return users;
  }
  return users.filter((user) =>
    `${user.name ?? ""} ${user.email}`.toLowerCase().includes(needle),
  );
};

export default filterAdminUsersBySearch;
