# Workflow file upload and semantic run output

## Query aliases

- upload PDF workflow question
- workflow file field image attach
- semantic output artifact marker
- agent run summary tab terminal

## Short answer

Workflows support a **File (PDF or image)** input type (Design A): upload in AWC, text is extracted server-side, field value stores `aw-upload:<id>`, prompt lines use extracted text plus a **signed agent download URL** (Design B, 24h) for Mac `curl`. Agent runs can emit `[[ARTIFACT]]…[[/ARTIFACT]]` blocks; AWC shows a **Summary** tab (plus job **Result** view). **Output schema** is stored on publish and editable in Create/Edit workflow (optional outputs list).

## Details

### File input (Design A)

- Builder: Input type **File (PDF or image)**; optional accept via field `accept` (`pdf`, `image`).
- Run: dropzone → `POST /api/workflows/field-uploads` → ref + excerpt; download via `GET /api/workflows/field-uploads?uploadId=`.
- Storage: Postgres row + bytes under `.data/workflow-uploads/` (or `WORKFLOW_UPLOAD_DIR`).
- PDF: text via `pdf-parse`. Image: placeholder text until vision (full OCR pipeline not shipped).
- Mac agents: `GET /api/workflows/field-uploads/agent?uploadId=&expires=&sig=` (HMAC with `AUTH_SECRET`, no session cookie).

### Semantic output

Writers can emit:

```text
[[ARTIFACT]]
kind: markdown
title: Summary
---
# Title
Body…
[[/ARTIFACT]]
```

Parsed for live **Summary** / **Terminal** tabs and `/reports/[runId]` result. Job report JSON may include optional `artifacts[]` (Mac `report write` extension later).

### Output schema

`published_capabilities.workflow_output_fields` JSON, parsed with `parseWorkflowOutputFieldDefinitions`. Create/Edit workflow forms include an optional **outputs** section (name + format kind).

### Not yet

- Mac disk write (Design C) for intake files.
- Long-lived public blob URLs (Design B full: CDN storage separate from AWC disk).
- Graph execution that validates declared outputs against run results.

## Related

- [docs/product/workflow-builder-form-and-graph.md](../product/workflow-builder-form-and-graph.md)
- [docs/qa/workflow-builder-field-types.md](workflow-builder-field-types.md)

## Last reviewed

2026-09-21
