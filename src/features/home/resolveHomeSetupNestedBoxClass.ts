export default function resolveHomeSetupNestedBoxClass(
  embedded: boolean,
  boxClass: string,
  embeddedClass = "",
): string {
  return embedded ? embeddedClass : boxClass;
}
