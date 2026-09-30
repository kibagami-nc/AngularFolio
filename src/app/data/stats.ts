import { BLOCS, COMPETENCES } from './referentiel';
import { PROJETS } from './portfolio';

export const coverageByCompetence = () =>
  COMPETENCES.map((c) => ({ competence: c, projets: PROJETS.filter((p) => p.competences.includes(c.id)) }));

export const coveredCount = () => coverageByCompetence().filter((c) => c.projets.length > 0).length;

export const coverageByBloc = () =>
  BLOCS.map((b) => {
    const comps = coverageByCompetence().filter((c) => c.competence.bloc === b.id);
    return { bloc: b, total: comps.length, covered: comps.filter((c) => c.projets.length).length };
  });
