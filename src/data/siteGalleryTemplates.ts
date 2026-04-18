import { getTemplates } from '@antv/infographic';

export interface SiteGalleryItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  dsl: string;
  category: string;
}

const DATASET = {
  COMPARE: {
    title: '竞品分析',
    desc: '通过对比分析，找出差距，明确改进方向',
    items: [
      {
        label: '产品分析',
        children: [
          { label: '架构升级', desc: '品牌营销策略就是以品牌输出为核心的营销策略' },
          { label: '架构升级', desc: '品牌营销策略就是以品牌输出为核心的营销策略' },
          { label: '架构升级', desc: '品牌营销策略就是以品牌输出为核心的营销策略' },
        ],
      },
      {
        label: '竞品分析',
        children: [
          { label: '架构升级', desc: '品牌营销策略就是以品牌输出为核心的营销策略' },
          { label: '架构升级', desc: '品牌营销策略就是以品牌输出为核心的营销策略' },
          { label: '架构升级', desc: '品牌营销策略就是以品牌输出为核心的营销策略' },
        ],
      },
    ],
  },
  SWOT: {
    title: 'SWOT分析',
    desc: '通过全面分析内外部因素，指导企业战略制定与调整',
    items: [
      {
        label: 'Strengths',
        children: [
          { label: '领先的技术研发能力' },
          { label: '完善的供应链体系' },
          { label: '高效的客户服务机制' },
          { label: '成熟的管理团队' },
        ],
      },
      {
        label: 'Weaknesses',
        children: [
          { label: '品牌曝光度不足' },
          { label: '产品线更新缓慢' },
          { label: '市场渠道单一' },
          { label: '运营成本较高' },
        ],
      },
      {
        label: 'Opportunities',
        children: [
          { label: '数字化转型趋势加速' },
          { label: '新兴市场持续扩展' },
          { label: '政策利好推动行业发展' },
          { label: '智能化应用场景增加' },
        ],
      },
      {
        label: 'Threats',
        children: [
          { label: '行业竞争日益激烈' },
          { label: '用户需求快速变化' },
          { label: '市场进入门槛降低' },
          { label: '数据与安全挑战加剧' },
        ],
      },
    ],
  },
  LIST: {
    title: '企业优势列表',
    desc: '展示企业在不同维度上的核心优势与表现值',
    items: [
      { icon: 'mingcute/diamond-2-fill', label: '品牌影响力', desc: '在目标用户群中具备较强认知与信任度', value: 85, time: '2021' },
      { icon: 'mingcute/code-fill', label: '技术研发力', desc: '拥有自研核心系统与持续创新能力', value: 90, time: '2022' },
      { icon: 'mingcute/wallet-4-line', label: '市场增长快', desc: '近一年用户规模实现快速增长', value: 78, time: '2023' },
      { icon: 'mingcute/happy-line', label: '服务满意度', desc: '用户对服务体系整体评分较高', value: 88, time: '2020' },
    ],
  },
  CHART: {
    title: '年度营收增长',
    desc: '展示近三年及本年目标营收对比（单位：亿元）',
    items: [
      { label: '2021年', value: 120, desc: '转型初期，稳步试水', icon: 'lucide/sprout' },
      { label: '2022年', value: 150, desc: '平台优化，效率显著提升', icon: 'lucide/zap' },
      { label: '2023年', value: 190, desc: '深化数智融合，全面增长', icon: 'lucide/brain-circuit' },
      { label: '2024年', value: 240, desc: '拓展生态协同，冲击新高', icon: 'lucide/trophy' },
    ],
  },
  PROS_CONS: {
    title: '企业优劣势对比',
    desc: '呈现企业当前在市场中的核心优势与待改善劣势',
    items: [
      {
        label: '优势',
        children: [
          { label: '产品研发强', desc: '技术领先，具备自主创新能力' },
          { label: '客户粘性高', desc: '用户复购率超60%，口碑良好' },
          { label: '服务体系完善', desc: '售后服务响应快，客户满意度高' },
        ],
      },
      {
        label: '劣势',
        children: [
          { label: '品牌曝光弱', desc: '市场宣传不足，认知度待提升' },
          { label: '渠道覆盖窄', desc: '线上渠道布局不全，触达受限' },
          { label: '运营成本高', desc: '人力与物流成本高于行业均值' },
        ],
      },
    ],
  },
  HIERARCHY: {
    title: '用户调研',
    desc: '通过用户调研，了解用户需求和痛点',
    items: [
      {
        label: '用户调研',
        icon: 'mingcute/user-question-line',
        children: [
          {
            label: '用户为什么要使用某个音乐平台',
            icon: 'mingcute/music-2-ai-line',
            children: [
              { label: '用户从哪些渠道了解到这个平台', icon: 'mingcute/ad-circle-line' },
              { label: '这个平台是哪些方面吸引了用户', icon: 'mingcute/mushroom-line' },
            ],
          },
          {
            label: '用户在什么场景下使用这个平台',
            icon: 'mingcute/time-line',
            children: [
              { label: '用户从什么事件什么场景下使用', icon: 'mingcute/calendar-time-add-line' },
              { label: '用户在某个场景下用到哪些功能', icon: 'mingcute/danmaku-line' },
            ],
          },
        ],
      },
    ],
  },
  HIERARCHY_STRUCTURE: {
    title: '系统分层结构',
    desc: '展示不同层级的模块与功能分组',
    items: [
      {
        label: '展现层',
        children: [{ label: '小程序' }, { label: 'APP' }, { label: 'PAD' }, { label: '客户端' }, { label: 'WEB' }],
      },
      {
        label: '应用层',
        children: [
          {
            label: '核心模块',
            children: [{ label: '功能1' }, { label: '功能2' }, { label: '功能3' }],
          },
          {
            label: '基础模块',
            children: [{ label: '功能1' }, { label: '功能2' }, { label: '功能3' }],
          },
        ],
      },
      { label: '数据层', children: [{ label: 'MySQL' }, { label: 'Redis' }, { label: 'MongoDB' }] },
    ],
  },
  QUADRANT: {
    title: '风险控制',
    desc: '风险频率与损失程度分析',
    items: [
      { label: '高损高频', desc: '直接规避风险', icon: 'mingcute/currency-bitcoin-2-fill' },
      { label: '低损高频', desc: '采取风险控制措施', icon: 'mingcute/currency-bitcoin-fill' },
      { label: '高损低频', desc: '通过保险转移风险', icon: 'mingcute/dogecoin-doge-fill' },
      { label: '低损低频', desc: '选择接受风险', icon: 'mingcute/exchange-bitcoin-fill' },
    ],
  },
  RELATION: {
    title: '子公司盈利分析',
    desc: '各子公司财务表现，盈利同比增长',
    items: [
      { id: 'hq', label: '集团总部', desc: '统一资金调度与战略规划', value: 128, icon: 'mingcute/building-4-line' },
      { id: 'north', label: '华北分公司', desc: '制造与仓储基地', value: 86, icon: 'mingcute/factory-line' },
      { id: 'east', label: '华东分公司', desc: '核心客户集中区', value: 112, icon: 'icomoon-free/office' },
      { id: 'south', label: '华南分公司', desc: '跨境业务增长快', value: 95, icon: 'mingcute/earth-line' },
    ],
    relations: [
      { from: 'hq', to: 'north', label: '管理' },
      { from: 'hq', to: 'east', label: '管理' },
      { from: 'hq', to: 'south', label: '管理' },
    ],
  },
  PROCESS: {
    title: '内容发布审核流程',
    desc: '创作者提交内容到发布上线的标准链路（含驳回回路）',
    items: [
      { id: 'start', label: '开始', desc: '创作者准备发布' },
      { id: 'submit', label: '提交内容', desc: '填写标题、正文、素材' },
      { id: 'auto', label: '机器审核', desc: '涉政涉黄/版权/低质检测' },
      { id: 'manual', label: '人工复审', desc: '边界内容进一步判断' },
      { id: 'publish', label: '发布上线', desc: '内容对外可见' },
      { id: 'reject', label: '驳回修改', desc: '退回并给出原因' },
    ],
    relations: [
      { from: 'start', to: 'submit' },
      { from: 'submit', to: 'auto' },
      { from: 'auto', to: 'manual' },
      { from: 'manual', to: 'publish' },
      { from: 'auto', to: 'reject' },
      { from: 'reject', to: 'submit' },
    ],
  },
  TIMELINE: {
    title: '企业发展时间线',
    desc: '展示企业在关键年份的战略动作与发展节点',
    items: [
      { label: '2018年', desc: '企业成立，完成初期团队搭建和产品定位', time: '2018' },
      { label: '2020年', desc: '发布首款核心产品，打开区域市场', time: '2020' },
      { label: '2022年', desc: '完成A轮融资，加速市场拓展布局', time: '2022' },
      { label: '2024年', desc: '推进生态合作，拓展全国影响力', time: '2024' },
    ],
  },
  WORD_CLOUD: {
    items: [
      { label: '数据分析', value: 100 },
      { label: '人工智能', value: 96 },
      { label: '数据可视化', value: 92 },
      { label: '机器学习', value: 88 },
      { label: 'RAG', value: 72 },
      { label: '大模型', value: 84 },
    ],
  },
  TCP_HANDSHAKE: {
    title: 'TCP三次握手',
    desc: '客户端与服务器建立可靠连接的过程',
    items: [
      {
        label: '客户端',
        icon: 'mingcute/computer-line',
        children: [
          { id: 'client-closed', label: 'CLOSED', step: 0 },
          { id: 'client-syn-sent', label: 'SYN-SENT', step: 2 },
          { id: 'client-established', label: 'ESTABLISHED', step: 4 },
        ],
      },
      {
        label: '服务器',
        icon: 'mingcute/server-line',
        children: [
          { id: 'server-closed', label: 'CLOSED', step: 0 },
          { id: 'server-listen', label: 'LISTEN', step: 1 },
          { id: 'server-syn-rcvd', label: 'SYN-RCVD', step: 3 },
          { id: 'server-established', label: 'ESTABLISHED', step: 4 },
        ],
      },
    ],
    relations: [
      { from: 'client-closed', to: 'server-listen', label: 'SYN=1, seq=x' },
      { from: 'server-listen', to: 'client-syn-sent', label: 'SYN=1, ACK=1, seq=y, ack=x+1' },
      { from: 'client-syn-sent', to: 'server-syn-rcvd', label: 'ACK=1, seq=x+1, ack=y+1' },
      { from: 'client-established', to: 'server-established', label: '数据传输', direction: 'both' },
    ],
  },
} as const;

type TemplateData = (typeof DATASET)[keyof typeof DATASET];

type RelationItem = {
  from?: string;
  to?: string;
  label?: string;
  direction?: 'both' | string;
};

const getDataByTemplate = (template: string | undefined): TemplateData => {
  if (!template) return DATASET.LIST;
  if (template.startsWith('hierarchy-structure')) return DATASET.HIERARCHY_STRUCTURE;
  if (template.startsWith('hierarchy-')) return DATASET.HIERARCHY;
  if (template.startsWith('compare-swot')) return DATASET.SWOT;
  if (template.startsWith('compare-binary')) return DATASET.PROS_CONS;
  if (template.startsWith('compare-')) return template.includes('quadrant') ? DATASET.QUADRANT : DATASET.COMPARE;
  if (template.startsWith('chart-wordcloud')) return DATASET.WORD_CLOUD;
  if (template.startsWith('chart-')) return DATASET.CHART;
  if (template.startsWith('relation-')) return DATASET.RELATION;
  if (template.startsWith('sequence-interaction')) return DATASET.TCP_HANDSHAKE;
  if (template.startsWith('list-column-vertical-icon-arrow')) return DATASET.TIMELINE;
  if (template.startsWith('list-column-simple-vertical-arrow')) return DATASET.TIMELINE;
  return DATASET.LIST;
};

const DATA_KEY_ORDER = [
  'title',
  'desc',
  'lists',
  'sequences',
  'compares',
  'root',
  'nodes',
  'relations',
  'values',
  'items',
] as const;

const ITEM_KEY_ORDER = [
  'id',
  'label',
  'value',
  'desc',
  'time',
  'icon',
  'illus',
  'group',
  'category',
  'children',
] as const;

const INLINE_ITEM_KEYS = ['label', 'value', 'time', 'desc'] as const;
const INDENT = '  ';

const orderKeys = (obj: Record<string, unknown>, preferred: readonly string[]) => {
  const ordered: string[] = [];
  const preferredSet = new Set(preferred);

  preferred.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      ordered.push(key);
    }
  });

  Object.keys(obj)
    .filter((key) => !preferredSet.has(key))
    .sort()
    .forEach((key) => ordered.push(key));

  return ordered;
};

const stringifyScalar = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return String(value);
};

const stringifyArray = (items: unknown[], indentLevel: number): string[] => {
  const lines: string[] = [];
  const indent = INDENT.repeat(indentLevel);

  items.forEach((item) => {
    if (item === undefined || item === null) return;

    if (Array.isArray(item)) {
      lines.push(`${indent}- ${item.map(stringifyScalar).join(' ')}`);
      return;
    }

    if (typeof item === 'object') {
      const record = item as Record<string, unknown>;
      const inlineKey = INLINE_ITEM_KEYS.find(
        (key) =>
          record[key] !== undefined &&
          record[key] !== null &&
          typeof record[key] !== 'object'
      );

      if (inlineKey) {
        lines.push(`${indent}- ${inlineKey} ${stringifyScalar(record[inlineKey])}`);
      } else {
        lines.push(`${indent}-`);
      }

      const omit = inlineKey ? new Set([inlineKey]) : new Set<string>();
      const nested = stringifyObject(record, indentLevel + 1, ITEM_KEY_ORDER, omit);
      if (nested.length) lines.push(...nested);
      return;
    }

    lines.push(`${indent}- ${stringifyScalar(item)}`);
  });

  return lines;
};

const stringifyObject = (
  obj: Record<string, unknown>,
  indentLevel: number,
  keyOrder: readonly string[],
  omitKeys: Set<string> = new Set()
): string[] => {
  const lines: string[] = [];
  const indent = INDENT.repeat(indentLevel);
  const keys = orderKeys(obj, keyOrder);

  keys.forEach((key) => {
    if (omitKeys.has(key)) return;
    const value = obj[key];
    if (value === undefined || value === null) return;

    if (key === 'relations' && Array.isArray(value)) {
      if (value.length === 0) return;
      lines.push(`${indent}${key}`);
      value.forEach((relation) => {
        const relationItem = relation as RelationItem;
        const { from, to, label, direction } = relationItem;
        if (from && to) {
          const labelText = label ? stringifyScalar(label) : '';
          const line =
            direction === 'both'
              ? labelText
                ? `${indent}${INDENT}${from} <- ${labelText} -> ${to}`
                : `${indent}${INDENT}${from} <-> ${to}`
              : labelText
                ? `${indent}${INDENT}${from} - ${labelText} -> ${to}`
                : `${indent}${INDENT}${from} -> ${to}`;
          lines.push(line);
        }
      });
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return;
      lines.push(`${indent}${key}`);
      lines.push(...stringifyArray(value, indentLevel + 1));
      return;
    }

    if (typeof value === 'object') {
      const nested = stringifyObject(value as Record<string, unknown>, indentLevel + 1, []);
      if (nested.length === 0) return;
      lines.push(`${indent}${key}`);
      lines.push(...nested);
      return;
    }

    lines.push(`${indent}${key} ${stringifyScalar(value)}`);
  });

  return lines;
};

const normalizeData = (template: string, data: Record<string, unknown>) => {
  const normalized: Record<string, unknown> = { ...data };
  const items = normalized.items;

  if (template.startsWith('relation-')) {
    if (normalized.nodes === undefined && items !== undefined) {
      normalized.nodes = items;
      delete normalized.items;
    }
    return normalized;
  }

  if (template.startsWith('chart-')) {
    if (normalized.values === undefined && items !== undefined) {
      normalized.values = items;
      delete normalized.items;
    }
    return normalized;
  }

  if (template.startsWith('sequence-')) {
    if (normalized.sequences === undefined && items !== undefined) {
      normalized.sequences = items;
      delete normalized.items;
    }
    return normalized;
  }

  if (template.startsWith('compare-') || template.includes('quadrant')) {
    if (normalized.compares === undefined && items !== undefined) {
      normalized.compares = items;
      delete normalized.items;
    }
    return normalized;
  }

  if (template.startsWith('hierarchy-structure')) {
    return normalized;
  }

  if (template.startsWith('hierarchy-')) {
    if (normalized.root === undefined && Array.isArray(items) && items.length > 0) {
      normalized.root = items[0];
      delete normalized.items;
    }
    return normalized;
  }

  if (template.startsWith('list-')) {
    if (normalized.lists === undefined && items !== undefined) {
      normalized.lists = items;
      delete normalized.items;
    }
    return normalized;
  }

  return normalized;
};

const buildSyntax = (template: string, data: Record<string, unknown>) => {
  const lines: string[] = [`infographic ${template}`];
  const normalized = normalizeData(template, data);

  if (Object.keys(normalized).length > 0) {
    lines.push('data');
    lines.push(...stringifyObject(normalized, 1, DATA_KEY_ORDER));
  }

  lines.push('theme light');
  lines.push(`${INDENT}palette antv`);
  return lines.join('\n');
};

const getCategory = (template: string) => {
  if (template.startsWith('chart-')) return '图表型';
  if (template.startsWith('list-')) return '列表型';
  if (template.startsWith('sequence-')) return '顺序型';
  if (template.startsWith('compare-')) return '对比型';
  if (template.startsWith('hierarchy-')) return '层级型';
  if (template.startsWith('relation-')) return '关系型';
  return '图表型';
};

export const siteGalleryItems: SiteGalleryItem[] = getTemplates()
  .sort((a, b) => a.localeCompare(b))
  .map((template) => {
    const category = getCategory(template);
    return {
      id: `site-${template}`,
      title: template,
      description: category,
      prompt: `请使用 ${template} 模板生成信息图`,
      dsl: buildSyntax(template, getDataByTemplate(template)),
      category,
    };
  });
