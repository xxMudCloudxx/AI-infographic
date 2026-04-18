import { useState, useEffect } from "react";
import {
  Send,
  History,
  Sparkles,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Palette,
} from "lucide-react";
import { useStore } from "../../store/useStore";
import type { ThemeOption } from "../../store/useStore";
import { presetPrompts } from "../../data/presets";
import { generateInfographic } from "../../services/aiService";
import { applyThemeToDsl } from "../../utils/themeHelper";

const THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "dark", label: "Dark" },
  { value: "hand-drawn", label: "Hand Drawn" },
  { value: "light", label: "Light" },
];

export function InputPanel() {
  const {
    inputText,
    setInputText,
    currentDsl,
    setCurrentDsl,
    isGenerating,
    setIsGenerating,
    generateStatus,
    setGenerateStatus,
    selectedTheme,
    setSelectedTheme,
    history,
    addToHistory,
    clearHistory,
    apiConfig,
  } = useStore();

  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3秒后重置状态
  useEffect(() => {
    if (generateStatus === "success" || generateStatus === "error") {
      const timer = setTimeout(() => {
        setGenerateStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [generateStatus, setGenerateStatus]);

  // 主题变更时，更新当前 DSL
  useEffect(() => {
    if (currentDsl.trim()) {
      const updatedDsl = applyThemeToDsl(currentDsl, selectedTheme);
      if (updatedDsl !== currentDsl) {
        setCurrentDsl(updatedDsl);
      }
    }
  }, [selectedTheme, currentDsl, setCurrentDsl]);

  const handleGenerate = async () => {
    if (!inputText.trim() || isGenerating) return;

    if (!apiConfig.apiKey) {
      setError("请先在设置中配置API密钥");
      setGenerateStatus("error");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setGenerateStatus("loading");

    try {
      let dsl = await generateInfographic(inputText, apiConfig);
      // 生成后应用当前选中的主题
      dsl = applyThemeToDsl(dsl, selectedTheme);
      setCurrentDsl(dsl);
      addToHistory({ prompt: inputText, dsl });
      setGenerateStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请重试");
      setGenerateStatus("error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePresetClick = (preset: (typeof presetPrompts)[0]) => {
    setInputText(preset.prompt);
    // 预设也应用当前主题
    const themedDsl = applyThemeToDsl(preset.dsl, selectedTheme);
    setCurrentDsl(themedDsl);
    setGenerateStatus("idle");
    setError(null);
  };

  const handleHistoryClick = (item: { prompt: string; dsl: string }) => {
    setInputText(item.prompt);
    const themedDsl = applyThemeToDsl(item.dsl, selectedTheme);
    setCurrentDsl(themedDsl);
    setGenerateStatus("idle");
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // 根据状态渲染按钮内容
  const renderButtonContent = () => {
    switch (generateStatus) {
      case "loading":
        return (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        );
      case "success":
        return <Check className="w-5 h-5" />;
      case "error":
        return <X className="w-5 h-5" />;
      default:
        return <Send className="w-5 h-5" />;
    }
  };

  // 根据状态获取按钮样式
  const getButtonClassName = () => {
    const base = "absolute right-3 bottom-3 p-2 rounded-lg transition-colors";
    switch (generateStatus) {
      case "success":
        return `${base} bg-green-500 text-white`;
      case "error":
        return `${base} bg-red-500 text-white`;
      default:
        return `${base} bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* History */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <History className="w-4 h-4 text-gray-500" />
            历史记录 ({history.length})
          </span>
          {showHistory ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {showHistory && (
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {history.length > 0 ? (
              <>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    清空
                  </button>
                </div>
                <div className="space-y-2">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleHistoryClick(item)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {item.prompt}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">
                暂无历史记录
              </p>
            )}
          </div>
        )}
      </div>
      {/* Input Area */}
      <div className="p-4 border-b border-gray-200">
        {/* Theme Selector */}
        <div className="mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">主题：</span>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value as ThemeOption)}
            className="text-xs px-2 py-1 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors"
          >
            {THEME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="描述你想要生成的信息图，例如：展示2019-2023年公司营收增长趋势..."
            className="w-full h-32 p-3 pr-12 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className={getButtonClassName()}
          >
            {renderButtonContent()}
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {/* Preset Prompts */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          预设示例
        </h3>
        <div className="flex flex-wrap gap-2">
          {presetPrompts.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-full transition-colors"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
