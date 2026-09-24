# Agent Witch — triết lý & guideline copy (đọc trước khi viết)

Tài liệu **một trang** cho PM, marketing, support, và bạn. Chi tiết kỹ thuật: [product-pillars.md](product-pillars.md) · user guide [ch.0](../guides/user-guide/00-philosophy-and-vocabulary.md).

---

## Công việc cốt lõi (một câu)

> **Chạy agent đáng tin trên Mac bạn (hoặc đồng đội) kiểm soát, xem trên trình duyệt, tái dùng cách làm đã ổn.**

Mọi tính năng khác (workflow, marketplace, cloud dispatch) phục vụ câu này — **không** mô tả như sản phẩm riêng.

---

## Bốn trụ giá trị (2026)

| #   | Trụ                         | Hứa với user                                                  | Không nói                                       |
| --- | --------------------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| 1   | **Dễ tạo workflow & agent** | Bắt đầu bằng **Task** đơn giản; form/workflow khi cần         | “Prompt engineering”, “capability slug” trên UI |
| 2   | **Học từ khi dùng**         | Run lỗi → gợi ý → **bạn duyệt** rồi mới đổi Playbook/Workflow | “AI tự sửa rules im lặng”                       |
| 3   | **Nhớ ngữ cảnh hữu ích**    | Task mới tái dùng kinh nghiệm Run cũ, ít lặp lại              | “token”, “RAG” với user thường                  |
| 4   | **Team cùng học**           | Chia sẻ **Runs**, **Playbook**, template công ty              | “Một bộ não tập thể tự động”                    |

---

## Bốn từ bắt buộc trên UI & bài marketing

| Dùng         | Nghĩa                     | Tránh                                     |
| ------------ | ------------------------- | ----------------------------------------- |
| **Mac**      | Máy chạy agent            | “Agent Witch client”, wake, heartbeat     |
| **Task**     | Việc cần làm (composer)   | “Dispatch payload”                        |
| **Run**      | Lần chạy + output         | `agent_run`, SSE/WS                       |
| **Playbook** | Chuẩn cách agent làm việc | harness (trên nav), “capability” với user |

**Bề mặt lịch sử:** **Reports** (không “Job history”). **Library** (không “Open Library” dạng CTA lỗi thời).

---

## Thương hiệu & hosting

| Đúng                                                     | Sai                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| **Agent Witch** · **www.agentwitch.com**                 | **Daily Magic** như tên sản phẩm                                    |
| Git repo có thể tên `daily-magic` (chỉ nói với dev)      | CHECK24 `daily-magic.d.energie.check24.de` = production Agent Witch |
| Một pipeline dispatch (library + marketplace + playbook) | “Ba runtime khác nhau”                                              |

---

## Checklist trước khi publish copy

- [ ] Có **Mac / Task / Run / Playbook** (hoặc Reports/Library) đúng vai?
- [ ] Không **Daily Magic** / **daily magic** trong copy user-facing?
- [ ] Không **Job history** — dùng **Reports**?
- [ ] Không hứa **tự học / tự sửa** không cần user duyệt?
- [ ] Team copy nói **chia sẻ Run & Playbook**, không “replace Slack” trừ khi bài đó chủ đích so sánh?
- [ ] Showcase/marketing: không “demo”, “sample”, “daily magic” (test SHOWCASES-011)?

**Regression trong repo:** `src/features/showcases/showcaseMarketingCopy.test.ts`, `magiDesiProductVocab.test.ts`, `philosophyUserFacingCopy.test.ts`.

---

## North star vs hôm nay (trung thực)

Docs và sales **không** viết như memory/improvements đã hoàn hảo. Bảng đầy đủ: [product-pillars.md § North star vs today](product-pillars.md#north-star-vs-today).

---

## English summary (for mixed teams)

**Core job:** trusted agent on your Mac → browser visibility → reuse. **Pillars:** easy authoring, learn-from-usage (human approval), efficient memory (user wording), team learning. **Terms:** Mac, Task, Run, Playbook, Reports, Library. **Brand:** Agent Witch @ agentwitch.com — not “Daily Magic” as product name.

---

## Query aliases

- guideline copy Agent Witch, triet ly huong dan viet bai
- product vocabulary Reports Playbook Task Run Mac
- philosophy violation Daily Magic Job history
