import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Camera, Building2, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { BookOpen } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero-subtle">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl animate-float-delay" />
        <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-accent/20 blur-2xl animate-pulse-soft" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left content */}
          <div className="max-w-xl animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              {t('hero.badge')}
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">{t('hero.titleLine1')}</span>
              <br />
              {t('hero.titleLine2')}
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-3 rounded-xl bg-setal-green px-4 py-2.5 text-background transition-transform hover:scale-105">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <span className="text-sm font-semibold">{t('hero.googlePlay')}</span>
              </button>
              <Button variant="heroOutline" size="xl" className="inline-flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                {t('hero.documentation')}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('hero.trustIndicators.free')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('hero.trustIndicators.secure')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('hero.trustIndicators.cities')}
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <img
                src={heroImage}
                alt={t('hero.imageAlt')}
                className="h-auto w-full object-cover"
              />
              {/* Floating status cards */}
              <div className="absolute top-6 left-6 animate-float rounded-xl bg-background/95 p-4 shadow-soft backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t('hero.floatingCard.reported')}</p>
                    <p className="text-xs text-muted-foreground">{t('hero.floatingCard.justNow')}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 animate-float-delay rounded-xl bg-background/95 p-4 shadow-soft backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-setal-green/20">
                    <svg className="h-5 w-5 text-setal-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-setal-green">{t('hero.floatingCard.resolved')}</p>
                    <p className="text-xs text-muted-foreground">{t('hero.floatingCard.hoursAgo')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">{t('hero.scrollToExplore')}</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;