/**
 * Référentiel officiel du BTS SIO — option SISR.
 * Bloc 1 : Support et mise à disposition de services informatiques (commun)
 * Bloc 2 : Administration des systèmes et des réseaux (SISR)
 * Bloc 3 : Cybersécurité des services informatiques (commun + spécifique SISR)
 */

export type BlocId = 1 | 2 | 3;

export interface Competence {
  id: string;
  code: string;
  bloc: BlocId;
  label: string;
  short: string;
  criteres: string[];
}

export interface Bloc {
  id: BlocId;
  titre: string;
  epreuve: string;
  description: string;
}

export const BLOCS: Bloc[] = [
  {
    id: 1,
    titre: 'Support et mise à disposition de services informatiques',
    epreuve: 'Épreuve E4',
    description:
      "Gérer le parc, répondre aux utilisateurs, travailler en mode projet et organiser son développement professionnel.",
  },
  {
    id: 2,
    titre: 'Administration des systèmes et des réseaux',
    epreuve: 'Épreuve E5',
    description:
      "Concevoir, déployer, exploiter et superviser une infrastructure réseau et système.",
  },
  {
    id: 3,
    titre: 'Cybersécurité des services informatiques',
    epreuve: 'Épreuve E6',
    description:
      "Protéger les données, l'identité numérique, les équipements et garantir la sécurité de l'infrastructure.",
  },
];

export const COMPETENCES: Competence[] = [
  // ───────────── Bloc 1 ─────────────
  {
    id: 'b1-patrimoine',
    code: 'B1.1',
    bloc: 1,
    label: 'Gérer le patrimoine informatique',
    short: 'Patrimoine',
    criteres: [
      'Recenser et identifier les ressources numériques',
      'Exploiter des référentiels, normes et standards adoptés par le prestataire informatique',
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      'Gérer des sauvegardes',
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
  },
  {
    id: 'b1-incidents',
    code: 'B1.2',
    bloc: 1,
    label: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    short: 'Incidents',
    criteres: [
      'Collecter, suivre et orienter des demandes',
      'Traiter des demandes concernant les services réseau et système, applicatifs',
      'Traiter des demandes concernant les applications',
    ],
  },
  {
    id: 'b1-presence',
    code: 'B1.3',
    bloc: 1,
    label: "Développer la présence en ligne de l'organisation",
    short: 'Présence en ligne',
    criteres: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
  },
  {
    id: 'b1-projet',
    code: 'B1.4',
    bloc: 1,
    label: 'Travailler en mode projet',
    short: 'Mode projet',
    criteres: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      'Planifier les activités',
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
  },
  {
    id: 'b1-service',
    code: 'B1.5',
    bloc: 1,
    label: 'Mettre à disposition des utilisateurs un service informatique',
    short: 'Mise à disposition',
    criteres: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      'Déployer un service',
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
  },
  {
    id: 'b1-devpro',
    code: 'B1.6',
    bloc: 1,
    label: 'Organiser son développement professionnel',
    short: 'Dév. professionnel',
    criteres: [
      "Mettre en place son environnement d'apprentissage personnel",
      'Mettre en œuvre des outils et stratégies de veille informationnelle',
      'Gérer son identité professionnelle',
      'Développer son projet professionnel',
    ],
  },

  // ───────────── Bloc 2 (SISR) ─────────────
  {
    id: 'b2-concevoir',
    code: 'B2.1',
    bloc: 2,
    label: "Concevoir une solution d'infrastructure réseau",
    short: 'Concevoir',
    criteres: [
      'Analyser un besoin exprimé et son contexte juridique',
      "Étudier l'impact d'une évolution d'un élément d'infrastructure sur le système informatique",
      "Élaborer un dossier de choix d'une solution d'infrastructure et rédiger les spécifications techniques",
      "Choisir les éléments nécessaires pour assurer la qualité et la disponibilité d'un service",
      "Maquetter et prototyper une solution d'infrastructure permettant d'atteindre la qualité de service attendue",
      "Déterminer et préparer les tests nécessaires à la validation de la solution d'infrastructure retenue",
    ],
  },
  {
    id: 'b2-installer',
    code: 'B2.2',
    bloc: 2,
    label: "Installer, tester et déployer une solution d'infrastructure réseau",
    short: 'Installer & déployer',
    criteres: [
      "Installer et configurer des éléments d'infrastructure",
      'Installer et configurer des éléments nécessaires pour assurer la continuité des services',
      'Installer et configurer des éléments nécessaires pour assurer la qualité de service',
      "Rédiger ou mettre à jour la documentation technique et utilisateur d'une solution d'infrastructure",
      "Tester l'intégration et l'acceptation d'une solution d'infrastructure",
      "Déployer une solution d'infrastructure",
    ],
  },
  {
    id: 'b2-exploiter',
    code: 'B2.3',
    bloc: 2,
    label: "Exploiter, dépanner et superviser une solution d'infrastructure réseau",
    short: 'Exploiter & superviser',
    criteres: [
      "Administrer sur site et à distance des éléments d'une infrastructure",
      "Automatiser des tâches d'administration",
      "Gérer des indicateurs et des fichiers d'activité des éléments d'une infrastructure",
      'Identifier, qualifier, évaluer et réagir face à un incident ou à un problème',
      "Évaluer, maintenir et améliorer la qualité d'un service",
    ],
  },

  // ───────────── Bloc 3 ─────────────
  {
    id: 'b3-rgpd',
    code: 'B3.1',
    bloc: 3,
    label: 'Protéger les données à caractère personnel',
    short: 'Données perso.',
    criteres: [
      "Recenser les traitements sur les données à caractère personnel au sein de l'organisation",
      'Identifier les risques liés à la collecte, au traitement, au stockage et à la diffusion des données à caractère personnel',
      'Appliquer la réglementation en matière de collecte, de traitement et de conservation des données à caractère personnel',
      'Sensibiliser les utilisateurs à la protection des données à caractère personnel',
    ],
  },
  {
    id: 'b3-identite',
    code: 'B3.2',
    bloc: 3,
    label: "Préserver l'identité numérique de l'organisation",
    short: 'Identité numérique',
    criteres: [
      "Protéger l'identité numérique d'une organisation",
      'Déployer les moyens appropriés de preuve électronique',
    ],
  },
  {
    id: 'b3-equipements',
    code: 'B3.3',
    bloc: 3,
    label: 'Sécuriser les équipements et les usages des utilisateurs',
    short: 'Équipements & usages',
    criteres: [
      "Informer les utilisateurs sur les risques associés à l'utilisation d'une ressource numérique et promouvoir les bons usages à adopter",
      'Identifier les menaces et mettre en œuvre les défenses appropriées',
      'Gérer les accès et les privilèges appropriés',
      "Vérifier l'efficacité de la protection",
    ],
  },
  {
    id: 'b3-dic',
    code: 'B3.4',
    bloc: 3,
    label:
      "Garantir la disponibilité, l'intégrité et la confidentialité des services et des données face à des cyberattaques",
    short: 'Disponibilité / Intégrité / Confidentialité',
    criteres: [
      "Caractériser les risques liés à l'utilisation malveillante d'un service informatique",
      "Recenser les conséquences d'une perte de disponibilité, d'intégrité ou de confidentialité",
      "Identifier les obligations légales qui s'imposent en matière d'archivage et de protection des données de l'organisation",
      'Organiser la collecte et la conservation des preuves numériques',
      'Appliquer les procédures garantissant le respect des obligations légales',
    ],
  },
  {
    id: 'b3-infra',
    code: 'B3.5',
    bloc: 3,
    label: "Assurer la cybersécurité d'une infrastructure réseau, d'un système, d'un service",
    short: 'Cybersécurité infra',
    criteres: [
      "Participer à la vérification des éléments contribuant à la sûreté d'une infrastructure informatique",
      "Prendre en compte la sécurité dans un projet de mise en œuvre d'une solution d'infrastructure",
      "Mettre en œuvre et vérifier la conformité d'une infrastructure à un référentiel, une norme ou un standard de sécurité",
      'Prévenir les attaques',
      'Détecter les actions malveillantes',
      'Analyser les incidents de sécurité, proposer des mesures de remédiation',
    ],
  },
];

export const competenceById = (id: string) => COMPETENCES.find((c) => c.id === id);
