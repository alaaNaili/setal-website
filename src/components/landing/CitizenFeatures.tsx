import { useTranslation } from "react-i18next";
import { Camera, MapPin, Bell, Users, Zap, Shield } from "lucide-react";
import { useState } from "react";

const CitizenFeatures = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Camera,
      title: t('citizenFeatures.features.snapReport.title'),
      description: t('citizenFeatures.features.snapReport.description'),
      gradient: "from-primary to-primary/70",
      longDescription: t('citizenFeatures.features.snapReport.longDescription')
    },
    {
      icon: Bell,
      title: t('citizenFeatures.features.realTimeTracking.title'),
      description: t('citizenFeatures.features.realTimeTracking.description'),
      gradient: "from-secondary to-secondary/70",
      longDescription: t('citizenFeatures.features.realTimeTracking.longDescription')
    },
    {
      icon: MapPin,
      title: t('citizenFeatures.features.impactMap.title'),
      description: t('citizenFeatures.features.impactMap.description'),
      gradient: "from-setal-green to-setal-green-light",
      longDescription: t('citizenFeatures.features.impactMap.longDescription')
    },
    {
      icon: Users,
      title: t('citizenFeatures.features.communityTogether.title'),
      description: t('citizenFeatures.features.communityTogether.description'),
      gradient: "from-accent to-accent/70",
      longDescription: t('citizenFeatures.features.communityTogether.longDescription')
    },
    {
      icon: Zap,
      title: t('citizenFeatures.features.liveStatus.title'),
      description: t('citizenFeatures.features.liveStatus.description'),
      gradient: "from-primary to-secondary",
      longDescription: t('citizenFeatures.features.liveStatus.longDescription')
    },
    {
      icon: Shield,
      title: t('citizenFeatures.features.privacyProtected.title'),
      description: t('citizenFeatures.features.privacyProtected.description'),
      gradient: "from-setal-blue to-setal-blue-light",
      longDescription: t('citizenFeatures.features.privacyProtected.longDescription')
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Users className="h-4 w-4" />
            {t('citizenFeatures.badge')}
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t('citizenFeatures.titlePart1')}
            <span className="text-gradient"> {t('citizenFeatures.titlePart2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('citizenFeatures.subtitle')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Left Sidebar - Feature List */}
          <div className="space-y-3">
            {features.map((feature) => (
              <button
                key={feature.title}
                onClick={() => setSelectedFeature(feature)}
                className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                  selectedFeature.title === feature.title
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border/50 bg-card hover:border-primary/30 hover:bg-card/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-soft`}>
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 font-bold text-base">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Content - Video and Selected Feature Details */}
          <div className="space-y-6">
            {/* Feature Details Section */}
            <div className="rounded-2xl border border-border/50 bg-card px-8 py-4 shadow-card">
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedFeature.gradient} shadow-soft`}>
                <selectedFeature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              
              <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                {selectedFeature.title}
              </h3>
              
              <p className="mb-4 text-lg text-muted-foreground">
                {selectedFeature.description}
              </p>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFeature.longDescription}
                </p>
              </div>

              {/* Decorative gradient */}
              <div className={`my-6 h-1 w-24 rounded-full bg-gradient-to-r ${selectedFeature.gradient}`} />
              <div className="rounded-2xl mb-2 border border-border/50 bg-card overflow-hidden shadow-card">
              <div className="h-80 bg-muted relative">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/thumbnail.jpg"
                >
                  <source src="/vd.mp4" type="video/mp4" />
                  {t('citizenFeatures.videoNotSupported')}
                </video>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* App download CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-muted-foreground">{t('citizenFeatures.availableNow')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-3 rounded-xl bg-foreground px-6 py-3 text-background transition-transform hover:scale-105">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              <div className="text-left">
                <p className="text-xs opacity-80">{t('citizenFeatures.getItOn')}</p>
                <p className="text-sm font-semibold">{t('hero.googlePlay')}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitizenFeatures;