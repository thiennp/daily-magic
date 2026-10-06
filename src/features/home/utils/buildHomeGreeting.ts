interface BuildHomeGreetingInput {
  readonly displayName: string;
  readonly attentionCount: number;
  readonly isBrandNew: boolean;
  readonly now?: Date;
}

const partOfDay = (hours: number): string => {
  if (hours < 5) return "Good evening";
  if (hours < 12) return "Good morning";
  if (hours < 18) return "Good afternoon";
  return "Good evening";
};

/** Design greeting: time-of-day + name + attention hint. */
const buildHomeGreeting = ({
  displayName,
  attentionCount,
  isBrandNew,
  now = new Date(),
}: BuildHomeGreetingInput): string => {
  const part = partOfDay(now.getHours());
  const name = displayName.trim() || "there";
  if (isBrandNew) {
    return `Welcome, ${name}. Connect this computer to get started.`;
  }
  if (attentionCount <= 0) {
    return `${part}, ${name}. Nothing needs you right now.`;
  }
  if (attentionCount === 1) {
    return `${part}, ${name}. 1 thing needs you.`;
  }
  return `${part}, ${name}. ${attentionCount} things need you.`;
};

export default buildHomeGreeting;
