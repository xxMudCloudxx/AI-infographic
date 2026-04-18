import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useCallback, useEffect, useState } from 'react';

export function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, apiConfig, setApiConfig } = useStore();
  const [localConfig, setLocalConfig] = useState(apiConfig);

  const syncLocalConfig = useCallback((nextConfig: typeof apiConfig) => {
    queueMicrotask(() => {
      setLocalConfig(nextConfig);
    });
  }, []);

  useEffect(() => {
    syncLocalConfig(apiConfig);
  }, [apiConfig, isSettingsOpen, syncLocalConfig]);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setApiConfig(localConfig);
    setIsSettingsOpen(false);
  };

  const handleCancel = () => {
    setLocalConfig(apiConfig);
    setIsSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleCancel}
      />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">API 设置</h2>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API 地址
            </label>
            <input
              type="text"
              value={localConfig.baseUrl}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, baseUrl: e.target.value })
              }
              placeholder="https://api.openai.com/v1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              支持 OpenAI 兼容的第三方 API
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API 密钥
            </label>
            <input
              type="password"
              value={localConfig.apiKey}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, apiKey: e.target.value })
              }
              placeholder="sk-..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              模型
            </label>
            <input
              type="text"
              value={localConfig.model}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, model: e.target.value })
              }
              placeholder="gpt-4o"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              例如: gpt-4o, gpt-4-turbo, claude-3-opus 等
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-indigo-500 text-white hover:bg-indigo-600 rounded-lg transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
