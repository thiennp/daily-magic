# AWC `/projects` — interaction matrix (120M-user bar)

**Date:** 2026-10-01  
**Automated (local):** `RUN_STORYBOOK_INTERACTION_E2E=1 npm run test:e2e:storybook` (requires `npm run storybook` healthy)  
**Automated (contracts):** `AwcProjectsListBody.cardView.test.ts`, dropdown Escape hook  
**Manual (production, bắt buộc):** checklist bên dưới — hover, focus, menu, mobile

## Matrix

| ID  | Area       | Interaction                                | Automated                |
| --- | ---------- | ------------------------------------------ | ------------------------ |
| S01 | Header     | Brand link focus ring                      | partial (tab in story)   |
| S02 | Header     | Theme toggle + dark contrast               | manual                   |
| S03 | Header     | User menu open/close                       | manual                   |
| S04 | Sidebar    | Nav hover/active; keyboard Home            | partial                  |
| S05 | Search     | Focus, type filter, count label            | yes                      |
| S06 | Search     | Clear (×) control                          | yes                      |
| S07 | Card       | Overlay link focus (Enter)                 | manual                   |
| S08 | Card       | Kebab visible + clickable above link       | yes                      |
| S09 | Menu       | Open; View details / Rename / Assign tasks | yes                      |
| S10 | Menu       | Click outside closes                       | yes                      |
| S11 | Menu       | Escape closes; focus return to toggle      | yes                      |
| S12 | Menu       | Second card independent menu               | yes                      |
| S13 | Menu       | Edit on Mac disabled + aria-describedby    | manual                   |
| S14 | Menu       | Delete confirm flow                        | manual / E2E             |
| S15 | Form       | New project name focus                     | yes                      |
| S16 | Form       | Submit validation empty name               | manual                   |
| S17 | Mobile     | Bottom tab nav `aria-label=Mobile`         | yes                      |
| S18 | Mobile     | Card menu at 390px                         | extend Playwright        |
| S19 | States     | empty / loading / error stories            | `projects_*` stories     |
| S20 | Production | Signed-in parity vs Storybook              | owner verify post-deploy |

## Notes

- Storybook `projects_ready` uses **3** MSW projects (duplicate Default names) to stress list + menus.
- Báo “kebab missing” từ QA cũ thường do Storybook **chưa load story** (SPA `serve -s`, dev stale, hoặc `storybook:generate` chưa chạy) — **không** đồng nghĩa production thiếu menu.
- Dropdown **Escape** + focus first `menuitem`: `useDropdownMenuKeyboard.util.ts`.

## Production manual pass (signed-in, 1440px + 390px)

Làm trên `https://www.agentwitch.com/projects` sau deploy shell fix:

1. **Tab order:** logo → CTA → theme → user → sidebar Home… → search → card link → kebab → form.
2. **Search:** focus ring; gõ lọc; × clear; count đúng.
3. **Mỗi card:** hover không nhảy layout; kebab mở; View details / Rename / Assign tasks / Edit on Mac / Delete; click ngoài đóng; **Escape** đóng + focus về ⋮.
4. **Hai card liên tiếp:** menu card 2 không dính card 1.
5. **Dark mode:** nav, card, menu, search đọc được.
6. **Mobile:** bottom nav 5 tab; search + một menu; không che bởi safe area.
7. **Empty/error:** tài khoản 0 project hoặc ngắt mạng — copy và retry rõ ràng.
