import { it, expect } from 'vitest';
import { matchesExtension } from './matches-extension.js';

it('matches default extensions', () => {
  expect(matchesExtension('example.md')).toBe(true);
});

it('matches custom extensions', () => {
  expect(matchesExtension('example.markdown', '.markdown')).toBe(true);
  expect(matchesExtension('example.markdown', ['.md', '.markdown'])).toBe(true);
});

it('does not match other extensions', () => {
  expect(matchesExtension('example.markdown', '.md')).toBe(false);
  expect(matchesExtension('example.markdown', ['.md'])).toBe(false);
});
