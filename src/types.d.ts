declare module '*.md' {
  import type { SvelteComponent } from 'svelte';

  export default class Comp extends SvelteComponent {
    $$prop_def: { class?: string };
  }

  export const metadata: Record<string, unknown>;
}
