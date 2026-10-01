const DEFAULT_AGENT_WITCH_PROJECT_NAME = "Default";

const isDefaultAgentWitchProjectName = (name: string): boolean =>
  name.trim().toLowerCase() === DEFAULT_AGENT_WITCH_PROJECT_NAME.toLowerCase();

export default isDefaultAgentWitchProjectName;
