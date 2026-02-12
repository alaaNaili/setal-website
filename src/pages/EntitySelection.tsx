import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Users, Briefcase, Calendar, Landmark, MapPin, Globe, ShoppingBag, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";

const entities = [
  {
    id: "pme",
    nameKey: "entitySelection.entities.pme",
    icon: ShoppingBag,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    hoverBg: "hover:bg-blue-500/5"
  },
  {
    id: "municipalities",
    nameKey: "entitySelection.entities.municipalities",
    icon: MapPin,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    hoverBg: "hover:bg-green-500/5"
  },
  {
    id: "collection",
    nameKey: "entitySelection.entities.collection",
    icon: Factory,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    hoverBg: "hover:bg-orange-500/5"
  },
  {
    id: "ministries",
    nameKey: "entitySelection.entities.ministries",
    icon: Landmark,
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/5"
  },
  {
    id: "ngos",
    nameKey: "entitySelection.entities.ngos",
    icon: Globe,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    hoverBg: "hover:bg-pink-500/5"
  },
  {
    id: "economic-zones",
    nameKey: "entitySelection.entities.economicZones",
    icon: Building2,
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
    hoverBg: "hover:bg-indigo-500/5"
  },
  {
    id: "events",
    nameKey: "entitySelection.entities.events",
    icon: Calendar,
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    hoverBg: "hover:bg-red-500/5"
  },
  {
    id: "enterprises",
    nameKey: "entitySelection.entities.enterprises",
    icon: Briefcase,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
    hoverBg: "hover:bg-teal-500/5"
  },
  {
    id: "consortiums",
    nameKey: "entitySelection.entities.consortiums",
    icon: Users,
    color: "from-fuchsia-500/20 to-pink-500/20",
    borderColor: "border-fuchsia-500/30",
    hoverBg: "hover:bg-fuchsia-500/5"
  }
];

const EntitySelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEntitySelect = (entityId: string) => {
    navigate(`/questionnaire/${entityId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero-subtle py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl animate-float-delay" />
        <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-accent/20 blur-2xl animate-pulse-soft" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">{t('common.back')}</span>
        </button>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-gradient">{t('entitySelection.title')}</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            {t('entitySelection.subtitle')}
          </p>
        </div>

        {/* Entity grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entities.map((entity, index) => {
              const Icon = entity.icon;
              return (
                <button
                  key={entity.id}
                  onClick={() => handleEntitySelect(entity.id)}
                  className={`group relative overflow-hidden rounded-2xl border ${entity.borderColor} bg-card/50 p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-card ${entity.hoverBg} backdrop-blur-sm animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${entity.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold">{t(entity.nameKey)}</h3>
                    
                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      <span>{t('entitySelection.selectButton')}</span>
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Help text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t('entitySelection.helpText')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EntitySelection;