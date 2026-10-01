# Blurb tiếng Việt (ngắn)

**Status:** optional intro — does not replace EN docs

## 2–3 câu

**Agent Witch** là sân chơi harness, memory và playbook cho team chạy nhiều bot: tối ưu prompt có điểm số, lưu lại thành skill/playbook, và quản lý **ACL dự án** (Approve / Deny / Revoke, folder refs) mà không cần chia sẻ token. Phần **feed hoạt động cowork** (sự kiện membership/status, không đưa nội dung dự án lên cloud) đang ở mức đề xuất — chưa ship. Việc triage Slack/Outlook vẫn do bot chuyên trách; Agent Witch không thay chỗ đó.

## Một câu

Agent Witch = playground hiệu quả cho agent (ACL đa bot + Prompt Optimizer); Slack/Outlook vẫn thuộc bot chuyên trách.

## Độ chính xác

- ACL membership: **đã có**
- Activity feed: **đề xuất**
- Prompt Optimizer: `useThisPrompt` chỉ khi `passed`; timeout/interrupt/no_reply = fail
- Không khẳng định đã có video marketing
