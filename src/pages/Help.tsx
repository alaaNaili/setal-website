import { useState, type FormEvent } from "react";
import {
  Globe,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MessageSquare,
  HelpCircle,
  KeyRound,
  Trash2,
  FileQuestion,
  Bug,
  Shield,
  Settings,
  Loader2,
} from "lucide-react";

const translations = {
  en: {
    language: "Language",
    title: "Help & Support",
    subtitle: "Need assistance? We're here to help. Send us a message.",
    formTitle: "Contact Us",
    formDescription:
      "Fill out the form below and we'll get back to you as soon as possible.",
    reasonLabel: "Reason for Contact",
    reasonPlaceholder: "Select a reason...",
    reasons: {
      password_recovery: "Password Recovery",
      account_deletion: "Account / Data Deletion",
      technical_issue: "Technical Issue / Bug Report",
      general_inquiry: "General Inquiry",
      feature_request: "Feature Request",
      privacy_concern: "Privacy Concern",
      other: "Other",
    },
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "your.email@example.com",
    phoneLabel: "Phone Number (Optional)",
    phonePlaceholder: "+221 XX XXX XX XX",
    subjectLabel: "Subject",
    subjectPlaceholder: "Brief description of your request",
    messageLabel: "Message",
    messagePlaceholder: "Please describe your issue or question in detail...",
    submitButton: "Send Message",
    submittingButton: "Sending...",
    successTitle: "Message Sent Successfully!",
    successMessage:
      "Thank you for contacting us. We'll respond to your inquiry within 24-48 hours.",
    sendAnother: "Send Another Message",
    errorTitle: "Failed to Send Message",
    errorMessage:
      "Something went wrong. Please try again or email us directly at contact@setal.app",
    tryAgain: "Try Again",
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email address",
    quickLinks: "Quick Links",
    quickLinksItems: [
      { text: "Privacy Policy", href: "/policy" },
      { text: "FAQ", href: "/policy#faq" },
      { text: "Terms of Service", href: "/terms" },
    ],
    responseTime: "Average Response Time",
    responseTimeValue: "24-48 hours",
    directContact: "Direct Contact",
  },
  fr: {
    language: "Langue",
    title: "Aide & Support",
    subtitle:
      "Besoin d'assistance ? Nous sommes là pour vous aider. Envoyez-nous un message.",
    formTitle: "Contactez-nous",
    formDescription:
      "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.",
    reasonLabel: "Motif du contact",
    reasonPlaceholder: "Sélectionnez un motif...",
    reasons: {
      password_recovery: "Récupération de mot de passe",
      account_deletion: "Suppression de compte / données",
      technical_issue: "Problème technique / Signalement de bug",
      general_inquiry: "Demande générale",
      feature_request: "Suggestion de fonctionnalité",
      privacy_concern: "Question de confidentialité",
      other: "Autre",
    },
    nameLabel: "Nom complet",
    namePlaceholder: "Entrez votre nom complet",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre.email@exemple.com",
    phoneLabel: "Numéro de téléphone (Optionnel)",
    phonePlaceholder: "+221 XX XXX XX XX",
    subjectLabel: "Objet",
    subjectPlaceholder: "Brève description de votre demande",
    messageLabel: "Message",
    messagePlaceholder:
      "Veuillez décrire votre problème ou question en détail...",
    submitButton: "Envoyer le message",
    submittingButton: "Envoi en cours...",
    successTitle: "Message envoyé avec succès !",
    successMessage:
      "Merci de nous avoir contactés. Nous répondrons à votre demande dans les 24 à 48 heures.",
    sendAnother: "Envoyer un autre message",
    errorTitle: "Échec de l'envoi du message",
    errorMessage:
      "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement à contact@setal.app",
    tryAgain: "Réessayer",
    requiredField: "Ce champ est obligatoire",
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
    quickLinks: "Liens rapides",
    quickLinksItems: [
      { text: "Politique de confidentialité", href: "/policy" },
      { text: "FAQ", href: "/policy#faq" },
      { text: "Conditions d'utilisation", href: "/terms" },
    ],
    responseTime: "Temps de réponse moyen",
    responseTimeValue: "24-48 heures",
    directContact: "Contact direct",
  },
};

type ReasonKey =
  | "password_recovery"
  | "account_deletion"
  | "technical_issue"
  | "general_inquiry"
  | "feature_request"
  | "privacy_concern"
  | "other";

const reasonIcons: Record<ReasonKey, typeof KeyRound> = {
  password_recovery: KeyRound,
  account_deletion: Trash2,
  technical_issue: Bug,
  general_inquiry: FileQuestion,
  feature_request: Settings,
  privacy_concern: Shield,
  other: HelpCircle,
};

// Replace with your actual Formspree form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function HelpPage() {
  const [language, setLanguage] = useState<"en" | "fr">("fr");
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    reason: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[language];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.reason) newErrors.reason = t.requiredField;
    if (!formData.name.trim()) newErrors.name = t.requiredField;
    if (!formData.email.trim()) {
      newErrors.email = t.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!formData.subject.trim()) newErrors.subject = t.requiredField;
    if (!formData.message.trim()) newErrors.message = t.requiredField;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          reason: t.reasons[formData.reason as ReasonKey],
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `[S.E.T.A.L. Support] ${t.reasons[formData.reason as ReasonKey]}: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({
          reason: "",
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="rounded-full bg-background/40 px-3 py-1 backdrop-blur-lg shadow-soft">
            <a href="/" className="flex gap-2 items-center ">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg md:h-12 md:w-10">
                <img
                  src="/SETAL.png"
                  alt="Setal logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold md:text-base">S.E.T.A.L.</span>
            </a>
          </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "fr")}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 font-medium cursor-pointer"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-white">{t.title}</h1>
            <p className="text-green-100 mt-2 text-lg">{t.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    {t.formTitle}
                  </h2>
                  <p className="text-gray-600 mt-1">{t.formDescription}</p>
                </div>

                <div className="p-6">
                  {formState === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t.successTitle}
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        {t.successMessage}
                      </p>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {t.sendAnother}
                      </button>
                    </div>
                  ) : formState === "error" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t.errorTitle}
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        {t.errorMessage}
                      </p>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {t.tryAgain}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Reason Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.reasonLabel}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.reason}
                            onChange={(e) =>
                              handleInputChange("reason", e.target.value)
                            }
                            className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-700 font-medium cursor-pointer focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none ${
                              errors.reason
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">{t.reasonPlaceholder}</option>
                            {Object.entries(t.reasons).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))}
                          </select>
                          {formData.reason && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                              {(() => {
                                const Icon =
                                  reasonIcons[formData.reason as ReasonKey];
                                return Icon ? (
                                  <Icon className="w-5 h-5 text-green-600" />
                                ) : null;
                              })()}
                            </div>
                          )}
                        </div>
                        {errors.reason && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.reason}
                          </p>
                        )}
                      </div>

                      {/* Name & Email Row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 inline-block mr-1" />
                            {t.nameLabel}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder={t.namePlaceholder}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline-block mr-1" />
                            {t.emailLabel}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder={t.emailPlaceholder}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline-block mr-1" />
                          {t.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder={t.phonePlaceholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.subjectLabel}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          placeholder={t.subjectPlaceholder}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                            errors.subject
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.messageLabel}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder={t.messagePlaceholder}
                          rows={5}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none ${
                            errors.message
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {formState === "submitting" ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t.submittingButton}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t.submitButton}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t.directContact}
                </h3>
                <a
                  href="mailto:contact@setal.app"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg hover:from-green-100 hover:to-green-150 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">
                      contact@setal.app
                    </p>
                    <p className="text-sm text-green-600">
                      {t.responseTime}: {t.responseTimeValue}
                    </p>
                  </div>
                </a>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t.quickLinks}
                </h3>
                <div className="space-y-2">
                  {t.quickLinksItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-green-600"
                    >
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">{item.text}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Reasons Guide */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t.reasonLabel}
                </h3>
                <div className="space-y-3">
                  {Object.entries(t.reasons).map(([key, value]) => {
                    const Icon = reasonIcons[key as ReasonKey];
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <Icon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}