# Local RAG check v2: Episode Memory (design for approval)

**Status:** DRAFT, chờ Thien duyệt. Chưa viết code.
**Scope:** AWL (Mac local): kiểm tra tri thức local trước mỗi task, ghi lại sau mỗi task.
**Cho phép phá cách làm hiện tại:** có (migrate + dual-write 1 release rồi bỏ đường cũ).

---

> **Đã triển khai (AWL):** `apps/live/features/knowledge/internal/core/episode/`. Khác thiết kế ban đầu:
> điểm lexical tính bằng idf-weighted term overlap trong JS (không dùng FTS5; ≤ 2.000 card/project nên đủ nhanh và không phụ thuộc bản SQLite);
> `taskClass`/`knowledgePlan` nằm trong `resolveWriterDispatchRoute`; không có migration (đường NDJSON/memory cũ đã xóa).
> Env: `AGENT_WITCH_KNOWLEDGE=off` tắt hẳn, `AGENT_WITCH_KNOWLEDGE_HOLDOUT_PERCENT` (mặc định 10, 0 = tắt holdout).

---

## 1. Mục tiêu và số đo

| Mục tiêu      | Số đo (đo được, ghi vào report)                                                |
| ------------- | ------------------------------------------------------------------------------ |
| Giảm token    | `injectedTokens` trung bình/run giảm, và không bao giờ vượt budget theo tier   |
| Giảm sai lệch | `repeatedMistakeRate`: tỉ lệ run lặp lại một mistake đã có card                |
| Ổn định       | p95 thời gian "check" < 600 ms; check **không bao giờ** chặn hoặc làm fail run |
| Có ích        | `usefulRate` = card được inject mà run sau đó pass và không bị user sửa lại    |

---

## 2. Hiện trạng và điểm yếu (đã đọc code)

Luồng hiện tại: `startAgentWitchClient.ts:500-543` ghép `memory + rag + errorKnowledge + prompt`.

| #   | Điểm yếu                                                                           | Hậu quả                                                                |
| --- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Đơn vị lưu là **mảnh output cắt cứng 800 ký tự** (`chunkTextForRag`)               | Nhiễu, mất ngữ cảnh, tốn token khi inject                              |
| 2   | Query = **toàn bộ `resolvedPrompt`** (có thể > 3.500 ký tự, kèm seed continuation) | Embedding loãng, retrieval sai                                         |
| 3   | `ragMinScore` 0.25 và `ragLimit` 5 ở tier `full`, **không có token budget**        | Inject nhiễu, tốn token                                                |
| 4   | Chỉ học từ run **exit 0** (nội dung) và **exit ≠ 0** (lỗi)                         | Bỏ sót "chạy xong nhưng sai ý", "user phải sửa lại"                    |
| 5   | Lesson = dòng đầu của output, cắt 280 ký tự                                        | Không phải bài học                                                     |
| 6   | Không có liên kết yêu cầu → commit                                                 | Không biết yêu cầu nào đã sinh ra thay đổi nào, không phát hiện revert |
| 7   | `embedTextWithOllama` **không timeout**, dùng `/api/embeddings` (deprecated)       | Ollama treo thì task bị treo ở bước check                              |
| 8   | NDJSON: mỗi query đọc và `JSON.parse` cả file; index embed tuần tự                 | Chậm khi lớn; Ollama down thì mất luôn tri thức                        |
| 9   | Không đo hiệu quả                                                                  | Không biết RAG có giúp hay chỉ tốn token                               |

---

## 3. Kiến trúc đề xuất

```text
 task đến ──► [1 Route] ──► [2 Build query] ──► [3 Retrieve hybrid] ──► [4 Pack theo budget] ──► prompt + writer
                 │ skip?                                                      │ ghi injectedIds
                 ▼                                                            ▼
              (bỏ qua)                                            run xong ─► [5 Capture episode] ─► [6 Link commit] ─► [7 Feedback]
```

### 3.1 Đơn vị tri thức: Episode card (thay cho raw chunk)

```ts
type EpisodeCard = {
  id: string;
  projectId: string;
  kind: "mistake" | "lesson" | "decision" | "fix";
  request: string; // yêu cầu đã chuẩn hóa, <= 200 ký tự
  takeaway: string; // điều cần nhớ, <= 280 ký tự ("Tránh X vì Y; làm Z")
  files: string[]; // đường dẫn liên quan (dùng để pre-filter)
  commitShas: string[]; // rỗng nếu chưa commit
  branch: string | null;
  outcome: "verified" | "unverified" | "failed" | "superseded";
  supersedes: string | null;
  hits: number;
  usefulCount: number;
  ineffectiveCount: number;
  createdAt: string;
  embedModel: string; // "nomic-embed-text@<digest>", đổi model thì re-embed
};
```

Một card khoảng 60 đến 100 token khi inject (so với 200+ token cho một chunk 800 ký tự hiện nay).

### 3.2 Lưu trữ: một file SQLite (`node:sqlite`) cho mỗi profile

- Đường dẫn: `~/.agent-witch/profiles/<email>/knowledge.db`. Mô hình giống `openPitfallDb` (busy_timeout, `schema_version`, degrade nếu không có `node:sqlite`).
- Bảng: `episodes`, `episode_vectors` (Float32 BLOB 768-d), `episode_fts` (FTS5), `injections` (run_id, episode_id), `meta`.
- **Hybrid retrieval:** BM25 (FTS5) + cosine trên top-N đã lọc theo `projectId` và `files`. **Không cần Ollama vẫn chạy được** (chỉ dùng FTS5).
- Chọn **không dùng Redis** và **không dùng Postgres local**:
  - Redis là thêm một server, RAM và port; SQLite WAL đã đủ cho nhiều tiến trình.
  - pgvector local cũng là thêm một server, không có lợi thế ở quy mô per-project (≤ 2.000 card).
  - pgvector phù hợp ở **AWC** (đã dùng Neon) khi cần chia sẻ tri thức giữa nhiều máy/người. Xem §7.
- Ngưỡng nâng cấp: nếu project > 10k card hoặc p95 > 50 ms thì thêm `sqlite-vec` (đã nghiên cứu trong `awl-cache-redis.md`).

### 3.3 Route (mở rộng `resolveWriterDispatchRoute`)

Thêm `knowledgePlan` vào `WriterDispatchRoutePlan`:

```ts
type KnowledgePlan = {
  mode: "skip" | "fts" | "hybrid";
  tokenBudget: number; // cứng, đếm bằng chars/4
  kinds: EpisodeKind[]; // thứ tự ưu tiên
  maxCards: number;
  minScore: number;
  timeoutMs: { embed: number; db: number };
};
```

| Điều kiện                                                                  | mode     | tokenBudget | maxCards |
| -------------------------------------------------------------------------- | -------- | ----------- | -------- |
| `cli_continue` (session đã có ngữ cảnh)                                    | `skip`   | 0           | 0        |
| Prompt là hỏi/đáp ngắn, không chạm file (`taskClass = "chat"`)             | `fts`    | 150         | 2        |
| Prompt có file/lỗi/ý định sửa code (`taskClass = "code"`), tier `standard` | `hybrid` | 300         | 3        |
| Tier `full` hoặc seed continuation                                         | `hybrid` | 800         | 6        |

`taskClass` suy ra bằng luật thuần (regex đường dẫn, từ khóa sửa/fix/implement/test, mã lỗi). Không gọi LLM.

### 3.4 Build query (thay cho "nhét cả prompt")

1. Lấy **tin nhắn thật của user** (không lấy phần seed continuation).
2. Cắt 400 ký tự đầu, cộng các **entity**: đường dẫn file, tên symbol, mã lỗi, tên lệnh.
3. FTS dùng entity + từ khóa. Embedding dùng 400 ký tự đầu. Có cache LRU `hash(query) → vector`.
4. Pre-filter theo `files` trùng với entity (nếu có) trước khi tính cosine.

### 3.5 Retrieve và pack

1. Điểm = `0.6·cosine + 0.4·bm25_norm` (hybrid), hoặc `bm25_norm` (fts). Trừ điểm `ineffectiveCount`.
2. Lọc `minScore`; bỏ card đã `superseded`; dedupe bằng MMR.
3. Bỏ card mà `takeaway` đã nằm trong prompt.
4. Pack theo ưu tiên `mistake` > `fix` > `decision` > `lesson`, dừng khi đạt `tokenBudget`.
5. Định dạng gọn, ví dụ:

```text
Project notes (local, verify before trusting):
- AVOID: <takeaway> [files: a.ts] [commit abc1234]
```

6. **Fail-open:** embed timeout 400 ms, DB timeout 150 ms; quá hạn thì rơi về FTS; lỗi thì trả rỗng và ghi một metric. Run luôn tiếp tục.

### 3.6 Capture sau run (không LLM mặc định)

Điểm nhập: ngay chỗ hiện tại gọi `indexAgentWitchRagText` và `recordAgentWitchErrorOccurrence` (`startAgentWitchClient.ts:~1980-2040`).

| Tín hiệu                                                                                      | Card sinh ra                                                                     |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| exit ≠ 0                                                                                      | `mistake`, `takeaway` trích từ lỗi đã redact + yêu cầu                           |
| Verify lỗi trong output (test/lint/typecheck đỏ)                                              | `mistake`                                                                        |
| User sửa lại trong 2 turn kế tiếp (luật: "không phải", "sai", "revert", "không đúng", "undo") | `mistake` gắn vào run trước, `outcome = failed`                                  |
| Run pass và có thay đổi code                                                                  | `fix` hoặc `decision` (từ commit subject + file đổi)                             |
| Run pass, không đổi code                                                                      | `lesson` chỉ khi output có cấu trúc kết luận; mặc định **không lưu** (tránh rác) |

Tùy chọn (flag, async, có budget): dùng Ollama `qwen2.5:7b` để viết lại `takeaway` ngắn gọn. Fallback về luật nếu Ollama bận hoặc chưa sẵn sàng.

### 3.7 Liên kết yêu cầu → commit

- Đã có `captureAgentWitchGitWorktreeSnapshot` trước/sau. Thêm `headBefore`/`headAfter`.
- Nếu `headAfter ≠ headBefore`: lấy `git log headBefore..headAfter` và ghi `commitShas`, `outcome = verified` (nếu verify pass).
- Nếu run để lại thay đổi chưa commit: card ở `unverified` kèm `diffstat`. Một **reconciler** (chạy ở đầu run kế tiếp của cùng project, hoặc qua `post-commit` hook tùy chọn) gắn SHA vào card khi thấy commit chứa đúng các file đó.
- **Phát hiện revert:** commit message `Revert "..."` hoặc `git revert` thì card liên quan thành `superseded`, và sinh `mistake` mới: "approach X bị revert".
- Chỉ lưu `request`, subject, danh sách file và SHA. **Không lưu diff** hay nội dung file.

### 3.8 Vòng phản hồi (giữ cho RAG chỉ giữ cái hữu ích)

- Mỗi run ghi `injections(run_id, episode_id)`.
- Run pass và không bị user sửa → `usefulCount++`. Run lặp lại đúng mistake dù đã inject → `ineffectiveCount++` (card cần viết lại, đưa vào danh sách review).
- Decay theo thời gian, cap 2.000 card/project, prune các card `hits = 0` và già nhất.
- Mistake lặp ≥ 3 lần → đề xuất thành **Project Pitfall** (registry đã có ở AWC, `syncProjectKnowledgeCandidateToCloud` đã tồn tại). Người dùng duyệt trước khi đẩy lên.

---

## 4. Ổn định và an toàn

| Rủi ro                                | Xử lý                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Ollama down hoặc chậm                 | Timeout, rơi về FTS; capture xếp hàng và embed bù lúc rảnh                                        |
| `node:sqlite` không có (Node < 22.13) | Dùng đường NDJSON cũ (read-only) cho tới khi nâng Node                                            |
| DB khóa/hỏng                          | `busy_timeout`; hỏng thì đổi tên `.corrupt` và dựng lại; không làm fail run                       |
| Lộ bí mật                             | Redact trước khi lưu (tái dùng `redactTextForProjectKnowledge`); drop card nếu còn dấu vết secret |
| Tri thức sai/lỗi thời                 | Prompt ghi rõ "verify before trusting"; `superseded`; trừ điểm `ineffective`                      |
| Rò giữa project                       | Mọi query bắt buộc `projectId`; file `0600`                                                       |

---

## 5. Không migration

Chưa có người dùng thật nên **không dual-write, không shadow, không import dữ liệu cũ**. PR 2 thay thẳng đường NDJSON bằng `knowledge.db`; PR 6 xóa code cũ (`agentWitchLocalRag.ts`, `agentWitchLocalErrorKnowledge.ts`, store NDJSON) và bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION`. Đo "trước/sau" dùng holdout (xem §9), không cần shadow.

---

## 6. Kế hoạch triển khai và kiểm thử

Thư mục mới: `apps/live/features/knowledge/internal/core/episode/`.

| PR  | Nội dung                                                                             | Test (chỉ logic phức tạp, theo policy)             |
| --- | ------------------------------------------------------------------------------------ | -------------------------------------------------- |
| 1   | Fix nhanh: `/api/embed` + timeout + embed song song có giới hạn; cap query 400 ký tự | `buildKnowledgeQuery`                              |
| 2   | `knowledge.db` + `EpisodeCard` + repository (SQLite, FTS5, vector BLOB)              | repository CRUD + migrate schema                   |
| 3   | `knowledgePlan` trong route + `packCardsToBudget` + format                           | route matrix, packer (budget, thứ tự ưu tiên, MMR) |
| 4   | Capture: detector mistake, `taskClass`, linker commit, revert detector               | detector, linker (log range, revert)               |
| 5   | Feedback loop + `knowledge_events` + holdout + panel hiệu quả (§9)                   | scorer, tính savings                               |
| 6   | Xóa đường cũ + gate phiên bản + harness rule (§10) + bump bundle version             | gate logic                                         |

UI-only thay đổi (panel hiển thị metrics) không viết test.

---

## 7. Phần cloud (AWC) giữ nguyên hướng hiện tại

Postgres + pgvector chỉ xét cho **tri thức dùng chung giữa nhiều máy** (team): bảng `project_knowledge_candidates` đã có trên Neon, thêm cột vector khi cần. Local vẫn là nguồn truy vấn nhanh; cloud chỉ nhận card đã duyệt (đẩy qua `syncProjectKnowledgeCandidateToCloud`).

---

## 8. Quyết định cần Thien chốt

1. **Dùng LLM local (qwen2.5:7b) để viết `takeaway` hay chỉ dùng luật?** (đề xuất: luật mặc định, LLM là flag)
2. **Luật "user sửa lại"** chỉ trong cùng session 2 turn, hay mở rộng (đề xuất: 2 turn)
3. **Reconciler commit:** chỉ chạy đầu run kế tiếp, hay thêm `post-commit` git hook (đề xuất: chỉ đầu run kế tiếp; hook là tùy chọn sau)
4. **Budget token** theo bảng §3.3 có ổn không (150/300/800)
5. Đồng ý **bỏ hẳn Redis và Postgres local** (đề xuất: bỏ)

---

## 9. Cho người dùng thấy hiệu quả (visibility)

### 9.1 Nguyên tắc: tách "đo được" và "ước lượng"

Không thể đo trực tiếp "token tiết kiệm" (không có bản chạy đối chứng cho cùng một task). Mọi con số phải gắn nhãn:

| Nhãn                     | Ý nghĩa                                                 | Ví dụ                                                                               |
| ------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Đo được**              | Ghi trực tiếp từ run                                    | token đã inject, số card, độ trễ check, số lần mistake lặp, số run pass             |
| **Ước lượng**            | Suy ra từ proxy, hiển thị kèm "≈" và tooltip giải thích | token tiết kiệm = số lần chặn được mistake × token trung bình của run lỗi cùng loại |
| **So sánh có đối chứng** | Holdout: ~10% run (hash theo `runId`) **bỏ qua** RAG    | `repeatedMistakeRate` và retry-rate của nhóm có RAG vs nhóm holdout                 |

Holdout là cách duy nhất cho số "tiết kiệm" đáng tin. Dự án nhỏ thì tắt holdout được (flag), khi đó panel chỉ hiện "đo được" và "ước lượng".

### 9.2 Dữ liệu cần ghi (local, không có nội dung)

Bảng `knowledge_events` trong `knowledge.db` (id, run_id, project_id, ts, `mode`, `cardsInjected`, `injectedTokens`, `checkLatencyMs`, `degraded` (fts/timeout/empty), `holdout`, `outcome`, `retries`, `correctionTurns`) và bảng `mistake_hits` (card_id, run_id, `fingerprint`, `prevented`: bool). **Không lưu prompt hay output.** Đồng bộ lên AWC chỉ là các số tổng hợp theo ngày/project/thành viên.

`prevented = true` khi: card `mistake` được inject, run pass, và run **không** tạo mistake cùng `fingerprint` (fingerprint đã có trong `recordAgentWitchErrorOccurrence`).

### 9.3 Panel "Knowledge impact" (AWC, trong trang project)

Dựa trên Reports và History đã có. Đề xuất theo thứ tự ưu tiên:

1. **4 chỉ số đầu trang** (7/30 ngày): `Mistakes avoided` (số, "≈" nếu ước lượng), `Tokens injected` (đo được), `Est. tokens saved`, `Repeat-mistake rate` (kèm mũi tên so với holdout).
2. **Biểu đồ đường:** repeat-mistake rate theo tuần (có RAG vs holdout). Đây là biểu đồ chứng minh được hiệu quả.
3. **Biểu đồ cột chồng:** token mỗi run = prompt + injected. Cho thấy chi phí inject nhỏ ra sao.
4. **Bảng "Top mistakes avoided":** takeaway, số lần chặn được, commit liên quan (link). Người dùng bấm vào để xem card.
5. **Bảng "Cần xem lại":** card `ineffective` (inject mà vẫn lặp), card chưa dùng bao giờ (đề xuất xóa), mistake lặp ≥ 3 lần (đề xuất lên Pitfall).
6. **Sức khỏe hệ thống:** % check bị `degraded`, p95 latency, Ollama có sẵn không, số card/project. Dùng cho chẩn đoán, không phải để khoe.
7. **Theo thành viên:** chỉ hiển thị tổng hợp và trạng thái cài đặt (§10); không so sánh xếp hạng người với người.

Trong từng run (History): một dòng "Knowledge: 3 cards, 212 tokens, 1 mistake warned" và bấm để xem đúng 3 card đã inject. Minh bạch này làm người dùng tin và dễ phát hiện card sai.

Dùng skill `dataviz` khi dựng biểu đồ; theo Tailwind/TailAdmin của repo.

---

## 10. Đảm bảo thành viên tuân thủ và tự cài (AWI)

### 10.1 Cái đã có (đã đọc code)

- `register-install` đã **từ chối kết nối** nếu `installBundleVersion` thấp hơn `AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION` (trả `too_old`); `agent_witch_devices.install_bundle_version` lưu phiên bản từng máy.
- Self-update mỗi giờ (`com.agent-witch-updater`) và watchdog (`com.agent-witch-watchdog`) tự chạy.
- `POST /harness/install` ghi rule/skill vào `~/.agent-witch/harness/`; AWC có `harness-install-artifacts`, `harness-sharing`.
- `check_context` MCP tool và preflight `pit.*` từ Pitfalls.

### 10.2 Nguyên tắc: bắt buộc bằng pipeline, không bằng "nhờ model nghe lời"

RAG check nằm ở **tầng dispatch của AWL** (code), nên mọi run đi qua AW đều được inject, không phụ thuộc agent có đọc hướng dẫn hay không. Phần còn lại là bảo đảm máy của mọi thành viên chạy đúng phiên bản:

| Rủi ro                                                                       | Biện pháp                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thành viên chưa cài / bản cũ chưa có `knowledge.db`                          | Nâng `AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION` lên bundle chứa v2; máy cũ bị `too_old` và nhận hướng dẫn cập nhật. Self-update hourly tự kéo bản mới                                                                                                                                    |
| Máy báo đã cập nhật nhưng v2 hỏng (không có `node:sqlite`, Ollama chưa pull) | Heartbeat gửi thêm `knowledgeCapabilities`: `{ storage: "sqlite" \| "none", ollama: "ready" \| "pulling" \| "missing", embedModel }`. AWC hiển thị trạng thái từng máy; **không chặn dispatch** (fail-open), chỉ cảnh báo và gợi ý lệnh sửa                                                  |
| Cài thiếu Ollama / model                                                     | AWI đã `brew install ollama` và pull `qwen2.5:7b` + `nomic-embed-text`; thêm bước kiểm tra sau cài và ghi `logs/ollama-pull.log` vào trạng thái. Thiếu thì rơi về FTS5 (vẫn có lợi)                                                                                                          |
| Thành viên chạy agent **ngoài AW** (mở thẳng Claude/Cursor trong repo)       | AWI/harness ghi một khối rule đánh dấu (`mergeMarkedBlock`) vào `CLAUDE.md`/`.cursor/rules`: "gọi `check_context` trước khi sửa code; ghi lại mistake". Đây là mức _khuyến nghị_ (không ép được). Run ngoài AW sẽ không có số liệu, và panel sẽ hiện tỉ lệ "run qua AW" để thấy khoảng trống |
| Rule do owner đặt bị sửa cục bộ                                              | Harness sync ghi đè từ phiên bản AWC (như cơ chế harness hiện tại); khối `mergeMarkedBlock` chỉ thay phần giữa marker                                                                                                                                                                        |
| Dữ liệu nhạy cảm bị lưu                                                      | Redact bắt buộc trước lưu; project có thể tắt knowledge bằng project flag (`knowledge`, mặc định ON), tắt thì xóa `knowledge.db` của project đó                                                                                                                                              |

### 10.3 Trạng thái tuân thủ hiển thị cho owner

Trong "Members" của project: mỗi thành viên có huy hiệu **Ready / Degraded (FTS only) / Outdated / Not installed**, kèm bước sửa 1 dòng (ví dụ `npm run agent-witch:self-update`). Tổng hợp: "5/6 máy dùng RAG đầy đủ; 1 máy chỉ dùng FTS vì thiếu Ollama".

Không có enforcement bằng phạt hay xếp hạng cá nhân: chỉ hiển thị trạng thái và hiệu quả theo project.

### 10.4 Việc bổ sung vào kế hoạch (PR 6)

- Thêm `knowledgeCapabilities` vào payload heartbeat và cột/JSON trên `agent_witch_devices`.
- Nâng min bundle version + bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION`.
- Thêm block rule vào harness bundle (cho agent chạy ngoài AW).
- Badge trạng thái ở Members.

---

## 11. Quyết định đã chốt (Thien)

1. **Holdout 10%:** OK (có flag tắt theo project).
2. **Không chặn dispatch** theo trạng thái knowledge (Degraded/Not installed chỉ cảnh báo). Chặn `too_old` ở bước connect là hành vi sẵn có, giữ nguyên, không thêm gate mới.
3. **Owner xem tất cả:** gồm nội dung card và số liệu từng thành viên trong project. Hệ quả cần làm: card đã redact trước khi lưu và trước khi đồng bộ lên AWC; UI ghi rõ cho thành viên biết owner xem được ("Project knowledge is visible to project owners"); sync card lên AWC là opt-in theo project (flag), mặc định chỉ đồng bộ số tổng hợp.
4. Các điểm còn lại ở §8: giữ theo đề xuất (luật mặc định, 2 turn, reconciler đầu run kế, budget 150/300/800, bỏ Redis và Postgres local).
