import { memo, useEffect, useRef, useState } from "react";
import { Infographic } from "@antv/infographic";
import { carouselItems } from "../../data/presets";

export function Carousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isLazy, setIsLazy] = useState(true);

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
    <section className="relative bg-linear-to-br from-slate-50 to-indigo-50 py-6 lg:py-8">
      <div className="max-w-[1800px] mx-auto px-2 lg:px-4">
        <div ref={sectionRef} className="relative overflow-x-clip">
          <div
            className="carousel-marquee-track py-2"
            style={{ animationPlayState: shouldPlay ? "running" : "paused" }}
          >
            <CarouselItems isLazy={isLazy} />
          </div>
          <div
            aria-hidden="true"
            className="carousel-marquee-track-2 absolute top-0 py-2"
            style={{ animationPlayState: shouldPlay ? "running" : "paused" }}
          >
            <CarouselItems isLazy={isLazy} />
          </div>
        </div>
      </div>
    </section>
  );
}

const CarouselItems = memo<{ isLazy: boolean }>(function CarouselItems({
  isLazy,
}) {
  return (
    <>
      {carouselItems.map((item, index) => (
        <CarouselCard
          key={`carousel-${item.id}-${index}`}
          dsl={item.dsl}
          index={index}
          isLazy={isLazy}
        />
      ))}
    </>
  );
});

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
    index % 2 === 0 ? "rotate-2 hover:-rotate-1" : "-rotate-2 hover:rotate-1";

  return (
    <div className="group flex justify-center px-8 lg:px-10 min-w-[78%] md:min-w-[52%] lg:min-w-[30%] xl:min-w-[26%]">
      <div
        className={`rounded-2xl transition-transform duration-300 ease-in-out group-hover:scale-105 ${rotateClass}`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div ref={containerRef} className="aspect-4/3 w-full bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
