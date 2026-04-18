import { useState, useRef, useCallback, useEffect } from "react";
import {
  FileText,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useStore } from "../../store/useStore";

export function DocumentPanel() {
  const {
    documentContent,
    documentName,
    selectedExcerpts,
    addExcerpt,
    removeExcerpt,
    clearDocument,
  } = useStore();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [expandedExcerptIdx, setExpandedExcerptIdx] = useState<number | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 监听全局 selectionchange 事件，实时捕捉选区变化
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (!text || text.length < 2) {
        setSelectedText(null);
        return;
      }

      // 确保选中区域在文档面板内
      const range = selection?.getRangeAt(0);
      if (
        !range ||
        !contentRef.current?.contains(range.commonAncestorContainer)
      ) {
        setSelectedText(null);
        return;
      }

      setSelectedText(text);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  // ESC 退出全屏
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleAddExcerpt = useCallback(() => {
    if (selectedText) {
      addExcerpt(selectedText);
      setSelectedText(null);
      window.getSelection()?.removeAllRanges();
    }
  }, [selectedText, addExcerpt]);

  if (!documentContent) return null;

  // 引用片段列表（共用于普通和全屏模式）
  const renderExcerpts = () => {
    if (selectedExcerpts.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1.5 mb-2">
        {selectedExcerpts.map((excerpt, idx) => (
          <div key={idx} className="relative">
            <span
              onClick={() =>
                setExpandedExcerptIdx(expandedExcerptIdx === idx ? null : idx)
              }
              className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md max-w-48 cursor-pointer hover:bg-indigo-100 transition-colors"
            >
              <span className="truncate">{excerpt}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeExcerpt(idx);
                  if (expandedExcerptIdx === idx) setExpandedExcerptIdx(null);
                }}
                className="text-indigo-400 hover:text-red-500 shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
            {/* 展开的引用详情 */}
            {expandedExcerptIdx === idx && (
              <div className="absolute left-0 top-full mt-1 z-20 w-72 max-h-48 overflow-y-auto p-3 bg-white border border-indigo-200 rounded-lg shadow-lg text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {excerpt}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // 工具条
  const renderToolbar = () => (
    <div
      className={`mt-2 flex items-center gap-2 p-2 rounded-lg border transition-all ${selectedText ? "bg-indigo-50 border-indigo-200 opacity-100" : "border-transparent opacity-0 pointer-events-none"}`}
    >
      <span className="text-xs text-indigo-600 truncate flex-1 min-w-0">
        {selectedText
          ? `已选中：${selectedText.length > 60 ? selectedText.slice(0, 60) + "…" : selectedText}`
          : "\u00A0"}
      </span>
      <button
        onClick={handleAddExcerpt}
        disabled={!selectedText}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors whitespace-nowrap shrink-0"
      >
        <Plus className="w-3 h-3" />
        引用选中文本
      </button>
    </div>
  );

  // 全屏模式
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        {/* 全屏头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            {documentName}
            {selectedExcerpts.length > 0 && (
              <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full">
                已引用 {selectedExcerpts.length} 段
              </span>
            )}
          </span>
          <button
            onClick={() => setIsFullscreen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            title="退出全屏 (Esc)"
          >
            <Minimize2 className="w-4 h-4" />
            退出全屏
          </button>
        </div>

        {/* 全屏内容区 */}
        <div className="flex-1 overflow-hidden flex flex-col px-6 py-4 max-w-4xl mx-auto w-full">
          {renderExcerpts()}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap select-text cursor-text border border-gray-100"
          >
            {documentContent}
          </div>
          {renderToolbar()}
          <p className="mt-1.5 text-xs text-gray-400">
            💡
            划词选中文本后点击"引用"，选中内容将作为上下文随提示词一起发送。按
            Esc 退出全屏。
          </p>
        </div>
      </div>
    );
  }

  // 普通模式
  return (
    <div className="border-t border-gray-200">
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          {documentName}
          {selectedExcerpts.length > 0 && (
            <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full">
              已引用 {selectedExcerpts.length} 段
            </span>
          )}
        </span>
        <div className="flex items-center gap-1">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            className="p-1 text-gray-400 hover:text-indigo-500 transition-colors flex items-center justify-center shrink-0"
            title="全屏查看"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              clearDocument();
            }}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center shrink-0"
            title="移除文档"
          >
            <X className="w-3.5 h-3.5" />
          </span>
          {collapsed ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {!collapsed && (
        <div className="px-3 pb-3">
          {renderExcerpts()}

          {/* Document Text */}
          <div
            ref={contentRef}
            className="max-h-64 overflow-y-auto p-3 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap select-text cursor-text border border-gray-100"
          >
            {documentContent}
          </div>

          {renderToolbar()}

          <p className="mt-1.5 text-xs text-gray-400">
            💡 划词选中文本后点击"引用"，选中内容将作为上下文随提示词一起发送
          </p>
        </div>
      )}
    </div>
  );
}
