export const name = "discord";
export const type = "http";

export function validate(channelConfig) {
  const errors = [];
  if (!channelConfig?.enabled) errors.push("discord channel is not enabled");
  if (!channelConfig?.webhook_url) errors.push("discord 'webhook_url' is required");
  return { valid: errors.length === 0, errors };
}

export async function build(message, channelConfig) {
  const payload = {
    content: message.body || message.title || "",
    embeds: [],
  };

  if (message.title) {
    payload.embeds.push({
      title: message.title,
      description: message.body || "",
      url: message.url || undefined,
    });
    payload.content = "";
  }

  const res = await fetch(channelConfig.webhook_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return { sent: res.ok, status: res.status };
}
