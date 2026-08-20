# LicenseFig 数据年度刷新机制（Data Refresh Protocol）

> 适用范围：licensefig.com（15 职业 × 51 州要求数据）及站群其他数据型站（dayfig、ratefig、ReloFig、pvfig 等）。
> 目的：保证"数据可信、有出处、可被 AI 引用"的护城河不因时间贬值。数据是 licensefig 的立站之本——**过期数据 = 护城河崩塌**。

---

## 1. 刷新节奏

| 数据类别 | 刷新时机 | 依据 |
|---|---|---|
| 执照要求（学时/考试/费用/重考） | **每年 1 月**（主刷新）+ 年中抽查 | 州委员会/考试大纲年度更新；2026 起考试结构频繁变动（AZ 拆分、TX 新大纲） |
| 通过率 | 每年 1-2 月 | 州委员会年度报告滞后约 6-12 个月 |
| 联邦数据（per diem/FHA 限额/IR 税表） | 按官方发布日 | GSA per diem（10 月）、FHA 限额（1 月）、IRS（12-1 月） |
| 重大政策变化 | 即时（发布后 1 周内） | 如 2026 NAR 和解考点、SAVE 暂停 |

## 2. 刷新流程（每次执行的标准动作）

### Step 1 触发
- 年度主刷新：每年 **1 月第 2 周**（自动化日历提醒）。
- 即时刷新：官方发布重大变更（如州拆分考试）时由运营触发。

### Step 2 数据审计（diff）
- 对每职业×州：比对当前 `src/data/requirements/*.ts` 与官方源最新值。
- 逐职业产出"变化清单"：`字段 | 旧值 | 新值 | 来源 URL | 变更类型(新增/修正/删除)`。
- **变更类型为"删除"时标注理由**（来源消失/规则废止）。

### Step 3 更新（子代理执行）
- 按职业分派子代理（参考 2026-08-20 首次建库的分工），逐州核实官方源：
  - 州委员会官网（RE：DRE/TREC 等；保险：州 DOI；CNA：州 nurse aide registry）
  - 考试大纲：PSI / Pearson VUE candidate handbook
  - 联邦：CMS NATCEP、FSMTB、州务卿
- 更新字段时**同步更新文件头来源注释 + `retrieved` 日期**（改为实际核实日）。
- **铁律不变**：不确定 omit（绝不编造）；多源冲突时以官方为准并注释。

### Step 4 版本与变更记录
- `public/data/data-version.json`：`2026.1` → `2027.1`（年度主刷新）；年中更新用 `2027.1` → `2027.2`。
- `public/data/CHANGELOG.md`：追加记录（日期、职业、字段数、主要变化）。
- `public/llms.txt` 同步版本号（"refreshed annually"声明保持）。

### Step 5 上线与推送
1. 运行 `scripts/gen-data.mjs` 重新生成开放数据集。
2. `next build` 全绿。
3. git 推送（中文 commit）。
4. **收录信号**（数据变更会影响收录）：
   - `node scripts/submit-bing.mjs 80`（Bing API）
   - `node scripts/submit-indexnow.mjs`（IndexNow）
   - GSC 重提 sitemap（`gsc_submit.py submit_sitemap sc-domain:licensefig.com ...`）
5. 线上抽查：curl 关键州页 + `/data/requirements.json` 200。

### Step 6 质量门禁（发布前 checklist）
- [ ] 所有改动字段有官方来源注释
- [ ] 无新增编造值（抽查 10 个改动值）
- [ ] 版本号与 CHANGELOG 已更新
- [ ] 构建全绿 + 线上验证 + 收录信号已推

---

## 3. 数据源清单（licensefig 15 职业）

| 职业 | 主要官方源 |
|---|---|
| Real Estate Salesperson/Broker | 州地产委员会（DRE、TREC、FL DBPR 等）、PSI、Pearson VUE |
| CNA | 州 nurse aide registry、CMS NATCEP、Credentia/Pearson VUE/Prometric/Headmaster |
| Insurance P&C / L&H | 州 DOI（CA DOI、TDI 等）、PSI、Pearson VUE candidate handbook |
| Notary Public | 州务卿（Secretary of State） |
| Appraiser | AQB（联邦底线）、州评估委员会（OREA、TX Appraiser Board） |
| Cosmetology 族 | 州美容委员会（CA BPC、TDLR、FL DBPR） |
| Massage Therapist | 州按摩委员会、FSMTB (MBLEx) |
| Home Inspector | 州建房/许可局（TREC、NY DOS） |
| Pest Control | 州农业部/环保局（FDACS 等） |
| Security Guard | 州公共安全部/州警 |

## 4. 站群数据型站刷新（复用同流程）

| 站 | 数据 | 刷新时机 | 版本载体 |
|---|---|---|---|
| dayfig | GSA per diem / OCONUS | 每年 10 月（FTR 发布） | data-version.json |
| ratefig | FHA 限额 / ZIP 映射 | 每年 1 月 | data-version.json |
| ReloFig | FMR / 州法规矩阵 | 每年 10 月（HUD FY 发布） | data-version.json |
| pvfig | 电价 / 州激励 | 每年 1 月 + 政策即时 | data-version.json |
| visafig | DOS Visa Bulletin | **每月**（排期发布日） | 版本化内容页 |

## 5. 责任与监控
- 执行：子代理（按职业/按站分派）+ 主线程质量门禁。
- 年度自动化提醒：1 月第 2 周设一次性提醒（避免遗忘）。
- 监控：数据变更后 4-8 周看 GSC 收录/CTR 是否受影响（对照基线）。

---
*首次建库：2026-08-20（retrieved 2026-08-20）。下次主刷新：2027 年 1 月。*
