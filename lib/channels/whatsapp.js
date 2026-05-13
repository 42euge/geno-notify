export const name = "whatsapp";
export const type = "placeholder";

export function validate(channelConfig) {
  if (!channelConfig?.enabled) {
    return { valid: false, errors: ["whatsapp channel is not enabled"] };
  }
  return { valid: false, errors: ["whatsapp channel is not configured — Twilio integration pending"] };
}

export function build(message, channelConfig) {
  return { error: "whatsapp channel is not configured" };
}
