import { describe, expect, it } from 'vitest';
import { rawContent, validateContent } from '../../src/utils/content.js';
import { contentSchema } from '../../src/utils/content-schema.js';

describe('content dataset', () => {
  it('matches the schema definition', () => {
    expect(() => contentSchema.parse(rawContent)).not.toThrow();
  });

  it('provides parsed content with unique identifiers', () => {
    const content = validateContent();
    const memberIds = content.team.members.map((member) => member.id);
    expect(new Set(memberIds).size).toBe(memberIds.length);

    const showcaseIds = content.team.showcase.map((item) => item.id);
    expect(new Set(showcaseIds).size).toBe(showcaseIds.length);
  });

  it('includes at least one scheduled block per active module', () => {
    const content = validateContent();
    const modulesWithBlocks = content.modules.filter((module) => module.blocks.length > 0);
    expect(modulesWithBlocks.length).toBeGreaterThan(0);
    modulesWithBlocks.forEach((module) => {
      module.blocks.forEach((block) => {
        expect(block.title.length).toBeGreaterThan(0);
      });
    });
  });
});
