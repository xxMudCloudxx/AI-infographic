export interface PresetItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  dsl: string;
  category: string;
}

// 预设提示词（左侧快捷按钮）
export const presetPrompts: PresetItem[] = [
  {
    id: 'carbon-emission',
    title: '绿能科技公司碳减排量趋势',
    description: '展示2019-2023年碳减排量数据',
    prompt: '2019-2023年，绿能科技公司的碳减排量持续攀升。2019年处理量120万吨，2020年通过技术创新增至190万吨。2021年新设备投产后达到280万吨，2022年拓展国际市场后跃至420万吨，2023年突破550万吨。',
    dsl: `infographic chart-column-simple
data
  title 绿能科技公司碳减排量趋势
  desc 2019-2023年碳减排量持续攀升（万吨）
  values
    - label 2019年
      value 120
      desc 起步阶段
    - label 2020年
      value 190
      desc 技术创新
    - label 2021年
      value 280
      desc 新设备投产
    - label 2022年
      value 420
      desc 拓展国际市场
    - label 2023年
      value 550
      desc 突破新高
theme
  palette #10b981 #34d399 #6ee7b7`,
    category: '图表型',
  },
  {
    id: 'tcp-handshake',
    title: 'TCP三次握手',
    description: '客户端与服务器建立连接的过程',
    prompt: '展示TCP三次握手过程，包括客户端和服务器之间的状态变化',
    dsl: `infographic sequence-interaction-default-badge-card
data
  title TCP三次握手
  desc 客户端与服务器建立连接的过程
  sequences
    - label 客户端
      icon mingcute/computer-line
      children
        - label CLOSED
          id client-closed
          icon mingcute/close-circle-line
          step 0
        - label SYN-SENT
          id client-syn-sent
          icon mingcute/send-line
          step 2
        - label ESTABLISHED
          id client-established
          icon mingcute/check-circle-line
          step 4
    - label 服务器
      icon mingcute/server-line
      children
        - label CLOSED
          id server-closed
          icon mingcute/close-circle-line
          step 0
        - label LISTEN
          id server-listen
          icon mingcute/ear-line
          step 1
        - label SYN-RCVD
          id server-syn-rcvd
          icon mingcute/receive-line
          step 3
        - label ESTABLISHED
          id server-established
          icon mingcute/check-circle-line
          step 4
  relations
    client-closed - SYN=1, seq=x -> server-listen
    server-listen - SYN=1, ACK=1, seq=y, ack=x+1 -> client-syn-sent
    client-syn-sent - ACK=1, seq=x+1, ack=y+1 -> server-syn-rcvd
    client-established <- 数据传输 -> server-established`,
    category: '顺序型',
  },
  {
    id: 'product-dev-flow',
    title: '产品开发流程',
    description: '从需求到发布的完整流程',
    prompt: '展示产品开发的五个阶段：需求分析、设计、开发、测试、发布',
    dsl: `infographic sequence-snake-steps-compact-card
data
  title 产品开发流程
  desc 从需求到发布的完整流程
  sequences
    - label 需求分析
      desc 收集和分析用户需求
      icon mingcute/document-line
    - label 设计
      desc UI/UX设计与原型
      icon mingcute/palette-line
    - label 开发
      desc 编码实现功能
      icon mingcute/code-line
    - label 测试
      desc 质量保证与Bug修复
      icon mingcute/bug-line
    - label 发布
      desc 上线部署与监控
      icon mingcute/rocket-line
theme
  palette #6366f1 #8b5cf6 #a78bfa`,
    category: '顺序型',
  },
  {
    id: 'company-swot',
    title: '企业SWOT分析',
    description: '优势、劣势、机会、威胁分析',
    prompt: '对一家科技公司进行SWOT分析',
    dsl: `infographic compare-swot
data
  title 科技公司SWOT分析
  desc 全面评估企业竞争态势
  compares
    - label Strengths
      children
        - label 领先的技术研发能力
        - label 完善的供应链体系
        - label 高效的客户服务机制
        - label 成熟的管理团队
    - label Weaknesses
      children
        - label 品牌曝光度不足
        - label 产品线更新缓慢
        - label 市场渠道单一
        - label 运营成本较高
    - label Opportunities
      children
        - label 数字化转型趋势加速
        - label 新兴市场持续扩展
        - label 政策利好推动行业发展
        - label 智能化应用场景增加
    - label Threats
      children
        - label 行业竞争日益激烈
        - label 用户需求快速变化
        - label 市场进入门槛降低
        - label 数据与安全挑战加剧`,
    category: '对比型',
  },
  {
    id: 'org-structure',
    title: '公司组织架构',
    description: '展示公司部门层级结构',
    prompt: '展示一个科技公司的组织架构图',
    dsl: `infographic hierarchy-tree-curved-line-rounded-rect-node
data
  title 公司组织架构
  desc 科技公司部门结构
  root
    label CEO
    icon mingcute/user-star-line
    children
      - label 产品部
        icon mingcute/box-line
        children
          - label 产品经理
          - label 产品设计
      - label 技术部
        icon mingcute/code-line
        children
          - label 前端组
          - label 后端组
          - label 运维组
      - label 市场部
        icon mingcute/megaphone-line
        children
          - label 品牌推广
          - label 渠道销售`,
    category: '层级型',
  },
];

// 轮播图数据（横向滚动展示）
export const carouselItems: PresetItem[] = [
  {
    id: 'carousel-chart',
    title: '年度营收增长',
    description: '展示近三年及本年目标营收对比',
    prompt: '',
    dsl: `infographic chart-column-simple
data
  title 年度营收增长
  desc 展示近三年及本年目标营收对比（单位：亿元）
  values
    - label 2021年
      value 120
      desc 转型初期，稳步试水
      icon lucide/sprout
    - label 2022年
      value 150
      desc 平台优化，效率显著提升
      icon lucide/zap
    - label 2023年
      value 190
      desc 深化数智融合，全面增长
      icon lucide/brain-circuit
    - label 2024年
      value 240
      desc 拓展生态协同，冲击新高
      icon lucide/trophy
theme
  palette #3b82f6 #60a5fa #93c5fd #bfdbfe`,
    category: '图表型',
  },
  {
    id: 'carousel-list',
    title: '企业优势列表',
    description: '展示企业在不同维度上的核心优势',
    prompt: '',
    dsl: `infographic list-grid-badge-card
data
  title 企业优势列表
  desc 展示企业在不同维度上的核心优势与表现值
  lists
    - icon mingcute/diamond-2-fill
      label 品牌影响力
      desc 在目标用户群中具备较强认知与信任度
      value 85
    - icon mingcute/code-fill
      label 技术研发力
      desc 拥有自研核心系统与持续创新能力
      value 90
    - icon mingcute/wallet-4-line
      label 市场增长快
      desc 近一年用户规模实现快速增长
      value 78
    - icon mingcute/happy-line
      label 服务满意度
      desc 用户对服务体系整体评分较高
      value 88
theme
  palette #6366f1 #8b5cf6 #a78bfa`,
    category: '列表型',
  },
  {
    id: 'carousel-sequence',
    title: '发布流程',
    description: '内容发布审核流程',
    prompt: '',
    dsl: `infographic sequence-ascending-steps
data
  title 内容发布流程
  desc 从创作到上线的标准链路
  sequences
    - label 创作内容
      desc 填写标题、正文、素材
      icon mingcute/edit-line
    - label 机器审核
      desc 涉政涉黄/版权检测
      icon mingcute/robot-line
    - label 人工复审
      desc 边界内容进一步判断
      icon mingcute/user-search-line
    - label 发布上线
      desc 内容对外可见
      icon mingcute/send-line
  order asc
theme
  palette #10b981 #34d399 #6ee7b7 #a7f3d0`,
    category: '顺序型',
  },
  {
    id: 'carousel-pros-cons',
    title: '企业优劣势对比',
    description: '呈现企业当前在市场中的核心优势与待改善劣势',
    prompt: '',
    dsl: `infographic compare-binary-horizontal-badge-card-arrow
data
  title 企业优劣势对比
  desc 呈现企业当前在市场中的核心优势与待改善劣势
  compares
    - label 优势
      children
        - label 产品研发强
          desc 技术领先，具备自主创新能力
        - label 客户粘性高
          desc 用户复购率超60%，口碑良好
        - label 服务体系完善
          desc 售后服务响应快，客户满意度高
    - label 劣势
      children
        - label 品牌曝光弱
          desc 市场宣传不足，认知度待提升
        - label 渠道覆盖窄
          desc 线上渠道布局不全，触达受限
        - label 运营成本高
          desc 人力与物流成本高于行业均值
theme
  palette #10b981 #ef4444`,
    category: '对比型',
  },
  {
    id: 'carousel-hierarchy',
    title: '用户调研',
    description: '通过用户调研了解用户需求和痛点',
    prompt: '',
    dsl: `infographic hierarchy-mindmap-branch-gradient-capsule-item
data
  title 用户调研
  desc 通过用户调研，了解用户需求和痛点
  root
    label 用户调研
    icon mingcute/user-question-line
    children
      - label 用户为什么要使用某个音乐平台
        icon mingcute/music-2-ai-line
        children
          - label 用户从哪些渠道了解到这个平台
            icon mingcute/ad-circle-line
          - label 这个平台是哪些方面吸引了用户
            icon mingcute/mushroom-line
      - label 用户在什么场景下使用这个平台
        icon mingcute/time-line
        children
          - label 用户从什么事件什么场景下使用
            icon mingcute/calendar-time-add-line
          - label 用户在某个场景下用到哪些功能
            icon mingcute/danmaku-line
theme
  palette #f59e0b #fbbf24 #fcd34d`,
    category: '层级型',
  },
  {
    id: 'carousel-quadrant',
    title: '风险控制',
    description: '风险频率与损失程度分析',
    prompt: '',
    dsl: `infographic compare-quadrant-quarter-simple-card
data
  title 风险控制
  desc 风险频率与损失程度分析
  compares
    - label 高损高频
      desc 直接规避风险
      icon mingcute/currency-bitcoin-2-fill
    - label 低损高频
      desc 采取风险控制措施
      icon mingcute/currency-bitcoin-fill
    - label 高损低频
      desc 通过保险转移风险
      icon mingcute/dogecoin-doge-fill
    - label 低损低频
      desc 选择接受风险
      icon mingcute/exchange-bitcoin-fill
theme
  palette #ef4444 #f59e0b #3b82f6 #10b981`,
    category: '对比型',
  },
];

// Gallery数据（更多示例）
export const galleryItems: PresetItem[] = [
  ...carouselItems,
  {
    id: 'gallery-line-chart',
    title: '模型准确率变化',
    description: '展示模型训练过程中准确率的变化趋势',
    prompt: '展示模型A在4周训练过程中的准确率变化',
    dsl: `infographic chart-line-plain-text
data
  title 模型 A 准确率变化
  desc 第 4 周提升最明显
  values
    - label Week1
      value 86.5
    - label Week2
      value 87.3
    - label Week3
      value 89.1
    - label Week4
      value 91.2
theme
  palette #4f46e5 #db2777 #14b8a6`,
    category: '图表型',
  },
  {
    id: 'gallery-bar-chart',
    title: '季度销售对比',
    description: '各季度销售数据对比',
    prompt: '展示四个季度的销售数据对比',
    dsl: `infographic chart-bar-plain-text
data
  title 季度销售对比
  desc 各季度销售数据（万元）
  values
    - label Q1
      value 850
    - label Q2
      value 1200
    - label Q3
      value 980
    - label Q4
      value 1450
theme
  palette #f59e0b #fbbf24 #fcd34d`,
    category: '图表型',
  },
  {
    id: 'gallery-pie-chart',
    title: '市场份额分布',
    description: '各品牌市场占有率',
    prompt: '展示市场份额饼图',
    dsl: `infographic chart-pie-donut-pill-badge
data
  title 市场份额分布
  desc 2023年各品牌市场占有率
  values
    - label 品牌A
      value 35
    - label 品牌B
      value 28
    - label 品牌C
      value 20
    - label 其他
      value 17
theme
  palette #3b82f6 #10b981 #f59e0b #ef4444`,
    category: '图表型',
  },
  {
    id: 'gallery-timeline',
    title: '公司发展历程',
    description: '重要里程碑时间线',
    prompt: '展示公司从创立到上市的发展历程',
    dsl: `infographic sequence-timeline-simple
data
  title 公司发展历程
  desc 重要里程碑
  sequences
    - label 2018年
      desc 公司成立
      icon mingcute/flag-line
    - label 2019年
      desc 获得天使轮融资
      icon mingcute/coin-line
    - label 2020年
      desc 产品正式上线
      icon mingcute/rocket-line
    - label 2021年
      desc 用户突破100万
      icon mingcute/group-line
    - label 2022年
      desc B轮融资完成
      icon mingcute/bank-line
    - label 2023年
      desc 成功上市
      icon mingcute/trophy-line
theme
  palette #6366f1 #8b5cf6`,
    category: '顺序型',
  },
  {
    id: 'gallery-funnel',
    title: '销售漏斗',
    description: '用户转化漏斗分析',
    prompt: '展示用户从访问到付费的转化漏斗',
    dsl: `infographic sequence-funnel-simple
data
  title 销售漏斗
  desc 用户转化漏斗分析
  sequences
    - label 访问
      value 10000
      desc 网站访问量
    - label 注册
      value 3500
      desc 完成注册
    - label 试用
      value 1200
      desc 开始试用
    - label 付费
      value 450
      desc 成为付费用户
theme
  palette #6366f1 #8b5cf6 #a78bfa #c4b5fd`,
    category: '顺序型',
  },
  {
    id: 'gallery-pyramid',
    title: '需求层次',
    description: '马斯洛需求层次理论',
    prompt: '展示马斯洛需求层次金字塔',
    dsl: `infographic sequence-pyramid-simple
data
  title 需求层次理论
  desc 马斯洛需求层次金字塔
  sequences
    - label 自我实现
      desc 实现个人理想和抱负
    - label 尊重需求
      desc 获得他人认可和尊重
    - label 社交需求
      desc 友谊、爱情、归属感
    - label 安全需求
      desc 人身安全、健康保障
    - label 生理需求
      desc 食物、水、睡眠
theme
  palette #8b5cf6 #a78bfa #c4b5fd #ddd6fe #ede9fe`,
    category: '顺序型',
  },
  {
    id: 'gallery-relation',
    title: '子公司盈利分析',
    description: '各子公司财务表现',
    prompt: '展示集团与各子公司的关系和盈利情况',
    dsl: `infographic relation-dagre-flow-tb-badge-card
data
  title 子公司盈利分析
  desc 各子公司财务表现，盈利同比增长
  nodes
    - id hq
      label 集团总部
      desc 统一资金调度与战略规划
      value 128
      icon mingcute/building-4-line
    - id north
      label 华北分公司
      desc 制造与仓储基地
      value 86
      icon mingcute/factory-line
    - id east
      label 华东分公司
      desc 核心客户集中区
      value 112
      icon icomoon-free/office
    - id south
      label 华南分公司
      desc 跨境业务增长快
      value 95
      icon mingcute/earth-line
  relations
    hq - 管理 -> north
    hq - 管理 -> east
    hq - 管理 -> south`,
    category: '关系型',
  },
  {
    id: 'gallery-structure',
    title: '系统分层结构',
    description: '展示不同层级的模块与功能分组',
    prompt: '展示系统的分层架构',
    dsl: `infographic hierarchy-structure
data
  title 系统分层结构
  desc 展示不同层级的模块与功能分组
  items
    - label 展现层
      children
        - label 小程序
        - label APP
        - label PAD
        - label 客户端
        - label WEB
    - label 应用层
      children
        - label 核心模块
          children
            - label 功能1
            - label 功能2
            - label 功能3
        - label 基础模块
          children
            - label 功能1
            - label 功能2
    - label 数据层
      children
        - label MySQL
        - label Redis
        - label MongoDB`,
    category: '层级型',
  },
  {
    id: 'gallery-waterfall',
    title: '项目里程碑',
    description: '项目关键节点展示',
    prompt: '展示项目的关键里程碑',
    dsl: `infographic list-waterfall-badge-card
data
  title 项目里程碑
  desc 项目关键节点展示
  lists
    - label 项目启动
      desc 完成立项和团队组建
      icon mingcute/flag-line
    - label 需求评审
      desc 完成需求文档评审
      icon mingcute/document-line
    - label 设计完成
      desc UI/UX设计稿交付
      icon mingcute/palette-line
    - label 开发完成
      desc 功能开发全部完成
      icon mingcute/code-line
    - label 测试通过
      desc 完成全部测试用例
      icon mingcute/check-circle-line
    - label 正式上线
      desc 产品发布上线
      icon mingcute/rocket-line
theme
  palette #3b82f6 #60a5fa #93c5fd`,
    category: '列表型',
  },
  {
    id: 'gallery-zigzag',
    title: '用户旅程',
    description: '用户从发现到付费的完整路径',
    prompt: '展示用户从发现产品到成为付费用户的旅程',
    dsl: `infographic list-zigzag-down-compact-card
data
  title 用户旅程地图
  desc 从发现到付费的完整路径
  lists
    - label 发现
      desc 通过广告或推荐了解产品
      icon mingcute/search-line
    - label 注册
      desc 创建账户体验产品
      icon mingcute/user-add-line
    - label 试用
      desc 免费试用核心功能
      icon mingcute/play-circle-line
    - label 评估
      desc 对比竞品做出决策
      icon mingcute/scales-line
    - label 付费
      desc 成为付费用户
      icon mingcute/wallet-line
theme
  palette #6366f1 #8b5cf6 #a78bfa #c4b5fd #ddd6fe`,
    category: '列表型',
  },
  {
    id: 'gallery-compare-vs',
    title: '年度大促优惠',
    description: '平日与大促价格对比',
    prompt: '对比平日和大促期间的优惠力度',
    dsl: `infographic compare-binary-horizontal-simple-fold
data
  title 年度大促优惠
  desc 平日与大促价格对比
  compares
    - label 平日
      children
        - label 原价 500
        - label 最高 9 折
        - label 无赠品
    - label 大促
      children
        - label 实际支付 350
        - label 最高 7 折
        - label 赠品丰富
theme
  palette #64748b #ef4444`,
    category: '对比型',
  },
  {
    id: 'gallery-mindmap',
    title: '产品规划思维导图',
    description: '产品功能规划',
    prompt: '展示产品的功能规划思维导图',
    dsl: `infographic hierarchy-mindmap-level-gradient-compact-card
data
  title 产品规划
  desc 2024年产品功能规划
  root
    label 产品规划
    children
      - label 用户体验
        children
          - label 界面优化
          - label 性能提升
          - label 无障碍支持
      - label 核心功能
        children
          - label AI助手
          - label 数据分析
          - label 自动化流程
      - label 商业化
        children
          - label 会员体系
          - label 增值服务
theme
  palette #6366f1 #8b5cf6 #a78bfa`,
    category: '层级型',
  },
];
