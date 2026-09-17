import { isNonNullObject } from "guardz";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  isNonNullObject(value);

export default isRecord;
