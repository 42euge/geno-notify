export const name = "push";
export const type = "tool";

export function validate(channelConfig) {
  if (!channelConfig?.enabled) {
    return { valid: false, errors: ["push channel is not enabled"] };
  }
  return { valid: true, errors: [] };
}

export function build(message, channelConfig) {
  return {
    tool: "PushNotification",
    params: {
      title: message.title || "Notification",
      body: message.body || "",
    },
  };
}
