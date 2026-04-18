import { useEffect, useRef, useState } from 'react';
import { Eye, Code, Download, Image, Copy, Check } from 'lucide-react';
import { Infographic } from '@antv/infographic';
import { useStore } from '../../store/useStore';

export function PreviewPanel() {
  const { currentDsl, viewMode, setViewMode } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Infographic | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  // 当切换到预览模式时，强制重新渲染
  useEffect(() => {
    if (viewMode === 'preview') {
      setRenderKey((k) => k + 1);
    }
  }, [viewMode]);

  // 渲染逻辑
  useEffect(() => {
    if (viewMode !== 'preview' || !containerRef.current || !currentDsl) return;

    setError(null);

    // 销毁旧实例
    if (instanceRef.current) {
      instanceRef.current.destroy?.();
      instanceRef.current = null;
    }

    // 清空容器
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    try {
      instanceRef.current = new Infographic({
        container: containerRef.current,
        svg: { style: { width: '100%', height: '100%' } },
      });
      instanceRef.current.render(currentDsl);
    } catch (err) {
      setError(err instanceof Error ? err.message : '渲染失败');
    }
  }, [currentDsl, viewMode, renderKey]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, []);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(currentDsl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportSvg = async () => {
    if (!instanceRef.current) return;

    try {
      const dataUrl = await instanceRef.current.toDataURL({ type: 'svg' });
      const link = document.createElement('a');
      link.download = 'infographic.svg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export SVG failed:', err);
    }
  };

  const handleExportPng = async () => {
    if (!instanceRef.current) return;

    try {
      const dataUrl = await instanceRef.current.toDataURL({ type: 'png' });
      const link = document.createElement('a');
      link.download = 'infographic.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export PNG failed:', err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'preview'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Eye className="w-4 h-4" />
            预览
          </button>
          <button
            onClick={() => setViewMode('source')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'source'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Code className="w-4 h-4" />
            源码
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSvg}
            disabled={!currentDsl}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-white hover:text-indigo-600 rounded-lg border border-transparent hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Download className="w-4 h-4" />
            SVG
          </button>
          <button
            onClick={handleExportPng}
            disabled={!currentDsl}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-white hover:text-indigo-600 rounded-lg border border-transparent hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Image className="w-4 h-4" />
            PNG
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'preview' ? (
          <div className="w-full h-full p-4 overflow-auto bg-white">
            {currentDsl ? (
              <>
                <div
                  key={renderKey}
                  ref={containerRef}
                  className="w-full h-full min-h-[400px] flex items-center justify-center"
                />
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-gray-300" />
                  </div>
                  <p>输入描述或选择预设示例生成信息图</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full relative">
            <button
              onClick={handleCopyCode}
              disabled={!currentDsl}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white text-gray-600 hover:text-indigo-600 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制
                </>
              )}
            </button>
            <pre className="w-full h-full p-4 overflow-auto bg-gray-900 text-gray-100 code-editor">
              {currentDsl || '// 暂无代码'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
