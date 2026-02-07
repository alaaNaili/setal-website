import { useTranslation } from "react-i18next";
import { Camera, Send, CheckCircle2, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      icon: Camera,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: "primary",
      mockup: (
        <div className="relative mx-auto h-64 w-36 overflow-hidden rounded-3xl border-4 border-foreground/10 bg-background shadow-card">
          <div className="absolute inset-x-0 top-0 h-6 bg-foreground/5 flex items-center justify-center">
            <div className="h-2 w-16 rounded-full bg-foreground/10" />
          </div>
          <div className="p-3 pt-8">
            <div className="aspect-square rounded-xl bg-gradient-hero-subtle flex items-center justify-center">
              <Camera className="h-12 w-12 text-primary" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2 w-full rounded bg-muted" />
              <div className="h-2 w-3/4 rounded bg-muted" />
            </div>
            <div className="mt-4 h-8 w-full rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">{t('howItWorks.step1.submitButton')}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      icon: Send,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: "secondary",
      mockup: (
        <div className="relative mx-auto h-64 w-48">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse-soft">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <svg
            className="absolute left-[70px] top-[63%] -translate-y-1/2 w-16 h-8"
            viewBox="0 0 64 32"
          >
            <path
              d="M0 16 H64"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="text-primary"
            />

            <circle cx="8" cy="16" r="4" className="fill-primary">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to="48 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <div className="absolute right-0 top-1/4 h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center">
            <span className="text-2xl">🏛️</span>
          </div>
          <div className="absolute right-0 top-1/2 h-14 w-14 rounded-xl bg-setal-green/10 flex items-center justify-center">
            <span className="text-2xl">🚛</span>
          </div>
          <div className="absolute right-0 top-3/4 h-14 w-14 rounded-xl bg-accent/20 flex items-center justify-center">
            <span className="text-2xl">👷</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: "accent",
      mockup: (
        <div className="relative mx-auto">
          <div className="flex gap-3">
            <div className="h-28 w-20 rounded-xl bg-destructive/10 flex items-center justify-center overflow-hidden">
              <span className="text-3xl">🗑️</span>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <div className="h-28 w-20 rounded-xl bg-setal-green/10 flex items-center justify-center overflow-hidden">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-5 w-5 text-accent fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">{t('howItWorks.step3.resolutionRated')}</p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            {t('howItWorks.badge')}
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t('howItWorks.titlePart1')}
            <span className="text-gradient"> {t('howItWorks.titlePart2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step number */}
              <span className="absolute -top-4 left-8 rounded-full bg-gradient-hero px-4 py-1 text-sm font-bold text-primary-foreground">
                {step.number}
              </span>

              {/* Mockup visualization */}
              <div className="mb-8 flex h-64 items-center justify-center">
                {step.mockup}
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-gradient-to-r from-primary/50 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;