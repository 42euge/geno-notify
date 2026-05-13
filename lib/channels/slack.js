export const name = "slack";
export const type = "http";

export function validate(channelConfig) {
  const errors = [];
  if (!channelConfig?.enabled) errors.push("slack channel is not enabled");
  if (!channelConfig?.webhook_url) errors.push("slack 'webhook_url' is required");
  return { valid: errors.length === 0, errors };
}

export async function build(message, channelConfig) {
  const blocks = [];

  if (message.title) {
    blocks.push({
      type: "header",
      text: { type: "plain_text", text: message.title },
    });
  }

  if (message.body) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: message.body },
    });
  }

  if (message.url) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `<${message.url}|View>` },
    });
  }

  const payload = {
    text: message.title || message.body || "Notification",
    blocks,
  };

  const res = await fetch(channelConfig.webhook_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return { sent: res.ok, status: res.status };
}
