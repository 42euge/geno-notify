# geno-notify

Universal notification hub for the geno ecosystem. Provides a unified API for sending notifications across multiple channels from Claude Code agents.

## Install

```bash
npm install
```

## Usage

```js
import { loadConfig, send, broadcast, sendProfile } from "geno-notify";

// Send to a single channel
const result = await send("push", { title: "Build done", body: "All tests passed" });
// -> { type: "tool", channel: "push", tool: "PushNotification", params: { title: "Build done", body: "All tests passed" } }

// Broadcast to all default channels
const results = await broadcast({ title: "Deploy complete", body: "v1.2.0 is live" });

// Send via a named profile
const results = await sendProfile("camp-alerts", { title: "Alert", body: "Something happened" });
```

## Channel types

| Channel   | Type        | Notes                              |
|-----------|-------------|------------------------------------|
| push      | tool        | Claude Code PushNotification       |
| email     | tool        | Gmail MCP create_draft             |
| imessage  | tool        | Read-only MCP (informational only) |
| discord   | http        | Webhook POST                       |
| slack     | http        | Webhook POST                       |
| sms       | placeholder | Twilio (pending)                   |
| whatsapp  | placeholder | Twilio (pending)                   |
| messenger | placeholder | Meta (pending)                     |

## Config

Edit `~/.geno/notify.yaml` to configure channels and profiles.

## Skill

Use `/geno-notify` in Claude Code to send notifications from any agent session.
