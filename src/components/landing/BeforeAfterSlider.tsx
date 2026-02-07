import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import beforeImage from "@/assets/before-cleanup.jpg";
import afterImage from "@/assets/after-cleanup.jpg";

const BeforeAfterSlider = () => {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: t('beforeAfter.testimonials.citizen.quote'),
      author: t('beforeAfter.testimonials.citizen.author'),
      role: t('beforeAfter.testimonials.citizen.role'),
      avatar: "M",
    },
    {
      quote: t('beforeAfter.testimonials.director.quote'),
      author: t('beforeAfter.testimonials.director.author'),
      role: t('beforeAfter.testimonials.director.role'),
      avatar: "J",
    },
  ];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-setal-green/20 px-4 py-1.5 text-sm font-medium text-setal-green">
            {t('beforeAfter.badge')}
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t('beforeAfter.titlePart1')}
            <span className="text-gradient"> {t('beforeAfter.titlePart2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Before/After slider */}
          <div
            ref={containerRef}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* After image (full width, bottom layer) */}
            <img
              src={afterImage}
              alt={t('beforeAfter.afterAlt')}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Before image (clipped, top layer) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforeImage}
                alt={t('beforeAfter.beforeAlt')}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-background shadow-lg cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-card border-2 border-primary">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 rounded-lg bg-destructive/90 px-3 py-1.5 text-sm font-medium text-destructive-foreground backdrop-blur-sm">
              {t('beforeAfter.before')}
            </div>
            <div className="absolute bottom-4 right-4 rounded-lg bg-setal-green px-3 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              {t('beforeAfter.after')}
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">{t('beforeAfter.testimonials.heading')}</h3>
            
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-soft"
              >
                <div className="mb-4 flex items-start gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-accent fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;