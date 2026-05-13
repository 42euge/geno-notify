import { formatPlain, formatSubject } from "../format.js";

export const name = "email";
export const type = "tool";

export function validate(channelConfig) {
  const errors = [];
  if (!channelConfig?.enabled) errors.push("email channel is not enabled");
  if (!channelConfig?.to) errors.push("email 'to' address is required");
  return { valid: errors.length === 0, errors };
}

export function build(message, channelConfig) {
  const subjectPrefix = channelConfig.subject_prefix || null;
  return {
    tool: "mcp__claude_ai_Gmail__create_draft",
    params: {
      to: channelConfig.to,
      subject: formatSubject(message, subjectPrefix),
      body: formatPlain(message),
    },
  };
}
