/** Registre des pages : alimente le menu et le « plan de route » de l'accueil. */
export interface PageInfo {
  path: string;
  label: string;
  flag: string; // lettre du code international des signaux
  categorie: 'Qui je suis' | 'Ce que je fais' | 'Garder le contact';
  resume: string;
}

export const PAGES: PageInfo[] = [
  { path: '/parcours', label: 'Parcours', flag: 'P', categorie: 'Qui je suis',
    resume: 'Mon profil, ma formation, mes expériences et mon CV.' },
  { path: '/projets', label: 'Projets', flag: 'R', categorie: 'Ce que je fais',
    resume: 'Les réalisations menées en formation et en stage.' },
  { path: '/competences', label: 'Compétences', flag: 'C', categorie: 'Ce que je fais',
    resume: 'Référentiel du BTS, tableau de synthèse et certifications.' },
  { path: '/patrimoine', label: 'Patrimoine', flag: 'I', categorie: 'Ce que je fais',
    resume: 'Gestion du parc informatique pendant mon stage chez Newrest NC.' },
  { path: '/veille', label: 'Veille', flag: 'V', categorie: 'Garder le contact',
    resume: "Ma veille technologique : l'IA dans les armées." },
  { path: '/contact', label: 'Contact', flag: 'K', categorie: 'Garder le contact',
    resume: 'Téléphone, e-mail, LinkedIn ou formulaire.' },
];
