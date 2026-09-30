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
