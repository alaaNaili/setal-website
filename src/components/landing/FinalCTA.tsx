import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Building2, CheckCircle } from "lucide-react";

const FinalCTA = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]" />
      
      {/* Decorative nodes */}
      <div className="absolute top-1/4 left-10 h-3 w-3 rounded-full bg-primary animate-pulse-soft" />
      <div className="absolute top-1/3 right-20 h-2 w-2 rounded-full bg-secondary animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/4 h-4 w-4 rounded-full bg-accent/50 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/3 right-1/3 h-2 w-2 rounded-full bg-primary/50 animate-pulse-soft" style={{ animationDelay: "1.5s" }} />

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          {/* Main CTA card */}
          <div className="rounded-3xl border border-border/50 bg-card/80 p-8 text-center shadow-card backdrop-blur-sm md:p-12 lg:p-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t('finalCTA.titlePart1')}
              <span className="text-gradient"> {t('finalCTA.titlePart2')}</span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              {t('finalCTA.subtitle')}
            </p>

            {/* Dual CTA */}
            <div className="mb-12 grid gap-6 md:grid-cols-2">
              {/* Citizens */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-left">
                <h3 className="mb-4 text-lg font-bold">{t('finalCTA.forCitizens.heading')}</h3>
                <p className="mb-8 text-sm text-muted-foreground">
                  {t('finalCTA.forCitizens.description')}
                </p>
                <div className="flex flex-col">
                  <button className="inline-flex items-center justify-center gap-3 rounded-xl bg-foreground px-4 py-2.5 text-background transition-transform hover:scale-105">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    <span className="text-sm font-semibold">{t('hero.googlePlay')}</span>
                  </button>
                </div>
              </div>

              {/* Municipalities */}
              <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-left">
                <h3 className="mb-4 text-lg font-bold">{t('finalCTA.forMunicipalities.heading')}</h3>
                <p className="mb-8 text-sm text-muted-foreground">
                  {t('finalCTA.forMunicipalities.description')}
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Button variant="default" className="w-full bg-secondary hover:bg-secondary/90">
                    {t('nav.contact')}
                  </Button>
                </form>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-setal-green" />
                {t('finalCTA.trustIndicators.freeCitizens')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-setal-green" />
                {t('finalCTA.trustIndicators.gdpr')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-setal-green" />
                {t('finalCTA.trustIndicators.noCreditCard')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-setal-green" />
                {t('finalCTA.trustIndicators.support247')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;