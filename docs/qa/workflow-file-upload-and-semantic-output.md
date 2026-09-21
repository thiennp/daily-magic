# Workflow file upload and semantic run output

## Query aliases

- upload PDF workflow question
- workflow file field image attach
- semantic output artifact marker
- agent run summary tab terminal

## Short answer

Workflows support a **File (PDF or image)** input type (Design A): upload in AWC, text is extracted server-side, field value stores `aw-upload:<id>`, prompt lines use extracted text (with download URL for the original file — Design B hook). Agent runs can emit `[[ARTIFACT]]…[[/ARTIFACT]]` blocks; AWC shows a **Summary** tab (plus job **Result** view) instead of raw-only output. **Output schema** columns/types exist for Phase 4; builder UI for declared outputs is not shipped yet.

## Details

### File input (Design A)

- Builder: Input type **File (PDF or image)**; optional accept via field `accept` (`pdf`, `image`).
- Run: dropzone → `POST /api/workflows/field-uploads` → ref + excerpt; download via `GET /api/workflows/field-uploads?uploadId=`.
- Storage: Postgres row + bytes under `.data/workflow-uploads/` (or `WORKFLOW_UPLOAD_DIR`).
- PDF: text via `pdf-parse`. Image: placeholder text until vision/Blob (Design B/C).

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

### Output schema (Phase 4 prep)

`published_capabilities.workflow_output_fields` JSON + `parseWorkflowOutputFieldDefinitions` — no create-workflow UI until user graph execution ships.

### Not yet

- Mac disk write (Design C) for intake files.
- Signed public blob URLs for agents on Mac (full Design B).
- Builder UI to author `workflow_output_fields`.

## Related

- [docs/product/workflow-builder-form-and-graph.md](../product/workflow-builder-form-and-graph.md)
- [docs/qa/workflow-builder-field-types.md](workflow-builder-field-types.md)

## Last reviewed

2026-09-21
