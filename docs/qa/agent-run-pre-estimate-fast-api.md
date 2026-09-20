# Pre-estimate with fast Writer API models

## Short answer

Set `preEstimateWriterMode` to `"fast-api"` in `~/.agent-witch/config.json` (or per-profile `config.json`). Time estimates before a task run use **Writer API** with a fixed cheap/fast model when an API key exists; the **main task** still uses your chosen writer and backend.

## Config

```json
{
  "preEstimateWriterMode": "fast-api"
}
```

Default is `"same"` (estimate uses the same headless writer as the task).

## Model selection (`fast-api`)

Uses the first provider with a saved key in `writer-api-secrets.json`, in order:

1. **Google** — `gemini-2.0-flash`
2. **OpenAI** — `gpt-4.1-mini`
3. **Anthropic** — `claude-3-5-haiku-20241022`

Stored per-provider `model` in secrets is **ignored** for this step so estimates stay on the fast tier.

If no API key is available, behavior falls back to `"same"`.

## Query aliases

- pre estimate fast api cheap model
- estimate task writer api flash haiku
- preEstimateWriterMode fast-api
- ước lượng task model rẻ nhanh
