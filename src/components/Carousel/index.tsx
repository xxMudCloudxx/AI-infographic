import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Infographic } from '@antv/infographic';
import { carouselItems } from '../../data/presets';

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const instanceRefs = useRef<(Infographic | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const itemWidth = 400;
  const gap = 24;

  useEffect(() => {
    carouselItems.forEach((item, index) => {
      const container = containerRefs.current[index];
      if (container && !instanceRefs.current[index]) {
        try {
          const instance = new Infographic({
            container,
            svg: { style: { width: '100%', height: '100%' } },
          });
          instance.render(item.dsl);
          instanceRefs.current[index] = instance;
        } catch (err) {
          console.error('Render carousel item failed:', err);
        }
      }
    });

    return () => {
      instanceRefs.current.forEach((instance) => instance?.destroy?.());
      instanceRefs.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollPosition = currentIndex * (itemWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-transform hover:shadow-md"
              style={{ width: itemWidth }}
            >
              <div
                ref={(el) => { containerRefs.current[index] = el; }}
                className="w-full h-[280px] p-4"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 bg-indigo-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
