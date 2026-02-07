import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import cityNetwork from "@/assets/city-network.jpg";

const useCountUp = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startValue + (end - startValue) * easeOutQuart;
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref, decimals };
};

const StatCard = ({ key, stat }: { key: string; stat: Stat }) => {
  const { count, ref, decimals } = useCountUp(stat.value, 2500, stat.decimals || 0);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-border/30 bg-background/80 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-card"
    >
      <div className="mb-2 text-4xl font-bold text-gradient md:text-5xl">
        {decimals ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <h3 className="mb-1 text-lg font-semibold">{stat.label}</h3>
      <p className="text-sm text-muted-foreground">{stat.description}</p>
      
      {/* Decorative glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};
type Stat = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  decimals?: number;
};
const ImpactStats = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: 250000,
      suffix: "+",
      label: t('impactStats.stats.reportsResolved.label'),
      description: t('impactStats.stats.reportsResolved.description'),
    },
    {
      value: 4.2,
      suffix: t('impactStats.stats.avgResponseTime.suffix'),
      label: t('impactStats.stats.avgResponseTime.label'),
      description: t('impactStats.stats.avgResponseTime.description'),
      decimals: 1,
    },
    {
      value: 50,
      suffix: "+",
      label: t('impactStats.stats.cities.label'),
      description: t('impactStats.stats.cities.description'),
    },
    {
      value: 12500,
      suffix: "t",
      label: t('impactStats.stats.wasteRemoved.label'),
      description: t('impactStats.stats.wasteRemoved.description'),
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${cityNetwork})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent-foreground">
            {t('impactStats.badge')}
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t('impactStats.titlePart1')}
            <span className="text-gradient"> {t('impactStats.titlePart2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('impactStats.subtitle')}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Trust logos */}
        <div className="mt-16">
          <p className="mb-6 text-center text-sm text-muted-foreground">{t('impactStats.trustedBy')}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
            {["City of Paris", "Metro Manila", "São Paulo", "Cape Town", "Singapore"].map((city) => (
              <div key={city} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold">{city.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;