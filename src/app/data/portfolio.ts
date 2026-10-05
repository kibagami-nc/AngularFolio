/**
 * ✏️  Tout le contenu du portfolio est ici — les pages se mettent à jour automatiquement.
 * Source : github.com/raphaelbill/portfolio + CV.
 */

export const PROFILE = {
  prenom: 'Raphaël',
  nom: 'Billot',
  age: 20,
  titre: 'Étudiant BTS SIO — option SISR',
  accroche: 'Je prépare mon avenir dans la Marine Nationale.',
  intro:
    'Étudiant en BTS SIO spécialisé en systèmes et réseaux, je construis des infrastructures fiables, sécurise des environnements et accompagne les utilisateurs.',
  presentation: [
    'Je suis Raphaël Billot, étudiant en BTS SIO option SISR. Je prépare mon avenir dans la Marine Nationale en développant des compétences solides en réseaux, sécurité et support technique.',
    'Passionné par les environnements techniques et les missions terrain, je construis des solutions claires, fiables et faciles à utiliser pour mes utilisateurs.',
  ],
  objectif:
    "M'engager dans la Marine Nationale et rentrer à l'École de Maistrance afin de devenir navigateur / timonier.",
  ville: 'Dumbéa, Nouvelle-Calédonie',
  coordonnees: '22°09′S · 166°27′E',
  email: 'raphbil22@gmail.com',
  telephone: '+687 82 22 97',
  telephoneHref: 'tel:+687822297',
  linkedin: 'https://www.linkedin.com/in/rapha%C3%ABl-billot-62a8023b4/',
  photo: 'profil.jpg',
  cv: 'raphael_billot_cv.jpg',
  disponibilite: 'Disponible pour des stages, alternances et projets',
  reponse: 'Je réponds généralement sous 24\u00a0h.',
  interets: [
    { label: 'Marine Nationale', icon: 'lucideAnchor' },
    { label: 'Réseaux & sécurité', icon: 'lucideNetwork' },
    { label: '4x4 & mécanique', icon: 'lucideWrench' },
    { label: 'Orienté résultat', icon: 'lucideTarget' },
  ],
  qualites: ['Motivé', 'Rigoureux', 'Assidu', 'Ponctuel', "Esprit d'équipe"],
  diplomes: [
    'Baccalauréat technologique STMG',
    'PSC 1 — Prévention et secours civiques',
    'Certificat restreint de radiotéléphoniste',
    'Permis côtier',
    'Permis B + véhiculé',
  ],
  langues: [{ nom: 'Anglais', niveau: 'B2' }],
};

// ─────────────────────────── Formation ───────────────────────────
export interface Formation {
  periode: string;
  titre: string;
  lieu: string;
  description: string;
  tags: string[];
}

export const FORMATIONS: Formation[] = [
  {
    periode: '2025 — 2026',
    titre: 'BTS SIO — option SISR',
    lieu: 'Lycée Dick Ukeiwe, Dumbéa',
    description:
      'Formation en systèmes et réseaux, administration de serveurs, cybersécurité et support utilisateur. Projets pratiques en entreprise et stages pour renforcer mes compétences techniques.',
    tags: ['Réseau', 'Cybersécurité', 'Support'],
  },
  {
    periode: '2023 — 2025',
    titre: 'Baccalauréat STMG — spécialité SIG',
    lieu: 'Lycée Dick Ukeiwe, Dumbéa',
    description:
      "Découverte des systèmes d'information et du management, avec un intérêt croissant pour l'informatique et le numérique.",
    tags: ['SIG', 'Numérique', 'Management'],
  },
];

// ─────────────────────────── Expériences ───────────────────────────
export interface Experience {
  periode: string;
  annee: number;
  entreprise: string;
  type: string;
  description: string;
  tags: string[];
  it?: boolean;
}

export const EXPERIENCES: Experience[] = [
  {
    periode: '29 juin — 7 août 2026',
    annee: 2026,
    entreprise: 'Newrest NC',
    type: 'Stage BTS SIO — 2ᵉ année · Pôle informatique',
    description:
      "6 semaines au pôle informatique (350 collaborateurs, sites PK4, Tontouta, GORO, INM) : déploiement de postes sur le domaine, supervision PRTG, schémas d'infrastructure, tickets iTop, inventaire des tablettes et sensibilisation au phishing.",
    tags: ['Active Directory', 'PRTG', 'iTop', 'Parc informatique'],
    it: true,
  },
  {
    periode: 'Fin 2025 — Début 2026',
    annee: 2026,
    entreprise: 'Ducos Quincaillerie',
    type: "Job d'été — manutentionnaire",
    description:
      "Service client, gestion des stocks et accueil en magasin pour améliorer l'organisation et le service.",
    tags: ['Accueil', 'Stocks', 'Relation client'],
  },
  {
    periode: 'Oct. — Nov. 2025',
    annee: 2025,
    entreprise: 'La Calédonienne de Solutions Business',
    type: 'Stage BTS SIO — 1ʳᵉ année',
    description:
      "Initiation aux services informatiques d'entreprise, support utilisateur et découverte des solutions métiers.",
    tags: ['Support', 'BTS SIO', 'Solutions business'],
    it: true,
  },
  {
    periode: 'Été 2024',
    annee: 2024,
    entreprise: 'Sodemo — Port Moselle',
    type: "Job d'été — ouvrier",
    description:
      'Assistance logistique et manutention au port, participation aux opérations de chargement.',
    tags: ['Logistique', 'Portuaire', 'Manutention'],
  },
  {
    periode: '2023',
    annee: 2023,
    entreprise: "Fonds Social de l'Habitat",
    type: 'Stage de découverte',
    description:
      'Découverte du secteur social, accompagnement administratif et gestion de dossiers bénéficiaires.',
    tags: ['Social', 'Administration', 'Accompagnement'],
  },
  {
    periode: '2022 — 2023',
    annee: 2022,
    entreprise: 'Préparation Militaire Marine',
    type: 'Programme de préparation — marin',
    description:
      'Préparation physique et mentale pour intégrer la Marine Nationale, axée sur la discipline et le travail en équipe.',
    tags: ['Marine', 'Militaire', 'Préparation'],
  },
  {
    periode: '2021',
    annee: 2021,
    entreprise: 'Ducos Quincaillerie',
    type: 'Stage de découverte',
    description: 'Première immersion professionnelle en commerce, service client et gestion de magasin.',
    tags: ['Découverte', 'Commerce', 'Stage'],
  },
];

// ─────────────────────────── Projets ───────────────────────────
export type ContexteProjet = 'Formation' | 'Stage' | 'Personnel';

export interface Projet {
  id: string;
  titre: string;
  resume: string;
  contexte: ContexteProjet;
  categorie: 'Réseau' | 'Sécurité' | 'Systèmes' | 'Support' | 'Veille';
  objectifs: string[];
  etapes: string[];
  resultat: string;
  tags: string[];
  competences: string[]; // ids du référentiel (src/app/data/referentiel.ts)
}

export const PROJETS: Projet[] = [
  {
    id: 'refonte-reseau',
    titre: "Refonte d'un réseau d'entreprise",
    resume: "Analyse et segmentation pour sécuriser et optimiser le réseau d'une organisation.",
    contexte: 'Formation',
    categorie: 'Réseau',
    objectifs: [
      "Analyser l'existant et identifier les faiblesses du réseau",
      'Séparer les flux par service grâce aux VLAN',
      "Sécuriser l'accès Wi-Fi et améliorer les performances",
    ],
    etapes: [
      "Relevé de l'infrastructure existante et du plan d'adressage",
      'Conception de la nouvelle architecture et du schéma réseau',
      'Configuration des VLAN sur les switchs Cisco et du routage inter-VLAN',
      'Mise en place du Wi-Fi segmenté (réseau interne / invités)',
      'Tests de connectivité et rédaction de la documentation',
    ],
    resultat:
      'Un réseau segmenté, plus lisible et plus sûr : chaque service dispose de son propre segment et les invités sont isolés.',
    tags: ['VLAN', 'Wi-Fi', 'Cisco'],
    competences: ['b1-projet', 'b2-concevoir', 'b2-installer', 'b3-infra'],
  },
  {
    id: 'ids-suricata',
    titre: "Installation d'un IDS Suricata",
    resume: 'Déploiement d’un système de détection d’intrusions pour surveiller le trafic réseau.',
    contexte: 'Formation',
    categorie: 'Sécurité',
    objectifs: [
      'Détecter les comportements malveillants sur le réseau',
      'Centraliser et analyser les alertes de sécurité',
    ],
    etapes: [
      'Installation de Suricata sur un serveur Linux',
      "Choix de l'interface d'écoute et configuration du réseau surveillé",
      'Activation et mise à jour des jeux de règles',
      'Génération de trafic de test pour déclencher des alertes',
      'Lecture et analyse des journaux d’alertes',
    ],
    resultat:
      "Le trafic est surveillé en continu et les tentatives suspectes remontent sous forme d'alertes exploitables.",
    tags: ['IDS', 'Suricata', 'Monitoring'],
    competences: ['b3-infra', 'b3-dic', 'b2-exploiter'],
  },
  {
    id: 'serveur-dhcp',
    titre: 'Serveur DHCP automatisé',
    resume: "Configuration d'un serveur DHCP pour automatiser l'attribution des adresses IP.",
    contexte: 'Formation',
    categorie: 'Systèmes',
    objectifs: [
      "Supprimer la configuration manuelle des adresses IP",
      "Éviter les conflits d'adresses sur le réseau",
    ],
    etapes: [
      'Installation et configuration du service DHCP',
      'Définition des étendues, de la passerelle et des serveurs DNS',
      'Réservations d’adresses pour les équipements fixes (imprimantes, serveurs)',
      'Tests de distribution sur les postes clients',
      'Documentation de la configuration',
    ],
    resultat: 'Les postes reçoivent automatiquement une configuration réseau correcte dès leur connexion.',
    tags: ['DHCP', 'Infrastructure', 'Automatisation'],
    competences: ['b2-installer', 'b1-service', 'b2-exploiter'],
  },
  {
    id: 'serveur-samba',
    titre: 'Serveur Samba de partage',
    resume: "Création d'un espace de stockage partagé sécurisé pour un usage collaboratif.",
    contexte: 'Formation',
    categorie: 'Systèmes',
    objectifs: [
      'Mettre à disposition un espace de fichiers commun',
      'Contrôler qui peut lire ou modifier les données',
    ],
    etapes: [
      'Installation de Samba sur un serveur Linux',
      'Création des utilisateurs, des groupes et des dossiers partagés',
      'Attribution des droits d’accès selon les besoins de chaque groupe',
      'Connexion des postes Windows au partage et tests',
      'Guide d’utilisation pour les utilisateurs',
    ],
    resultat:
      'Les utilisateurs partagent leurs fichiers simplement, avec des droits adaptés qui protègent les données sensibles.',
    tags: ['Samba', 'Partage', 'Sécurité'],
    competences: ['b1-patrimoine', 'b1-service', 'b2-installer', 'b3-equipements', 'b3-rgpd'],
  },
  {
    id: 'deploiement-postes',
    titre: 'Déploiement et remise en service de postes',
    resume:
      'Stage Newrest NC : intégration de postes Windows 11 au domaine, sécurisation par GPO et seconde vie de laptops sous Linux Mint.',
    contexte: 'Stage',
    categorie: 'Systèmes',
    objectifs: [
      'Remettre en service du matériel en stock pour limiter les achats',
      'Livrer des postes conformes à la politique de sécurité du groupe',
      'Équiper la base aérienne de Tontouta d’un poste d’impression d’étiquettes',
    ],
    etapes: [
      'Réinstallation de Windows 11 Pro depuis une clé Rufus, compte local via BypassNRO (pas de compte Microsoft)',
      'Renommage selon la nomenclature du parc (NC-NMA-LP10, NC-NMA-LP14, NC-TTA-DT03)',
      'Intégration au domaine newrest.corp dans la bonne OU (PowerShell Add-Computer)',
      'Mot de passe BIOS, puis vérification des GPO : BitLocker, LAPS, antivirus, lecteurs réseau (gpupdate /force)',
      'Reconditionnement de 2 laptops obsolètes sous Linux Mint pour les inductions RH',
      'Installation de P-Touch Editor et de l’imprimante Brother QL-700 à Tontouta',
    ],
    resultat:
      '5 postes remis en service : 2 postes de secours au siège, 2 laptops Linux pour les RH et 1 poste d’étiquetage à Tontouta, tous conformes aux GPO.',
    tags: ['Windows 11', 'Active Directory', 'GPO', 'BitLocker', 'Linux Mint'],
    competences: ['b1-patrimoine', 'b1-service', 'b2-installer', 'b3-equipements'],
  },
  {
    id: 'scan-serveur-fichiers',
    titre: 'Scan vers serveur de fichiers',
    resume:
      'Stage Newrest NC : centraliser les CV scannés par les RH sur un partage réseau sécurisé au lieu de la messagerie.',
    contexte: 'Stage',
    categorie: 'Systèmes',
    objectifs: [
      'Centraliser plus de 2 000 CV reçus jusque-là par e-mail',
      'Limiter l’accès à ces données personnelles au seul service RH',
    ],
    etapes: [
      'Création d’un compte de service « CV.NC » dans l’Active Directory pour le photocopieur',
      'Création d’un dossier partagé aux droits restreints (sessions RH + compte CV.NC)',
      'Paramétrage du TASKalfa 3253ci : compte et chemin UNC du partage',
      'Tests de scan, contrôle des droits d’accès',
      'Formation du service RH à la nouvelle procédure',
    ],
    resultat: 'Les RH retrouvent les CV directement sur le serveur de fichiers, avec un accès limité aux personnes autorisées.',
    tags: ['Active Directory', 'Partage SMB', 'Droits NTFS', 'RGPD'],
    competences: ['b1-service', 'b1-patrimoine', 'b2-installer', 'b3-rgpd'],
  },
  {
    id: 'supervision-prtg',
    titre: 'Supervision PRTG et schémas d’infrastructure',
    resume:
      'Stage Newrest NC : mise à jour de la supervision réseau et relevé de l’infrastructure des sites de Tontouta et GORO.',
    contexte: 'Stage',
    categorie: 'Réseau',
    objectifs: [
      'Fiabiliser la supervision du parc réseau',
      'Documenter l’existant avant l’installation d’un nouveau Fortinet à GORO',
    ],
    etapes: [
      'Prise en main de PRTG Network Monitor et contrôle des sondes existantes',
      'Mise à jour d’une carte réseau obsolète, création de 17 sondes',
      'Induction sécurité GORO (passeport obligatoire pour le site industriel)',
      'Relevé sur site de l’infrastructure à l’aéroport de Tontouta et à GORO',
      'Réalisation des schémas sous Visio',
    ],
    resultat:
      '17 équipements supplémentaires supervisés et deux schémas d’infrastructure qui servent de base au projet Fortinet.',
    tags: ['PRTG', 'Visio', 'Fortinet', 'Supervision'],
    competences: ['b2-exploiter', 'b2-concevoir', 'b1-patrimoine', 'b1-projet'],
  },
  {
    id: 'incidents-itop',
    titre: 'Gestion d’incidents avec iTop',
    resume:
      'Stage Newrest NC : traitement de tickets de A à Z, avec prise en main à distance (VPN FortiClient, certificat SSL expiré).',
    contexte: 'Stage',
    categorie: 'Support',
    objectifs: [
      'Rétablir rapidement l’accès des utilisateurs à leurs outils',
      'Tracer chaque intervention dans l’outil ITSM',
    ],
    etapes: [
      'Prise en charge du ticket iTop et passage au statut « En cours »',
      'VPN : vérification des droits du compte dans l’AD du groupe (NDE)',
      'Prise en main à distance via TeamViewer, diagnostic de FortiClient : mot de passe expiré (renouvellement tous les 3 mois)',
      'SIRH Sohorsys : certificat SSL du serveur expiré, accès temporaire et signalement à l’équipe compétente',
      'Clôture des tickets avec un commentaire de résolution',
    ],
    resultat: 'Deux incidents résolus à distance et documentés dans iTop, dont un escaladé pour une correction définitive.',
    tags: ['iTop', 'TeamViewer', 'FortiClient', 'SSL'],
    competences: ['b1-incidents', 'b1-patrimoine', 'b3-infra'],
  },
  {
    id: 'sensibilisation-phishing',
    titre: 'Sensibilisation au phishing',
    resume:
      'Stage Newrest NC : rencontre des employés piégés par une campagne de phishing simulée pour leur apprendre à repérer les e-mails frauduleux.',
    contexte: 'Stage',
    categorie: 'Sécurité',
    objectifs: [
      'Sensibiliser les 7 employés ayant saisi leurs identifiants',
      'Garder une trace officielle de chaque sensibilisation',
    ],
    etapes: [
      'Préparation des supports : fiche réflexe, faux e-mail annoté, feuille de présence',
      'Analyse des indices : domaine supportres.org, ton alarmiste, bannière « expéditeur externe »',
      'Entretiens individuels sur les sites PK4, Tontouta, GORO et INM',
      'Signature de la feuille de présence par chaque employé',
    ],
    resultat: '100 % des employés concernés sensibilisés, avec une approche pédagogique et sans jugement.',
    tags: ['Phishing', 'Sensibilisation', 'Communication'],
    competences: ['b3-equipements', 'b3-identite', 'b1-service'],
  },
  {
    id: 'stage-support',
    titre: 'Support utilisateur en entreprise',
    resume:
      "Stage de 1ʳᵉ année chez La Calédonienne de Solutions Business : assistance aux utilisateurs et découverte des solutions métiers.",
    contexte: 'Stage',
    categorie: 'Support',
    objectifs: [
      'Répondre aux demandes et incidents des utilisateurs',
      "Découvrir le fonctionnement du service informatique d'une entreprise",
    ],
    etapes: [
      'Prise en charge et suivi des demandes via un outil de ticketing',
      'Diagnostic et résolution d’incidents courants',
      'Participation à la gestion du parc informatique',
      'Découverte et accompagnement sur les solutions métiers',
    ],
    resultat:
      'Première expérience concrète du support : écoute, méthode de diagnostic et communication avec les utilisateurs.',
    tags: ['Support', 'Ticketing', "Travail d'équipe"],
    competences: ['b1-incidents', 'b1-patrimoine', 'b1-service'],
  },
  {
    id: 'veille-ia',
    titre: 'Veille IA et cybersécurité',
    resume: 'Suivi des tendances pour anticiper les risques et opportunités dans les environnements sécurisés.',
    contexte: 'Personnel',
    categorie: 'Veille',
    objectifs: [
      "Suivre l'usage de l'IA dans les forces armées",
      'Identifier les nouveaux risques et les opportunités en cybersécurité',
    ],
    etapes: [
      'Sélection de sources fiables (ministère des Armées, presse)',
      'Lecture et tri régulier des articles',
      'Synthèse des points clés sur la page Veille',
    ],
    resultat: 'Une veille structurée qui relie mon projet Marine Nationale aux enjeux du numérique.',
    tags: ['IA', 'Cyber', 'Marine'],
    competences: ['b1-devpro', 'b3-dic'],
  },
  {
    id: 'portfolio',
    titre: 'Portfolio professionnel',
    resume: 'Conception et publication de ce portfolio pour présenter mon parcours et mes compétences.',
    contexte: 'Personnel',
    categorie: 'Veille',
    objectifs: [
      'Valoriser mon parcours et mes projets auprès des recruteurs',
      'Maîtriser mon identité professionnelle en ligne',
    ],
    etapes: [
      'Choix du contenu et de la structure des pages',
      'Développement du site avec Angular et publication sur GitHub',
      'Liens vers mon profil LinkedIn et mon CV',
      'Formulaire de contact qui ne stocke aucune donnée personnelle',
    ],
    resultat: 'Une vitrine claire de mon parcours, utilisée pour l’examen et mes candidatures.',
    tags: ['Angular', 'GitHub', 'Identité numérique'],
    competences: ['b1-presence', 'b1-devpro', 'b3-identite', 'b3-rgpd'],
  },
];

// ─────────────────────────── Compétences clés ───────────────────────────
export const COMPETENCES_CLES = [
  {
    titre: 'Réseaux & infrastructure',
    icon: 'lucideNetwork',
    description:
      "Conception de réseaux filaires et Wi-Fi, administration d'équipements et optimisation des performances.",
    tags: ['VLAN', 'DHCP', 'Switch / Routeur'],
  },
  {
    titre: 'Cybersécurité',
    icon: 'lucideShieldCheck',
    description:
      'Surveillance, protection et audits de systèmes pour limiter les risques et assurer la continuité du service.',
    tags: ['IDS', 'RGPD', 'Samba'],
  },
  {
    titre: 'Support & gestion',
    icon: 'lucideHeadset',
    description:
      'Accompagnement utilisateur, documentation et intervention rapide pour maintenir les activités opérationnelles.',
    tags: ['Support', 'Ticketing', "Travail d'équipe"],
  },
];

// ─────────────────────────── Certifications ───────────────────────────
export interface Certification {
  nom: string;
  detail: string;
  date: string;
  statut: 'Obtenue' | 'En cours';
  description: string;
  tags: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    nom: 'PIX',
    detail: '504 points',
    date: '2025 / 2026',
    statut: 'Obtenue',
    description: 'Certification nationale en compétences numériques, collaboration et sécurité des données.',
    tags: ['Sécurité', 'Numérique'],
  },
  {
    nom: 'Cisco NetAcad',
    detail: 'Terminé',
    date: '2025 / 2026',
    statut: 'Obtenue',
    description: "Support et sécurité des réseaux : diagnostic, prévention et administration d'un réseau sécurisé.",
    tags: ['Cisco', 'Réseau', 'Sécurité'],
  },
  {
    nom: "CNIL — L'Atelier RGPD",
    detail: 'En cours',
    date: '2025',
    statut: 'En cours',
    description: 'Attestation de connaissances en protection des données personnelles et conformité RGPD.',
    tags: ['RGPD', 'Données', 'Conformité'],
  },
  {
    nom: 'Cybersécurité maritime',
    detail: 'FUN-MOOC',
    date: '2026',
    statut: 'En cours',
    description: 'Formation en cybersécurité appliquée aux environnements maritimes.',
    tags: ['Cybersécurité', 'Maritime'],
  },
];

// ─────────────────────────── Veille ───────────────────────────
export const VEILLE = {
  sujet: "L'IA dans les armées",
  intro:
    "La technologie de l'IA se déploie dans les forces armées, avec des applications pour la surveillance, l'aide à la décision et la cybersécurité.",
  pourquoi:
    "Ce sujet relie directement mon projet d'intégrer la Marine Nationale et ma formation en systèmes et réseaux : les futurs marins travailleront avec des systèmes d'IA, qu'il faudra comprendre, exploiter et protéger.",
  axes: [
    {
      titre: 'Surveillance',
      icon: 'lucideRadar',
      texte: "Analyse automatique des images, des signaux et des capteurs pour repérer plus vite ce qui compte.",
    },
    {
      titre: 'Aide à la décision',
      icon: 'lucideCompass',
      texte: "Synthèse d'informations en temps réel pour aider les opérateurs, l'humain gardant la décision finale.",
    },
    {
      titre: 'Cybersécurité',
      icon: 'lucideShieldCheck',
      texte: "Détection des attaques, mais aussi nouvelles menaces : l'IA devient elle-même une cible à protéger.",
    },
  ],
  articles: [
    {
      source: 'Défense.gouv.fr',
      titre: "Comprendre l'IA et la défense",
      type: 'Source principale',
      url: 'https://www.defense.gouv.fr/actualites/comprendre-lia-defense',
    },
    {
      source: "L'Indépendant",
      titre: "Guerre en Ukraine : la tourelle antidrone Khyzhak, dotée d'une IA, utilisée pour la première fois au combat",
      type: 'Article récent',
      url: 'https://www.lindependant.fr/2026/05/10/guerre-en-ukraine-la-tourelle-antidrone-khyzhak-dotee-dune-ia-utilisee-pour-la-premiere-fois-au-combat-par-larmee-ukrainienne-13364672.php',
    },
    {
      source: 'RTBF',
      titre: "Claude, l'IA qui aide l'armée américaine",
      type: 'Article récent',
      url: 'https://www.rtbf.be/article/claude-l-ia-qui-aide-l-armee-americaine-a-frapper-l-iran-11690099',
    },
  ],
  tags: ['IA', 'Défense', 'Cybersécurité', 'Anthropic', 'Drones'],
};

// ─────────────────────────── Patrimoine (stage Newrest NC) ───────────────────────────
export interface QuestionPatrimoine {
  q: string;
  r: string;
  points?: string[];
  outils?: string[];
}

export interface AxePatrimoine {
  id: string;
  titre: string;
  titreEm: string;
  sousTitre: string;
  questions: QuestionPatrimoine[];
}

export const PATRIMOINE = {
  entreprise: 'Newrest NC',
  periode: '29 juin — 7 août 2026',
  contexte:
    "Newrest NC compte 350 collaborateurs répartis entre Nouméa (PK4), l'aéroport de Tontouta, le site minier de GORO et plusieurs sites de santé. Tout ce parc est géré localement par un pôle informatique très réduit : c'est ce qui m'a appris à quel point l'inventaire, la supervision et la documentation comptent.",
  chiffres: [
    { valeur: '350', label: 'collaborateurs équipés' },
    { valeur: '6', label: 'sites (PK4, Tontouta, GORO, UNC, Médipole, INM)' },
    { valeur: '1', label: 'informaticien sur place, aussi RSSI' },
    { valeur: '19', label: 'tablettes inventoriées' },
    { valeur: '17', label: 'sondes PRTG créées' },
  ],
  axes: [
    {
      id: 'normes',
      titre: 'Respect des normes',
      titreEm: 'et des standards.',
      sousTitre: 'Référentiels, gestion des incidents, réglementation et cybersécurité.',
      questions: [
        {
          q: "L'entreprise suit-elle des normes particulières ?",
          r: "Newrest ne revendique pas officiellement ITIL ou COBIT pour son informatique, mais le groupe applique des normes strictes en Qualité, Hygiène, Sécurité, Sûreté et Environnement (QHSSE) via son programme interne « I Care », et il est certifié ISO 9001 et ISO 22000. Le support informatique suit une procédure interne inspirée d'ITIL.",
          outils: ['QHSSE « I Care »', 'ISO 9001', 'ISO 22000', 'ITIL (inspiration)'],
        },
        {
          q: "Les intervenants ont-ils des attributions spécifiques ? Existe-t-il des niveaux d'intervention ?",
          r: "Mon tuteur, Karim Toumi, est le seul informaticien du site : il gère l'architecture réseau et les incidents, et couvre donc tous les niveaux. Pendant le stage, on retrouvait pourtant bien la logique des niveaux :",
          points: [
            'Niveau 1 — prise en charge du ticket et diagnostic à distance (ex. : mot de passe FortiClient expiré)',
            'Niveau 2 — intervention sur site quand le problème est matériel (ex. : poste d’étiquetage à Tontouta)',
            'Niveau 3 — escalade vers le siège ou l’éditeur (ex. : certificat SSL expiré du SIRH Sohorsys)',
          ],
        },
        {
          q: "Décrivez le processus de gestion des incidents, de la création du ticket à la résolution.",
          r: "J'ai traité moi-même des tickets en suivant ce processus :",
          points: [
            'L’utilisateur ouvre un ticket dans iTop (ou prévient par e-mail)',
            'Le ticket est pris en charge et passe au statut « En cours de traitement »',
            'Analyse : appel de l’utilisateur, vérification des droits dans l’AD du groupe (NDE)',
            'Résolution à distance (TeamViewer, AnyDesk) ou déplacement sur site si nécessaire',
            'Clôture du ticket avec un commentaire de résolution, qui sert d’historique',
          ],
          outils: ['iTop', 'TeamViewer', 'AnyDesk'],
        },
        {
          q: 'Comment l’entreprise prend-elle en compte le RGPD et la réglementation ?',
          r: "L'impression est protégée par un identifiant propre à chaque employé, ce qui évite qu'un document confidentiel reste sur un copieur. Lors de mon stage, le dossier des CV scannés a été réservé aux seules sessions RH et à un compte de service dédié, et les disques des postes sont chiffrés par BitLocker.",
          outils: ['Impression sécurisée', 'Droits NTFS', 'BitLocker'],
        },
        {
          q: 'Comment les informations sont-elles partagées dans l’équipe et l’entreprise ?',
          r: "L'équipe informatique locale se résume à une personne : le partage passe surtout par l'historique des tickets iTop, l'e-mail et les dossiers partagés du serveur de fichiers. Les décisions et la veille viennent du siège du groupe, à Toulouse.",
        },
        {
          q: 'Quelles pratiques de développement logiciel ?',
          r: "Aucun développement n'est fait localement : les logiciels métier (SIRH Sohorsys, outils de gestion) sont fournis par le groupe ou par des éditeurs. Il n'y a donc pas de partage de code ni d'outil de gestion de versions sur le site.",
        },
        {
          q: 'Quelles pratiques en cybersécurité ? Veille, mises à jour, RSSI ?',
          r: "Karim Toumi fait aussi office de RSSI. La sécurité repose sur :",
          points: [
            'Le renouvellement des équipements (nouveau routeur, nouvelles bornes, nouveau pare-feu Fortinet à GORO)',
            'Un scan réseau mensuel avec des indicateurs de suivi des mises à jour',
            'Des GPO qui imposent BitLocker, LAPS, l’antivirus et le verrouillage automatique des postes',
            'Une politique de mot de passe renouvelé tous les 3 mois',
            'Des campagnes de phishing simulé lancées par le siège, suivies de sensibilisation (que j’ai menée sur 4 sites)',
          ],
        },
      ],
    },
    {
      id: 'configurations',
      titre: 'Gestion',
      titreEm: 'des configurations.',
      sousTitre: 'Inventaire, déploiement, supervision et documentation du parc.',
      questions: [
        {
          q: 'Quel outil sert à répertorier les matériels et les licences ?',
          r: "Il n'y a ni GLPI ni OCS-Inventory : l'inventaire est tenu dans des fichiers Excel et des bases de données, complétés par plusieurs outils spécialisés.",
          points: [
            'PRTG — état et configuration des équipements réseau',
            'Active Directory — liste des postes, rangés par OU dans le domaine newrest.corp',
            'Knox Manage (MDM Samsung) — flotte de tablettes : IMEI, n° de série, modèle, MAC, SIM',
            'Nomenclature des postes, ex. NC-TTA-DT03 : filiale · site · type · numéro',
          ],
          outils: ['Excel', 'PRTG', 'Active Directory', 'Knox Manage'],
        },
        {
          q: 'Avez-vous participé à une migration ?',
          r: "Nous avons migré la machine virtuelle du service informatique qui héberge les contrôleurs UniFi (Wi-Fi) et PRTG (supervision).",
          outils: ['UniFi', 'PRTG', 'Virtualisation'],
        },
        {
          q: 'Comment sont déployés les nouveaux postes ?',
          r: "Manuellement, sans clonage ni master : chaque poste suit la même procédure, que j'ai appliquée sur 3 PC Windows 11.",
          points: [
            'Installation de Windows 11 Pro (clé Rufus, compte local sans compte Microsoft)',
            'Renommage selon la nomenclature (Rename-Computer)',
            'Mises à jour Windows complètes et mot de passe BIOS',
            'Intégration au domaine dans la bonne OU (Add-Computer)',
            'Vérification des GPO : BitLocker, LAPS, antivirus, lecteurs réseau (gpupdate /force)',
          ],
          outils: ['PowerShell', 'Rufus', 'GPO'],
        },
        {
          q: 'Des outils de supervision sont-ils utilisés ?',
          r: "Oui, PRTG Network Monitor. J'ai contrôlé les sondes existantes, mis à jour une carte obsolète et créé 17 nouvelles sondes : la supervision couvre désormais 17 équipements de plus.",
          outils: ['PRTG'],
        },
        {
          q: 'Des documentations techniques sont-elles rédigées et conservées ?',
          r: "Elles sont rédigées sous Word et archivées en PDF. J'en ai moi-même produit plusieurs :",
          points: [
            'Schémas Visio de l’infrastructure IT de Tontouta et GORO, base du projet Fortinet',
            'Rapport d’inventaire et de géolocalisation des 19 tablettes de GORO, remis au directeur',
            'Procédure de scan vers le serveur de fichiers, expliquée au service RH',
          ],
          outils: ['Word', 'PDF', 'Visio'],
        },
      ],
    },
    {
      id: 'competences',
      titre: 'Gestion',
      titreEm: 'des compétences.',
      sousTitre: 'Formations, autoformation, nouvelles technologies et veille.',
      questions: [
        {
          q: "L'entreprise vous a-t-elle proposé une formation ?",
          r: "Oui, plusieurs :",
          points: [
            'Le MOOC SecNumacadémie de l’ANSSI : Panorama de la SSI, Sécurité de l’authentification, Sécurité sur Internet, Sécurité du poste de travail',
            'L’induction sécurité et le passeport sécurité, obligatoires pour accéder au site industriel de GORO',
          ],
          outils: ['ANSSI', 'Passeport sécurité'],
        },
        {
          q: 'Avez-vous dû vous autoformer ?',
          r: "Oui : le MOOC de l'ANSSI se suit en autonomie, et j'ai appris sur le terrain les commandes PowerShell d'intégration au domaine et le contournement du compte Microsoft à l'installation de Windows 11.",
        },
        {
          q: 'Avez-vous étudié une nouvelle technologie ou un nouvel outil ?',
          r: "Oui : UniFi pour le Wi-Fi, PRTG pour la supervision, Knox Manage pour la gestion des tablettes et iTop pour les tickets. Aucun de ces outils n'était au programme de ma formation.",
          outils: ['UniFi', 'PRTG', 'Knox Manage', 'iTop'],
        },
        {
          q: "L'entreprise a-t-elle une veille technologique ? Et vous ?",
          r: "Le site de Nouméa n'organise pas de veille lui-même : elle est assurée par le siège du groupe à Toulouse. De mon côté, je mène une veille sur l'IA dans les armées, en lien avec mon projet d'intégrer la Marine Nationale.",
        },
      ],
    },
  ] as AxePatrimoine[],
  nomenclature: {
    exemple: ['NC', 'TTA', 'DT', '03'],
    parties: [
      { code: 'NC', sens: 'Filiale (Nouvelle-Calédonie)' },
      { code: 'TTA / NMA', sens: 'Site (Tontouta, Nouméa)' },
      { code: 'DT / LP', sens: 'Type (desktop, laptop)' },
      { code: '03', sens: 'Numéro dans la série' },
    ],
    note: "Sans GLPI, la nomenclature fait office de premier inventaire : on sait où se trouve un poste et ce que c'est, dans l'AD comme dans PRTG ou iTop.",
  },
  inventaire: [
    { champ: 'Nom', detail: "Identifiant attribué à l'appareil" },
    { champ: 'IMEI', detail: "Identité internationale de l'équipement" },
    { champ: 'Numéro de série', detail: 'Identifiant constructeur unique' },
    { champ: 'Modèle', detail: 'Référence Samsung' },
    { champ: 'Adresse MAC', detail: "Identifiant réseau de l'appareil" },
    { champ: 'Carte SIM', detail: 'Présente ou absente' },
  ],
  inventaireNote:
    "2 tablettes sur 19 n'ont pas pu être localisées (une éteinte depuis 5 jours, une sans carte SIM) : elles ont été signalées dans le rapport plutôt qu'ignorées.",
  // preuves pour chaque critère de B1.1, dans l'ordre du référentiel (null = non abordé en stage)
  preuves: [
    'Inventaire des 19 tablettes via Knox Manage, schémas des sites, postes nommés selon la nomenclature.',
    'Procédure de support inspirée d’ITIL dans iTop, normes QHSSE et ISO 9001 / 22000 du groupe, OU et GPO de l’Active Directory.',
    'Droits VPN vérifiés dans NDE, partage des CV limité aux RH et au compte de service CV.NC, mots de passe admin locaux gérés par LAPS.',
    'Supervision PRTG étendue, migration de la VM UniFi / PRTG, 2 postes de secours au siège, certificat SSL expiré escaladé.',
    null,
    'Sensibilisation au phishing, mots de passe renouvelés tous les 3 mois, impression sécurisée par identifiant, verrouillage automatique par GPO.',
  ] as (string | null)[],
};
