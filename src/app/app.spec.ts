import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [App] }).compileComponents(); });
  it('creates the scrapbook', () => { const fixture = TestBed.createComponent(App); expect(fixture.componentInstance).toBeTruthy(); });
  it('renders the cover slide', async () => { const fixture = TestBed.createComponent(App); await fixture.whenStable(); const compiled = fixture.nativeElement as HTMLElement; expect(compiled.querySelector('h1')?.textContent).toContain('TJ Monterde'); });
  it('shows exactly one photo on the intro slide', async () => { const fixture = TestBed.createComponent(App); await fixture.whenStable(); const compiled = fixture.nativeElement as HTMLElement; expect(compiled.querySelectorAll('.photo-card')).toHaveLength(1); });
});
