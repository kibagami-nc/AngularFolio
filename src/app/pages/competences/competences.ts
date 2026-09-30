import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { CERTIFICATIONS, COMPETENCES_CLES, PROJETS } from '../../data/portfolio';
import { BLOCS, BlocId, COMPETENCES } from '../../data/referentiel';
import { coverageByBloc, coverageByCompetence, coveredCount } from '../../data/stats';
import { AnimDirective } from '../../shared/anim.directive';
import { PageHero } from '../../shared/page-hero';
import { RadarChart, RadarPoint } from '../../shared/radar-chart';

@Component({
  selector: 'app-competences',
  imports: [PageHero, NgIcon, RouterLink, AnimDirective, RadarChart],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './competences.html',
  styleUrl: './competences.scss',
})
export class Competences {
  protected readonly cles = COMPETENCES_CLES;
  protected readonly blocs = BLOCS;
  protected readonly byBloc = coverageByBloc();
  protected readonly competences = COMPETENCES;
  protected readonly projets = PROJETS;
  protected readonly certifs = CERTIFICATIONS;
  protected readonly covered = coveredCount();
  protected readonly coverage = coverageByCompetence();

  protected readonly bloc = signal<BlocId>(1);
  protected readonly openId = signal<string | null>('b1-patrimoine');
  protected readonly current = computed(() => this.coverage.filter((c) => c.competence.bloc === this.bloc()));
  protected readonly hover = signal<{ r: number; c: number } | null>(null);

  protected readonly radar: RadarPoint[] = (() => {
    const max = Math.max(...this.coverage.map((c) => c.projets.length));
    return this.coverage.map((c) => ({
      label: c.competence.code,
      value: 25 + (c.projets.length / max) * 75,
      color: `--bloc-${c.competence.bloc}`,
    }));
  })();

  protected selectBloc(id: BlocId) {
    this.bloc.set(id);
    this.openId.set(this.coverage.find((c) => c.competence.bloc === id)?.competence.id ?? null);
  }

  protected toggle(id: string) {
    this.openId.update((cur) => (cur === id ? null : id));
  }

  protected countBloc(id: number) {
    return COMPETENCES.filter((c) => c.bloc === id).length;
  }
}
