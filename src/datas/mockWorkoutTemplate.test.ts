import { describe, it, expect } from 'vitest';
import { mockWorkoutTemplates } from './mockWorkoutTemplate';

describe('mockWorkoutTemplates', () => {
  it('contient exactement 4 templates', () => {
    expect(mockWorkoutTemplates).toHaveLength(4);
  });

  it('chaque template a un warmup, des skills et un wod non vides', () => {
    mockWorkoutTemplates.forEach((template) => {
      expect(template.warmup.length).toBeGreaterThan(0);
      expect(template.skills.length).toBeGreaterThan(0);
      expect(template.wod.length).toBeGreaterThan(0);
    });
  });

  it('contient les 4 types attendus', () => {
    const types = mockWorkoutTemplates.map((t) => t.type);
    expect(types).toContain('lowerBody');
    expect(types).toContain('upperBody');
    expect(types).toContain('fullBody');
    expect(types).toContain('cardio');
  });
});
