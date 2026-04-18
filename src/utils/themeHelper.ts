import type { ThemeOption } from '../store/useStore';

/**
 * 将选中的主题应用到 DSL 字符串中。
 * - 'default' 表示移除 theme 行
 * - 其他值表示插入或替换 theme 行
 */
export function applyThemeToDsl(dsl: string, theme: ThemeOption): string {
  if (!dsl.trim()) return dsl;

  const lines = dsl.split('\n');

  // 查找已有的独立 theme 行（顶层，非缩进内的 theme 块属性）
  const themeLineIndex = lines.findIndex((line) => {
    const trimmed = line.trim();
    return (
      (trimmed === 'theme' || trimmed.startsWith('theme ')) &&
      (line.match(/^\s*/)?.[0].length ?? 0) === 0
    );
  });

  if (theme === 'default') {
    // 移除已有的 theme 行（如果有）
    if (themeLineIndex >= 0) {
      lines.splice(themeLineIndex, 1);
    }
    return lines.join('\n');
  }

  if (themeLineIndex >= 0) {
    // 替换已有的 theme 行
    lines[themeLineIndex] = `theme ${theme}`;
  } else {
    // 在第一行（infographic xxx）之后插入
    const insertIndex = findThemeInsertionIndex(lines);
    lines.splice(insertIndex, 0, `theme ${theme}`);
  }

  return lines.join('\n');
}

/**
 * 找到 theme 行的插入位置：
 * 在 infographic 行之后、data 块之前
 */
function findThemeInsertionIndex(lines: string[]): number {
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('data')) {
      return i; // 在 data 之前插入
    }
  }
  // 如果没有 data 块，在第一行之后插入
  return Math.min(1, lines.length);
}
