interface UserInfoCardDetailsProps {
  readonly fields: readonly {
    readonly label: string;
    readonly value: string;
  }[];
}

export default function UserInfoCardDetails({
  fields,
}: UserInfoCardDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
      {fields.map((field) => (
        <div key={field.label}>
          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            {field.label}
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {field.value}
          </p>
        </div>
      ))}
    </div>
  );
}
