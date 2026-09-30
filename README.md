# Portfolio de Raphaël Billot — BTS SIO option SISR (Angular)

Portfolio multi-pages au style « journal de bord » marin, pensé pour les épreuves du BTS SIO SISR.

## Lancer le projet

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de production dans dist/
```

## Personnaliser

| Fichier | Contenu |
| --- | --- |
| `src/app/data/portfolio.ts` | Profil, formation, expériences, projets, compétences clés, certifications, veille |
| `src/app/data/referentiel.ts` | Référentiel officiel BTS SIO SISR (blocs 1, 2, 3 et critères) |
| `src/app/data/pages.ts` | Pages du menu, pavillon associé et résumé affiché sur l'accueil |
| `public/profil.jpg`, `public/raphael_billot_cv.jpg` | Photo et CV |

Pour rattacher un projet à une compétence, ajoute son identifiant (`b1-patrimoine`, `b2-concevoir`, `b3-infra`…)
dans le tableau `competences` du projet : le tableau de synthèse, le radar et les compteurs se recalculent.

## Pages

Accueil · Parcours · Projets (+ fiche détaillée) · Compétences (référentiel, synthèse, certifications) · Veille · Contact · 404

## Stack & animations

- Angular 22 (composants autonomes, signals, lazy loading, View Transitions)
- **GSAP** : ScrollTrigger (projets épinglés en défilement horizontal, parallaxe), SplitText (titres),
  DrawSVG (ligne de route du parcours, isobathes), ScrambleText (coordonnées), Flip (filtres des projets)
- **Lenis** : défilement fluide
- **Canvas 2D** : sonar de navigation (accueil), radar de couverture du référentiel
- Pavillons du Code international des signaux en SVG, bandeau défilant réactif au scroll, boutons magnétiques
- Respect de `prefers-reduced-motion`
