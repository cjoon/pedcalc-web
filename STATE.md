# STATE
updated: 2026-09-10 / commit: 62a7023

## 지금
ChartRx MVP + Visit Note(v1.1) 배포 완료, Visit Note S/O/A 어휘 전환(1단계 A 라인)까지 끝났고
2단계(O 라인)는 아직 착수 전.

## 다음
- [ ] Visit Note O 라인 어휘 전환 — healingFindings/provisionalFindings/
      endoInterimFindings/implantFollowupFindings 4개 그룹 신설 (49줄 남음)
- [ ] Visit Note S 라인 어휘 전환 — rct/v2, removable_pros/v5, tmd/v3만 (나머지는 고정 문구가 맞음)
- [ ] Phase 4/5 Codex 리뷰 마무리 (`/review` → P0/P1 수정)
- [ ] 드롭다운 바깥 클릭 시 Apply와 동일하게 즉시 커밋되도록 수정 (지금은 Apply 클릭 필수)
- [ ] 모바일 375px에서 차트 topbar 제목이 `0/10 filled` 카운터와 겹침
- [ ] CJ 검토 대기: rxOptions.js sig 문구, cdtCodes.js 매핑, mepivacaine 400mg을 캡으로
      채택할지 여부, soOptions.js 임상 어휘, extraTemplates.js 신규 6개 procedure 문구

## 하지 말 것
- 새 repo(chartrx) 만들지 말 것 — pedcalc-med 안에서 확장하기로 CJ가 2026-09-05 확정
- TypeScript/Tailwind/Zustand/dnd-kit 도입하지 말 것 — 기존 React+plain CSS 스택 유지가 결정 사항
- CDT 코드 후보 매핑을 cdtCodes.js에 적용하지 말 것 — 초안은 plan 파일에 따로 있지만 CJ 확인
  전까지 UNKNOWN(빈 배열) 유지, 추정 금지
- mepivacaine 400mg을 absoluteMaxMg로 쓰지 말 것 — AAPD 표에 없는 값이라
  unconfirmedAbsoluteMaxMg로만 경고 처리, 계산에 넣지 않음 (CJ 결정 대기)
- Sidebar 클릭 시 서브엔트리(버전/비지트)를 항상 첫 항목으로 넘기지 말 것 — 예전 방식은 클릭할
  때마다 기억된 pill을 덮어써서 탭 전환엔 되고 탭 안에서는 깨짐. 지금은 procedure 선택만 바꾸고
  null을 넘겨 기억된 pill을 보존
