# Infographic Generator 项目指南

## 项目概述

这是一个基于 AI 的信息图可视化生成网站，用户输入自然语言描述，AI 生成 DSL 语法，然后由 @antv/infographic 渲染成 SVG 信息图。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS v4
- **状态管理**: Zustand (带 persist 中间件)
- **图标**: Lucide React
- **可视化引擎**: @antv/infographic

## 目录结构

```
src/
├── App.tsx                 # 主页面布局
├── main.tsx               # 入口文件
├── index.css              # 全局样式 (Tailwind)
├── vite-env.d.ts          # 环境变量类型定义
├── components/
│   ├── InputPanel/        # 左侧输入面板
│   │   └── index.tsx      # 输入框、预设按钮、历史记录
│   ├── PreviewPanel/      # 右侧预览面板
│   │   └── index.tsx      # SVG预览、源码查看、导出功能
│   ├── Carousel/          # 轮播图组件
│   │   └── index.tsx      # 横向滚动展示精选信息图
│   ├── Gallery/           # Gallery展示组件
│   │   └── index.tsx      # 分类筛选、搜索、模板卡片
│   └── Settings/          # 设置组件
│       └── SettingsModal.tsx  # API配置弹窗
├── store/
│   └── useStore.ts        # Zustand 全局状态
├── services/
│   └── aiService.ts       # AI API 调用 + System Prompt
└── data/
    └── presets.ts         # 预设数据 (presetPrompts, carouselItems, galleryItems)
```

## 核心概念

### 1. DSL 语法

信息图使用自定义 DSL 语法描述，基本结构：

```
infographic <template-name>
data
  title 标题
  desc 描述
  <主数据字段>
    - label 条目
      value 数值
theme
  palette #color1 #color2
```

主数据字段根据模板类型选择：
- `list-*` → `lists`
- `sequence-*` → `sequences`
- `compare-*` → `compares`
- `hierarchy-*` → `root` (递归 children)
- `chart-*` → `values`
- `relation-*` → `nodes` + `relations`

### 2. 状态管理 (useStore.ts)

```typescript
interface AppState {
  inputText: string;           // 用户输入
  currentDsl: string;          // 当前DSL代码
  viewMode: 'preview' | 'source';  // 预览/源码模式
  isGenerating: boolean;       // 生成中状态
  generateStatus: GenerateStatus;  // idle/loading/success/error
  history: HistoryItem[];      // 历史记录
  apiConfig: ApiConfig;        // API配置
  isSettingsOpen: boolean;     // 设置弹窗
}
```

### 3. 预设数据 (presets.ts)

```typescript
interface PresetItem {
  id: string;
  title: string;
  description: string;
  prompt: string;      // 用户提示词
  dsl: string;         // 对应的DSL代码
  category: string;    // 分类：图表型/列表型/顺序型/对比型/层级型/关系型
}

// 三个数据集：
presetPrompts   // 左侧快捷按钮 (5个)
carouselItems   // 轮播图展示 (6个)
galleryItems    // Gallery展示 (18个，包含carouselItems)
```

### 4. Infographic 渲染

```typescript
import { Infographic } from '@antv/infographic';

const instance = new Infographic({
  container: containerRef.current,
  svg: { style: { width: '100%', height: '100%' } },
  editable: true,  // 可选：启用编辑模式
});

instance.render(dslString);  // 渲染DSL
instance.toDataURL({ type: 'svg' });  // 导出SVG
instance.toDataURL({ type: 'png' });  // 导出PNG
instance.destroy();  // 销毁实例
```

## 常见扩展任务

### 添加新的预设模板

1. 编辑 `src/data/presets.ts`
2. 在 `galleryItems` 数组中添加新项：

```typescript
{
  id: 'unique-id',
  title: '模板标题',
  description: '模板描述',
  prompt: '用户提示词示例',
  dsl: `infographic <template-name>
data
  title 标题
  ...`,
  category: '图表型',  // 或其他分类
}
```

3. 如果要添加到轮播图，同时添加到 `carouselItems`
4. 如果要添加到快捷按钮，同时添加到 `presetPrompts`

### 添加新的分类

1. 编辑 `src/components/Gallery/index.tsx`
2. 在 `categories` 数组中添加新分类名

### 修改 AI 提示词

编辑 `src/services/aiService.ts` 中的 `SYSTEM_PROMPT` 常量。

提示词包含：
- 语法规则说明
- 可用模板列表
- 主数据字段选择规则
- 示例代码
- 自检清单

### 添加新的全局状态

1. 编辑 `src/store/useStore.ts`
2. 在 `AppState` 接口中添加类型定义
3. 在 `create()` 中添加初始值和 setter
4. 如需持久化，在 `partialize` 中添加字段

### 修改页面布局

- 主布局在 `src/App.tsx`
- Hero区域、左右面板、轮播图、Gallery、Footer 都在这里组合

## 环境变量

在 `.env` 文件中配置：

```
VITE_API_BASE_URL=https://api.openai.com/v1
VITE_API_KEY=sk-xxx
VITE_API_MODEL=gpt-4o
```

环境变量优先级高于 localStorage 缓存。

## 可用模板参考

完整模板列表见 `src/services/aiService.ts` 中的 SYSTEM_PROMPT，或参考：
- `Infographic/skills/infographic-syntax-creator/references/prompt.md`
- `Infographic/shared/datasets.ts`

## 注意事项

1. **预览切换问题**: 切换视图模式时需要重新创建 Infographic 实例
2. **DSL语法严格**: 缩进必须是两个空格，palette颜色不加引号和逗号
3. **类型导入**: 使用 `import type` 导入纯类型
4. **Tailwind v4**: 配置方式与v3不同，使用 `@import "tailwindcss"` 而非 `@tailwind`
