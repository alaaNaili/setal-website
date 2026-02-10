import { useTranslation } from "react-i18next";
import { Leaf, Twitter, Linkedin, Facebook, Instagram, Github } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    product: [
      { label: t('footer.links.product.howItWorks'), href: "#" },
      { label: t('footer.links.product.forCitizens'), href: "#" },
      { label: t('footer.links.product.forMunicipalities'), href: "#" },
      { label: t('footer.links.product.pricing'), href: "#" },
      { label: t('footer.links.product.caseStudies'), href: "#" },
    ],
    company: [
      { label: t('footer.links.company.about'), href: "#" },
      { label: t('footer.links.company.careers'), href: "#" },
      { label: t('footer.links.company.press'), href: "#" },
      { label: t('footer.links.company.blog'), href: "#" },
      { label: t('footer.links.company.contact'), href: "#" },
    ],
    resources: [
      { label: t('footer.links.resources.documentation'), href: "#" },
      { label: t('footer.links.resources.api'), href: "#" },
      { label: t('footer.links.resources.community'), href: "#" },
      { label: t('footer.links.resources.helpCenter'), href: "#" },
      { label: t('footer.links.resources.status'), href: "#" },
    ],
    legal: [
      { label: t('footer.links.legal.privacy'), href: "#" },
      { label: t('footer.links.legal.terms'), href: "#" },
      { label: t('footer.links.legal.cookie'), href: "#" },
      { label: t('footer.links.legal.gdpr'), href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex gap-2 items-center mb-2 ">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg md:h-12 md:w-10">
                <img
                  src="/SETAL.png"
                  alt="Setal logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold md:text-base">S.E.T.A.L.</span>
            </a>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">{t('footer.sections.product')}</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t('footer.sections.company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t('footer.sections.resources')}</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t('footer.sections.legal')}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SETAL. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('footer.madeWith.text')}</span>
            <svg className="h-4 w-4 text-destructive fill-current" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>{t('footer.madeWith.purpose')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;