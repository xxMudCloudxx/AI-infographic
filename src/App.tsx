import { Settings, Sparkles } from "lucide-react";
import { InputPanel } from "./components/InputPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { SettingsModal } from "./components/Settings/SettingsModal";
import { Carousel } from "./components/Carousel";
import { Gallery } from "./components/Gallery";
import { useStore } from "./store/useStore";

function App() {
  const { setIsSettingsOpen } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3h18v18H3z" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-800">
              Infographic <span className="text-indigo-500">Generator</span>
            </h1>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="API 设置"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-[1.15] mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span>AI</span>
            <span className="inline-block pb-1 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Infographic
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            将你在日常写作、汇报或其他文字工作中遇到的内容粘贴到这里，AI
            会理解语境并为你生成相匹配的信息图方案
          </p>
          <p className="text-gray-400 text-sm mt-3">AI 工作区</p>
        </div>
      </section>

      {/* Main Content - Left/Right Layout */}
      <main className="max-w-450 mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-175 lg:min-h-205">
          {/* Left Panel - Input */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-175 lg:min-h-205">
            <InputPanel />
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-175 lg:min-h-205">
            <PreviewPanel />
          </div>
        </div>
      </main>

      {/* Carousel Section */}
      <Carousel />

      {/* Gallery Section */}
      <Gallery />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            Powered by{" "}
            <a
              href="https://github.com/antvis/Infographic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              @antv/infographic
            </a>
          </p>
          <p className="text-xs mt-2 text-gray-500">
            使用 AI 生成专业信息图，支持多种可视化模板
          </p>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
}

export default App;
