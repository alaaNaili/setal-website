import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Building2, LayoutDashboard, Users, BarChart3, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const MunicipalityDashboard = () => {
  const { t } = useTranslation();

  const dashboardFeatures = [
    {
      icon: LayoutDashboard,
      title: t('municipalityDashboard.features.centralized.title'),
      description: t('municipalityDashboard.features.centralized.description'),
    },
    {
      icon: Users,
      title: t('municipalityDashboard.features.teamAssignment.title'),
      description: t('municipalityDashboard.features.teamAssignment.description'),
    },
    {
      icon: BarChart3,
      title: t('municipalityDashboard.features.analytics.title'),
      description: t('municipalityDashboard.features.analytics.description'),
    },
    {
      icon: Clock,
      title: t('municipalityDashboard.features.slaTracking.title'),
      description: t('municipalityDashboard.features.slaTracking.description'),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Dashboard mockup */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl border border-border bg-card p-4 shadow-card">
              {/* Dashboard header */}
              <div className="mb-4 flex items-center justify-between rounded-xl bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
                    <Building2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{t('municipalityDashboard.dashboard.title')}</p>
                    <p className="text-xs text-muted-foreground">{t('municipalityDashboard.dashboard.cityExample')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-setal-green animate-pulse" />
                  <span className="text-xs text-muted-foreground">{t('municipalityDashboard.dashboard.live')}</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="mb-4 grid grid-cols-4 gap-3">
                {[
                  { label: t('municipalityDashboard.stats.active'), value: "47", color: "primary", icon: AlertTriangle },
                  { label: t('municipalityDashboard.stats.inProgress'), value: "23", color: "secondary", icon: Clock },
                  { label: t('municipalityDashboard.stats.resolvedToday'), value: "156", color: "setal-green", icon: CheckCircle },
                  { label: t('municipalityDashboard.stats.satisfaction'), value: "94%", color: "accent", icon: BarChart3 },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-muted/30 p-3 text-center">
                    <p className={`text-xl font-bold text-${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Report list mockup */}
              <div className="space-y-2">
                {[
                  { type: t('municipalityDashboard.reportTypes.illegalDumping'), location: "Park Ave & 5th", time: t('municipalityDashboard.timeAgo.min5'), priority: "high" },
                  { type: t('municipalityDashboard.reportTypes.overflowingBin'), location: "Central Market", time: t('municipalityDashboard.timeAgo.min12'), priority: "medium" },
                  { type: t('municipalityDashboard.reportTypes.streetLitter'), location: "Beach Road", time: t('municipalityDashboard.timeAgo.min18'), priority: "low" },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-background p-3 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        report.priority === "high" ? "bg-destructive" :
                        report.priority === "medium" ? "bg-accent" : "bg-setal-green"
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{report.type}</p>
                        <p className="text-xs text-muted-foreground">{report.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{report.time}</p>
                      <button className="text-xs font-medium text-primary hover:underline">{t('municipalityDashboard.assign')} →</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating analytics card */}
              <div className="absolute -right-4 -bottom-4 w-48 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{t('municipalityDashboard.responseTime')}</span>
                  <span className="text-xs text-setal-green">↓ 23%</span>
                </div>
                <div className="flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 70, 35].map((height, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-t bg-gradient-to-t from-primary to-secondary"
                      style={{ height: `${height}%`, maxHeight: "40px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              <Building2 className="h-4 w-4" />
              {t('municipalityDashboard.badge')}
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t('municipalityDashboard.titlePart1')}
              <span className="text-gradient"> {t('municipalityDashboard.titlePart2')}</span>
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('municipalityDashboard.subtitle')}
            </p>

            {/* Features list */}
            <div className="mb-8 space-y-4">
              {dashboardFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <feature.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg" className="group">
              {t('nav.contact')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MunicipalityDashboard;