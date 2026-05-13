export const name = "sms";
export const type = "placeholder";

export function validate(channelConfig) {
  if (!channelConfig?.enabled) {
    return { valid: false, errors: ["sms channel is not enabled"] };
  }
  return { valid: false, errors: ["sms channel is not configured — Twilio integration pending"] };
}

export function build(message, channelConfig) {
  return { error: "sms channel is not configured" };
}
