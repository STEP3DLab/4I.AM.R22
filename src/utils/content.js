import benefitsData from '../data/benefits.json' with { type: 'json' };
import audienceData from '../data/audience.json' with { type: 'json' };
import teamData from '../data/team.json' with { type: 'json' };
import modulesData from '../data/modules.json' with { type: 'json' };
import leadData from '../data/lead.json' with { type: 'json' };
import applyLocationsData from '../data/apply-locations.json' with { type: 'json' };
import helpfulLinksData from '../data/helpful-links.json' with { type: 'json' };
import { contentSchema } from './content-schema.js';

export const rawContent = {
  benefits: benefitsData,
  audience: audienceData,
  team: teamData,
  modules: modulesData,
  lead: leadData,
  applyLocations: applyLocationsData,
  helpfulLinks: helpfulLinksData,
};

export function validateContent() {
  return contentSchema.parse(rawContent);
}

const content = validateContent();

export const benefits = content.benefits;
export const audience = content.audience;
export const teamMembers = content.team.members;
export const teamShowcase = content.team.showcase;
export const modules = content.modules;
export const lead = content.lead;
export const applyLocations = content.applyLocations;
export const helpfulLinks = content.helpfulLinks;
