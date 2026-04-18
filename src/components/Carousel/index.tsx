import { memo, useEffect, useRef, useState } from "react";
import { Infographic } from "@antv/infographic";
import { carouselItems } from "../../data/presets";

const WARM_SOLID_COLORS = [
  "#f8f9ff",
  "#fff5f7",
  "#fffbf5",
  "#f0f9f9",
  "#faf8ff",
  "#fafbff",
  "#fffaf5",
  "#f5f7ff",
];

const getWarmSolidColor = (index: number) =>
  WARM_SOLID_COLORS[index % WARM_SOLID_COLORS.length];

export function Carousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isLazy, setIsLazy] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);

  // 计算单份内容的实际宽度
  useEffect(() => {
    if (!trackRef.current) return;
    const firstGroup = trackRef.current.querySelector('[data-carousel-group="0"]');
    if (firstGroup) {
      const updateWidth = () => {
        setContentWidth(firstGroup.scrollWidth);
      };
      updateWidth();
      // 延迟再次计算，确保内容渲染完成
      const timer = setTimeout(updateWidth, 500);
      return () => clearTimeout(timer);
    }
  }, [isLazy]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShouldPlay(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: `${window.innerHeight}px 0px`,
      },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLazy || !sectionRef.current) return;
    const preloadMargin = `${window.innerHeight * 2.5}px 0px`;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLazy(false);
          }
        });
      },
      {
        root: null,
        rootMargin: preloadMargin,
      },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isLazy]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLazy(false);
    }, 20000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-indigo-50 py-8 lg:py-12 overflow-hidden">
      <div ref={sectionRef} className="relative">
        <div
          ref={trackRef}
          className="carousel-track flex"
          style={{
            animationPlayState: shouldPlay ? "running" : "paused",
            // 使用实际计算的宽度作为动画距离
            ["--scroll-width" as string]: contentWidth ? `${contentWidth}px` : "50%",
          }}
        >
          <CarouselItems isLazy={isLazy} groupId="0" />
          <CarouselItems isLazy={isLazy} groupId="1" aria-hidden />
        </div>
      </div>
    </section>
  );
}

const CarouselItems = memo<{ isLazy: boolean; groupId: string; "aria-hidden"?: boolean }>(
  function CarouselItems({ isLazy, groupId, "aria-hidden": ariaHidden }) {
    return (
      <div className="flex shrink-0" aria-hidden={ariaHidden} data-carousel-group={groupId}>
        {carouselItems.map((item, index) => (
          <CarouselCard
            key={`carousel-${item.id}-${index}`}
            dsl={item.dsl}
            index={index}
            isLazy={isLazy}
          />
        ))}
      </div>
    );
  }
);

function CarouselCard({
  dsl,
  index,
  isLazy,
}: {
  dsl: string;
  index: number;
  isLazy: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<Infographic | null>(null);

  useEffect(() => {
    if (isLazy || !containerRef.current || instanceRef.current) return;

    try {
      const instance = new Infographic({
        container: containerRef.current,
        svg: { style: { width: "100%", height: "100%" } },
      });
      instance.render(dsl);
      instanceRef.current = instance;
    } catch (err) {
      console.error("Render carousel item failed:", err);
    }

    return () => {
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, [dsl, isLazy]);

  const rotateClass =
    index % 2 === 0 ? "rotate-1 hover:-rotate-1" : "-rotate-1 hover:rotate-1";
  const warmBackground = getWarmSolidColor(index);

  return (
    <div className="group flex justify-center px-4 lg:px-6 shrink-0">
      <div
        className={`rounded-2xl transition-transform duration-300 ease-in-out group-hover:scale-105 ${rotateClass}`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div
            ref={containerRef}
            className="w-80 lg:w-100 aspect-4/3 p-3"
            style={{
              backgroundColor: warmBackground,
            }}
          />
        </div>
      </div>
    </div>
  );
}
