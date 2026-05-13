# geno-notify

Universal notification hub for the geno ecosystem.

## Structure

```
lib/
  notify.js       — Main API: loadConfig(), send(), broadcast(), sendProfile()
  config.js       — YAML config loader (~/.geno/notify.yaml)
  format.js       — Message formatting helpers
  channels/
    index.js      — Channel registry (Map of name -> adapter)
    push.js       — PushNotification tool adapter
    email.js      — Gmail MCP tool adapter
    imessage.js   — iMessage adapter (read-only MCP, informational)
    discord.js    — Discord webhook (direct HTTP)
    slack.js      — Slack webhook (direct HTTP)
    sms.js        — Twilio SMS placeholder
    whatsapp.js   — Twilio WhatsApp placeholder
    messenger.js  — Meta Messenger placeholder
skills/
  geno-notify/
    SKILL.md      — Slash command manifest
```

## Config

Config file: `~/.geno/notify.yaml`

Sections:
- `defaults.channels` — array of channel names for broadcast()
- `channels.<name>` — per-channel config (enabled, credentials, etc.)
- `profiles.<name>` — named groups of channels with optional overrides

## Adapter types

- **tool** — Returns `{ tool, params }` for the calling agent to invoke via MCP or built-in tools. The agent must actually call the tool.
- **http** — Makes the HTTP request directly (e.g., Discord/Slack webhooks). Returns `{ sent, status }`.
- **placeholder** — Stub for unimplemented integrations. Returns an error.

## Adding a new channel

1. Create `lib/channels/<name>.js` exporting: `name`, `type`, `validate(config)`, `build(message, config)`
2. Import and register it in `lib/channels/index.js`
3. Add default config to `~/.geno/notify.yaml`

## Dependencies

- `js-yaml` for YAML parsing
- Node.js built-in `fetch` for HTTP channels (Node 18+)
