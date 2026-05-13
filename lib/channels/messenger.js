export const name = "messenger";
export const type = "placeholder";

export function validate(channelConfig) {
  if (!channelConfig?.enabled) {
    return { valid: false, errors: ["messenger channel is not enabled"] };
  }
  return { valid: false, errors: ["messenger channel is not configured — Meta integration pending"] };
}

export function build(message, channelConfig) {
  return { error: "messenger channel is not configured" };
}
