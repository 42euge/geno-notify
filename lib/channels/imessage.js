export const name = "imessage";
export const type = "tool";

export function validate(channelConfig) {
  const errors = [];
  if (!channelConfig?.enabled) errors.push("imessage channel is not enabled");
  if (!channelConfig?.to) errors.push("imessage 'to' recipient is required");
  return { valid: errors.length === 0, errors };
}

export function build(message, channelConfig) {
  return {
    tool: "imessage_send",
    params: {
      to: channelConfig.to,
      body: [message.title, message.body].filter(Boolean).join(" — "),
    },
    note: "iMessage MCP is read-only. The caller should notify the user that iMessage sending is not supported and suggest an alternative channel.",
  };
}
