import { Routes } from '@angular/router';

const t = (s: string) => `${s} — Raphaël Billot · BTS SIO SISR`;

export const routes: Routes = [
  { path: '', title: 'Raphaël Billot — Portfolio BTS SIO SISR',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'parcours', title: t('Parcours'),
    loadComponent: () => import('./pages/parcours/parcours').then((m) => m.Parcours) },
  { path: 'projets', title: t('Projets'),
    loadComponent: () => import('./pages/projets/projets').then((m) => m.Projets) },
  { path: 'projets/:id', title: t('Projet'),
    loadComponent: () => import('./pages/projet-detail/projet-detail').then((m) => m.ProjetDetail) },
  { path: 'competences', title: t('Compétences'),
    loadComponent: () => import('./pages/competences/competences').then((m) => m.Competences) },
  { path: 'veille', title: t('Veille technologique'),
    loadComponent: () => import('./pages/veille/veille').then((m) => m.Veille) },
  { path: 'contact', title: t('Contact'),
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },

  // anciennes adresses → nouvelles pages
  { path: 'profil', redirectTo: 'parcours' },
  { path: 'stages', redirectTo: 'parcours' },
  { path: 'realisations', redirectTo: 'projets' },
  { path: 'synthese', redirectTo: 'competences' },
  { path: 'certifications', redirectTo: 'competences' },

  { path: '**', title: t('Page introuvable'),
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
