export interface MacDeviceRowInnerProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isConnected: boolean;
  readonly detailText?: string;
  readonly detailWarning?: boolean;
  readonly isThisMac?: boolean;
  readonly showAnotherComputerBadge?: boolean;
  readonly isSelected: boolean;
  readonly isEditing: boolean;
  readonly onSelect?: () => void;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onDelegateTask?: (deviceId: string) => void;
  readonly onOpenShell?: () => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}
