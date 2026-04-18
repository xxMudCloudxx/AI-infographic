import { useEffect, useRef, useState } from 'react';
import { Search, Filter, Play } from 'lucide-react';
import { Infographic } from '@antv/infographic';
import { galleryItems } from '../../data/presets';
import type { PresetItem } from '../../data/presets';
import { useStore } from '../../store/useStore';

const categories = ['全部', '图表型', '列表型', '顺序型', '对比型', '层级型', '关系型'];

export function Gallery() {
  const { setCurrentDsl, setInputText } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchText, setSearchText] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    const matchCategory = selectedCategory === '全部' || item.category === selectedCategory;
    const matchSearch = !searchText ||
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleUseItem = (item: PresetItem) => {
    setCurrentDsl(item.dsl);
    setInputText(item.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Infographic <span className="text-indigo-500">Gallery</span>
        </h2>
        <p className="text-gray-500 mb-8">
          探索精选的信息图模板库，高保真设计、灵活可定制，可即插即用地投入你的应用。
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-500">
            <Filter className="w-4 h-4" />
            <span className="text-sm">筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-500 text-white border-indigo-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="搜索模板"
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-48"
            />
          </div>
          <span className="text-sm text-gray-500">
            {filteredItems.length} / {galleryItems.length}
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isHovered={hoveredId === item.id}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
              onUse={() => handleUseItem(item)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            没有找到匹配的模板
          </div>
        )}
      </div>
    </div>
  );
}

interface GalleryCardProps {
  item: PresetItem;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onUse: () => void;
}

function GalleryCard({ item, isHovered, onHover, onLeave, onUse }: GalleryCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Infographic | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      instanceRef.current = new Infographic({
        container: containerRef.current,
        svg: { style: { width: '100%', height: '100%' } },
      });
      instanceRef.current.render(item.dsl);
    } catch (err) {
      console.error('Render gallery item failed:', err);
    }

    return () => {
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, [item.dsl]);

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        ref={containerRef}
        className="w-full h-48 bg-gray-50"
      />

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={onUse}
          className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <Play className="w-4 h-4" />
          使用此模板
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-800">{item.title}</h3>
          <span className="text-xs text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
            {item.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
      </div>
    </div>
  );
}
