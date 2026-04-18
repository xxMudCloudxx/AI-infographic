import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HistoryItem {
  id: string;
  prompt: string;
  dsl: string;
  timestamp: number;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export type GenerateStatus = 'idle' | 'loading' | 'success' | 'error';

export type ThemeOption = 'default' | 'dark' | 'hand-drawn' | 'light';

interface AppState {
  // Input state
  inputText: string;
  setInputText: (text: string) => void;

  // Generated DSL
  currentDsl: string;
  setCurrentDsl: (dsl: string) => void;

  // View mode
  viewMode: 'preview' | 'source';
  setViewMode: (mode: 'preview' | 'source') => void;

  // Loading state
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;

  // Generate status for feedback
  generateStatus: GenerateStatus;
  setGenerateStatus: (status: GenerateStatus) => void;

  // Theme
  selectedTheme: ThemeOption;
  setSelectedTheme: (theme: ThemeOption) => void;

  // Document
  documentContent: string;
  documentName: string;
  selectedExcerpts: string[];
  setDocumentContent: (content: string, name: string) => void;
  clearDocument: () => void;
  addExcerpt: (text: string) => void;
  removeExcerpt: (index: number) => void;
  clearExcerpts: () => void;

  // History
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;

  // API Config
  apiConfig: ApiConfig;
  setApiConfig: (config: Partial<ApiConfig>) => void;

  // Settings modal
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

// 获取API配置，优先使用环境变量
const getInitialApiConfig = (): ApiConfig => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const envApiKey = import.meta.env.VITE_API_KEY;
  const envModel = import.meta.env.VITE_API_MODEL;

  return {
    baseUrl: envBaseUrl || 'https://api.openai.com/v1',
    apiKey: envApiKey || '',
    model: envModel || 'gpt-4o',
  };
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Input state
      inputText: '',
      setInputText: (text) => set({ inputText: text }),

      // Generated DSL
      currentDsl: '',
      setCurrentDsl: (dsl) => set({ currentDsl: dsl }),

      // View mode
      viewMode: 'preview',
      setViewMode: (mode) => set({ viewMode: mode }),

      // Loading state
      isGenerating: false,
      setIsGenerating: (loading) => set({ isGenerating: loading }),

      // Generate status
      generateStatus: 'idle',
      setGenerateStatus: (status) => set({ generateStatus: status }),

      // Theme
      selectedTheme: 'default',
      setSelectedTheme: (theme) => set({ selectedTheme: theme }),

      // Document
      documentContent: '',
      documentName: '',
      selectedExcerpts: [],
      setDocumentContent: (content, name) => set({ documentContent: content, documentName: name, selectedExcerpts: [] }),
      clearDocument: () => set({ documentContent: '', documentName: '', selectedExcerpts: [] }),
      addExcerpt: (text) => set((state) => ({
        selectedExcerpts: state.selectedExcerpts.includes(text)
          ? state.selectedExcerpts
          : [...state.selectedExcerpts, text],
      })),
      removeExcerpt: (index) => set((state) => ({
        selectedExcerpts: state.selectedExcerpts.filter((_, i) => i !== index),
      })),
      clearExcerpts: () => set({ selectedExcerpts: [] }),

      // History
      history: [],
      addToHistory: (item) =>
        set((state) => ({
          history: [
            {
              ...item,
              id: Date.now().toString(),
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 50), // Keep last 50 items
        })),
      clearHistory: () => set({ history: [] }),

      // API Config - 初始值从环境变量获取
      apiConfig: getInitialApiConfig(),
      setApiConfig: (config) =>
        set((state) => ({
          apiConfig: { ...state.apiConfig, ...config },
        })),

      // Settings modal
      isSettingsOpen: false,
      setIsSettingsOpen: (open) => set({ isSettingsOpen: open }),
    }),
    {
      name: 'infographic-storage',
      partialize: (state) => ({
        history: state.history,
        selectedTheme: state.selectedTheme,
        // 只持久化用户手动设置的配置，不持久化环境变量的默认值
        apiConfig: state.apiConfig,
      }),
      // 合并时优先使用环境变量中的值（如果有的话）
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AppState>;
        const envConfig = getInitialApiConfig();

        return {
          ...currentState,
          ...persisted,
          apiConfig: {
            // 如果环境变量有值，优先使用环境变量
            baseUrl: envConfig.baseUrl || persisted.apiConfig?.baseUrl || currentState.apiConfig.baseUrl,
            apiKey: envConfig.apiKey || persisted.apiConfig?.apiKey || currentState.apiConfig.apiKey,
            model: envConfig.model || persisted.apiConfig?.model || currentState.apiConfig.model,
          },
        };
      },
    }
  )
);
