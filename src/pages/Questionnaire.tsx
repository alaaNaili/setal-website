import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Form field configurations for each entity type
const formConfigs: Record<string, Array<{
  section: string;
  fields: Array<{
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
    required: boolean;
    options?: string[];
    placeholder?: string;
  }>;
}>> = {
  pme: [
    {
      section: "IDENTITÉ",
      fields: [
        { id: "companyName", label: "Nom de l'entreprise", type: "text", required: true },
        { id: "activityType", label: "Type d'activité", type: "text", required: true },
        { id: "sector", label: "Secteur (restauration, santé, éducation…)", type: "text", required: true },
        { id: "headquarters", label: "Adresse du siège / lieu principal", type: "text", required: true },
        { id: "cityRegion", label: "Ville / Région", type: "text", required: true },
        { id: "responsibleName", label: "Nom du responsable", type: "text", required: true },
        { id: "responsiblePosition", label: "Fonction du responsable", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "DÉTAILS OPÉRATIONNELS",
      fields: [
        { id: "collectionPoints", label: "Nombre de points de collecte", type: "number", required: true },
        { id: "wasteVolume", label: "Volume estimé déchets/semaine (kg)", type: "number", required: true },
        { id: "wasteTypes", label: "Types de déchets principaux", type: "textarea", required: true },
        { id: "collectionFrequency", label: "Fréquence de collecte souhaitée", type: "text", required: true },
        { id: "availableHours", label: "Heures de disponibilité pour la collecte", type: "text", required: true },
        { id: "employeeCount", label: "Nombre d'employés concernés", type: "number", required: true },
      ]
    },
    {
      section: "BESOINS SPÉCIFIQUES",
      fields: [
        { id: "selectiveSorting", label: "Tri sélectif souhaité ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "composting", label: "Valorisation / compostage ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "employeeTraining", label: "Besoin de formation employés ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "ecoBadge", label: "Badge \"Entreprise Éco-responsable\" souhaité ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "otherNeeds", label: "Autre besoin spécifique (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  municipalities: [
    {
      section: "INFORMATIONS ADMINISTRATIVES",
      fields: [
        { id: "municipalityName", label: "Nom de la commune / collectivité", type: "text", required: true },
        { id: "type", label: "Type (commune, ville, région, département)", type: "text", required: true },
        { id: "regionDept", label: "Région / Département concerné", type: "text", required: true },
        { id: "population", label: "Population estimée", type: "number", required: true },
        { id: "area", label: "Superficie (km²)", type: "number", required: true },
        { id: "mayorPrefect", label: "Nom du maire / préfet", type: "text", required: true },
        { id: "technicalHead", label: "Nom du responsable technique", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email officiel", type: "email", required: true },
      ]
    },
    {
      section: "SITUATION ACTUELLE",
      fields: [
        { id: "collectionAgents", label: "Nombre d'agents de collecte actuels", type: "number", required: true },
        { id: "vehicles", label: "Nombre de véhicules de collecte", type: "number", required: true },
        { id: "currentFrequency", label: "Fréquence de collecte actuelle", type: "text", required: true },
        { id: "unservedZones", label: "Zones non desservies ?", type: "textarea", required: true },
        { id: "trackingSystem", label: "Système de suivi actuel (Oui/Non)", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "currentPartners", label: "Partenaires de collecte actuels", type: "textarea", required: true },
        { id: "monthlyVolume", label: "Volume déchets collectés/mois (tonnes)", type: "number", required: true },
      ]
    },
    {
      section: "BESOINS ET OBJECTIFS",
      fields: [
        { id: "mainObjective", label: "Objectif principal (propreté, efficacité…)", type: "textarea", required: true },
        { id: "neighborhoodCount", label: "Nombre de quartiers à couvrir", type: "number", required: true },
        { id: "publicInterface", label: "Interface publique transparente souhaitée ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "routeOptimization", label: "Optimisation des routes souhaitée ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "annualBudget", label: "Budget annuel estimé pour la gestion", type: "number", required: true },
        { id: "deploymentDeadline", label: "Délai de déploiement souhaité", type: "text", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  collection: [
    {
      section: "INFORMATIONS ENTREPRISE",
      fields: [
        { id: "companyName", label: "Nom de l'entreprise", type: "text", required: true },
        { id: "type", label: "Type (collecte, compostage, recyclage…)", type: "text", required: true },
        { id: "headquarters", label: "Siège social (adresse)", type: "text", required: true },
        { id: "interventionZones", label: "Zones d'intervention principales", type: "textarea", required: true },
        { id: "citiesCovered", label: "Nombre de villes / communes couvertes", type: "number", required: true },
        { id: "ceoName", label: "Nom du dirigeant", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "CAPACITÉS OPÉRATIONNELLES",
      fields: [
        { id: "vehicleCount", label: "Nombre de véhicules de collecte", type: "number", required: true },
        { id: "driverCount", label: "Nombre de chauffeurs / agents", type: "number", required: true },
        { id: "dailyCapacity", label: "Capacité de collecte quotidienne (tonnes)", type: "number", required: true },
        { id: "wasteTypes", label: "Types de déchets traités", type: "textarea", required: true },
        { id: "b2bClients", label: "Nombre de clients B2B actuels", type: "number", required: true },
        { id: "individualClients", label: "Nombre de clients particuliers actuels", type: "number", required: true },
        { id: "billingSystem", label: "Système de facturation actuel", type: "text", required: true },
      ]
    },
    {
      section: "INTÉGRATION S.E.T.A.L.",
      fields: [
        { id: "routeOptimization", label: "Optimisation des routes souhaitée ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "mobileBilling", label: "Facturation via Orange Money / Wave, Virement bancaire?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "gpsIntegration", label: "Intégration flotte GPS ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "contractManagement", label: "Gestion des contrats via l'app ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "zonesToIntegrate", label: "Nombre de zones à intégrer", type: "number", required: true },
        { id: "deploymentDeadline", label: "Délai de déploiement souhaité", type: "text", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  ministries: [
    {
      section: "IDENTIFICATION",
      fields: [
        { id: "ministryName", label: "Nom du ministère / agence", type: "text", required: true },
        { id: "department", label: "Direction concernée", type: "text", required: true },
        { id: "geographicPerimeter", label: "Périmètre géographique (régions)", type: "textarea", required: true },
        { id: "regionCount", label: "Nombre de régions / départements", type: "number", required: true },
        { id: "projectHead", label: "Nom du responsable projet", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email officiel", type: "email", required: true },
      ]
    },
    {
      section: "PÉRIMÈTRE ET OBJECTIFS",
      fields: [
        { id: "citiesToMonitor", label: "Nombre de villes à monitorer", type: "number", required: true },
        { id: "mainObjective", label: "Objectif principal (monitoring, politique publique…)", type: "textarea", required: true },
        { id: "keyIndicators", label: "Indicateurs clés souhaités (KPIs)", type: "textarea", required: true },
        { id: "benchmarking", label: "Besoin de benchmarking inter-villes ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "strategicReports", label: "Rapports stratégiques nécessaires ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "databaseIntegration", label: "Intégration bases données nationales ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "rawData", label: "Données brutes pour études ?", type: "select", required: true, options: ["Oui", "Non"] },
      ]
    },
    {
      section: "BUDGET ET DÉLAI",
      fields: [
        { id: "annualBudget", label: "Budget annuel estimé", type: "number", required: true },
        { id: "fundingSource", label: "Source de financement (budget État, subvention…)", type: "text", required: true },
        { id: "deploymentDeadline", label: "Délai de déploiement souhaité", type: "text", required: true },
        { id: "commitmentDuration", label: "Durée d'engagement souhaitée (mois)", type: "number", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  ngos: [
    {
      section: "IDENTIFICATION ORGANISATION",
      fields: [
        { id: "orgName", label: "Nom de l'organisation", type: "text", required: true },
        { id: "type", label: "Type (ONG, banque multilatérale, coopération…)", type: "text", required: true },
        { id: "countryRegion", label: "Pays / région d'origine", type: "text", required: true },
        { id: "dakarOfficeHead", label: "Bureau Dakar — nom du responsable", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "DÉTAILS DU PROJET",
      fields: [
        { id: "projectName", label: "Nom du projet", type: "text", required: true },
        { id: "geographicZones", label: "Zones géographiques concernées", type: "textarea", required: true },
        { id: "citiesTargeted", label: "Nombre de villes / communes ciblées", type: "number", required: true },
        { id: "projectDuration", label: "Durée du projet (mois)", type: "number", required: true },
        { id: "totalBudget", label: "Budget total projet estimé (FCFA)", type: "number", required: true },
        { id: "digitalToolBudget", label: "Budget estimé pour outil numérique", type: "number", required: true },
        { id: "mainObjectives", label: "Objectifs principaux du projet", type: "textarea", required: true },
      ]
    },
    {
      section: "BESOINS MONITORING & ÉVALUATION",
      fields: [
        { id: "meIndicators", label: "Indicateurs Suivi & Évaluation requis", type: "textarea", required: true },
        { id: "impactReports", label: "Rapports d'impact nécessaires ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "publicationFormats", label: "Formats de publication requis", type: "text", required: true },
        { id: "cobranding", label: "Co-marquage (branding ONG + S.E.T.A.L.) ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "localPartnerTraining", label: "Formation partenaires locaux incluse ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "donors", label: "Bailleurs concernés (pour alignement)", type: "textarea", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  "economic-zones": [
    {
      section: "IDENTIFICATION ZONE",
      fields: [
        { id: "zoneName", label: "Nom de la zone économique", type: "text", required: true },
        { id: "type", label: "Type (zone industrielle, port, aéroport…)", type: "text", required: true },
        { id: "location", label: "Localisation", type: "text", required: true },
        { id: "area", label: "Superficie (hectares)", type: "number", required: true },
        { id: "companyCount", label: "Nombre d'entreprises installées", type: "number", required: true },
        { id: "managerName", label: "Nom du gestionnaire / directeur", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "SITUATION DÉCHETS ACTUELLE",
      fields: [
        { id: "dailyWasteVolume", label: "Volume de déchets/jour estimé (tonnes)", type: "number", required: true },
        { id: "mainWasteTypes", label: "Types de déchets principaux", type: "textarea", required: true },
        { id: "hazardousWaste", label: "Déchets dangereux présents ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "currentCollectionPoints", label: "Nombre de points de collecte actuels", type: "number", required: true },
        { id: "currentProvider", label: "Fournisseur de collecte actuel", type: "text", required: true },
        { id: "currentTrackingSystem", label: "Système de suivi actuel ?", type: "select", required: true, options: ["Oui", "Non"] },
      ]
    },
    {
      section: "BESOINS SPÉCIFIQUES",
      fields: [
        { id: "multiStreamSorting", label: "Tri sélectif multi-flux souhaité ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "hazardousWasteTracking", label: "Traçabilité déchets dangereux ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "regulatoryCompliance", label: "Conformité réglementaire requise ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "iso14001", label: "Certification ISO 14001 en cours ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "environmentalReports", label: "Rapports environnementaux nécessaires ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "deploymentDeadline", label: "Délai de déploiement souhaité", type: "text", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  events: [
    {
      section: "IDENTIFICATION",
      fields: [
        { id: "infrastructureName", label: "Nom de l'infrastructure / événement", type: "text", required: true },
        { id: "type", label: "Type (stade, centre commercial, hôtel, aéroport…)", type: "text", required: true },
        { id: "location", label: "Localisation", type: "text", required: true },
        { id: "capacity", label: "Capacité d'accueil (personnes)", type: "number", required: true },
        { id: "responsibleName", label: "Nom du responsable", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "DÉTAILS ÉVÉNEMENT / INFRASTRUCTURE",
      fields: [
        { id: "eventType", label: "Événement ponctuel ou permanent ?", type: "select", required: true, options: ["Ponctuel", "Permanent"] },
        { id: "eventDates", label: "Dates de l'événement (si ponctuel)", type: "text", required: true },
        { id: "estimatedDuration", label: "Durée estimée (jours)", type: "number", required: true },
        { id: "dailyAttendance", label: "Affluence estimée (visiteurs/jour)", type: "number", required: true },
        { id: "dailyWasteVolume", label: "Volume déchets estimé/jour (tonnes)", type: "number", required: true },
        { id: "collectionPoints", label: "Nombre de points de collecte nécessaires", type: "number", required: true },
        { id: "collectionFrequency", label: "Fréquence de collecte souhaitée", type: "text", required: true },
      ]
    },
    {
      section: "BESOINS ET BUDGET",
      fields: [
        { id: "peakDayCollection", label: "Collecte renforcée les jours de pics ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "visitorCommunication", label: "Communication visiteurs intégrée ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "realTimeReporting", label: "Reporting temps réel pour sponsors ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "estimatedBudget", label: "Budget estimé (FCFA)", type: "number", required: true },
        { id: "billingPreference", label: "Facturation souhaitée (mensuelle / par événement)", type: "select", required: true, options: ["Mensuelle", "Par événement"] },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  enterprises: [
    {
      section: "IDENTIFICATION ENTREPRISE",
      fields: [
        { id: "companyName", label: "Nom de l'entreprise", type: "text", required: true },
        { id: "sector", label: "Secteur d'activité", type: "text", required: true },
        { id: "headquarters", label: "Siège social (adresse)", type: "text", required: true },
        { id: "sitesCount", label: "Nombre de sites / agences en Sénégal", type: "number", required: true },
        { id: "employeeCount", label: "Nombre total d'employés au Sénégal", type: "number", required: true },
        { id: "csrHead", label: "Nom du responsable RSE (Responsabilité Sociétale des Entreprises)", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "PROGRAMME RSE ACTUEL",
      fields: [
        { id: "currentCsrProgram", label: "Programme RSE environnemental actuel ?", type: "textarea", required: true },
        { id: "csrObjectives", label: "Objectifs RSE environnement", type: "textarea", required: true },
        { id: "carbonFootprint", label: "Bilan carbone déjà réalisé ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "sustainabilityCommitments", label: "Engagements développement durable", type: "textarea", required: true },
        { id: "environmentalPartnerships", label: "Partenariats environnement actuels", type: "textarea", required: true },
      ]
    },
    {
      section: "BESOINS S.E.T.A.L.",
      fields: [
        { id: "sitesToIntegrate", label: "Nombre de sites à intégrer", type: "number", required: true },
        { id: "employeeChallenges", label: "Challenges employés souhaités ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "greenCertification", label: "Certification \"Entreprise Verte\" souhaitée ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "automaticCsrReports", label: "Rapports RSE automatiques nécessaires ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "carbonOffset", label: "Compensation carbone souhaitée ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "citizenVisibility", label: "Visibilité citoyenne (branding) ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "annualBudget", label: "Budget annuel estimé (FCFA)", type: "number", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ],
  consortiums: [
    {
      section: "IDENTIFICATION CONSORTIUM",
      fields: [
        { id: "consortiumName", label: "Nom du consortium / partenariat", type: "text", required: true },
        { id: "type", label: "Type (PPP, multi-acteurs…)", type: "text", required: true },
        { id: "partnerCount", label: "Nombre de partenaires impliqués", type: "number", required: true },
        { id: "mainPartners", label: "Noms des partenaires principaux", type: "textarea", required: true },
        { id: "geographicZones", label: "Zones géographiques concernées", type: "textarea", required: true },
        { id: "coordinatorName", label: "Nom du coordinateur", type: "text", required: true },
        { id: "position", label: "Fonction", type: "text", required: true },
        { id: "phone", label: "Téléphone", type: "tel", required: true },
        { id: "email", label: "Email", type: "email", required: true },
      ]
    },
    {
      section: "STRUCTURE ET GOUVERNANCE",
      fields: [
        { id: "roleDistribution", label: "Répartition des rôles entre partenaires", type: "textarea", required: true },
        { id: "totalBudget", label: "Budget total du consortium estimé (FCFA)", type: "number", required: true },
        { id: "budgetDistribution", label: "Répartition du budget souhaitée ?", type: "textarea", required: true },
        { id: "sharedGovernance", label: "Gouvernance partagée nécessaire ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "contributionTracking", label: "Suivi des contributions de chaque partie ?", type: "select", required: true, options: ["Oui", "Non"] },
      ]
    },
    {
      section: "BESOINS S.E.T.A.L.",
      fields: [
        { id: "multiPartyPlatform", label: "Plateforme collaborative multi-parties ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "consolidatedReports", label: "Rapports consolidés nécessaires ?", type: "select", required: true, options: ["Oui", "Non"] },
        { id: "sitesZones", label: "Nombre de sites / zones à couvrir", type: "number", required: true },
        { id: "deploymentDeadline", label: "Délai de déploiement souhaité", type: "text", required: true },
        { id: "commitmentDuration", label: "Durée d'engagement (mois)", type: "number", required: true },
        { id: "donorsFinanciers", label: "Bailleurs / financeurs concernés", type: "textarea", required: true },
        { id: "otherRemarks", label: "Autre remarque (optionnel)", type: "textarea", required: false },
      ]
    }
  ]
};

const Questionnaire = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entityType } = useParams<{ entityType: string }>();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const config = entityType ? formConfigs[entityType] : null;

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Type d'entité non trouvé</h2>
          <Button onClick={() => navigate("/entity-selection")} className="mt-4">
            Retour à la sélection
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 3 seconds and navigate back
    setTimeout(() => {
      setIsSuccess(false);
      navigate("/");
    }, 3000);
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

        {/* Success message */}
        {isSuccess && (
          <div className="mb-8 animate-fade-in rounded-2xl border border-setal-green/30 bg-setal-green/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-setal-green/20">
                <CheckCircle className="h-6 w-6 text-setal-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-setal-green">Formulaire envoyé avec succès !</h3>
                <p className="text-sm text-muted-foreground">
                  Nous vous contacterons bientôt. Redirection en cours...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border/50 bg-card/80 p-8 shadow-card backdrop-blur-sm md:p-12">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                <span className="text-gradient">Formulaire de Contact</span>
              </h1>
              <p className="text-muted-foreground">
                Veuillez remplir les informations ci-dessous. Les champs marqués d'un * sont obligatoires.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {config.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-6">
                  <div className="border-b border-border/50 pb-2">
                    <h2 className="text-xl font-bold text-primary">{section.section}</h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {section.fields.map((field) => (
                      <div
                        key={field.id}
                        className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                      >
                        <Label htmlFor={field.id} className="mb-2 block text-sm font-medium">
                          {field.label}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>

                        {field.type === 'textarea' ? (
                          <Textarea
                            id={field.id}
                            required={field.required}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="min-h-[100px]"
                          />
                        ) : field.type === 'select' && field.options ? (
                          <select
                            id={field.id}
                            required={field.required}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Sélectionner...</option>
                            {field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            id={field.id}
                            type={field.type}
                            required={field.required}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-4 border-t border-border/50 pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer le formulaire
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;