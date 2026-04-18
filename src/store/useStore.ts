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

      // API Config
      apiConfig: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.openai.com/v1',
        apiKey: import.meta.env.VITE_API_KEY || '',
        model: import.meta.env.VITE_API_MODEL || 'gpt-4o',
      },
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
        apiConfig: state.apiConfig,
      }),
    }
  )
);
