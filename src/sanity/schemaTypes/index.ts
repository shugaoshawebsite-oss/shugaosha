import { type SchemaTypeDefinition } from 'sanity'

import { localeStringType } from './localeStringType'
import { localeTextType } from './localeTextType'
import { serviceType } from './serviceType'
import { celebrityType } from './celebrityType'
import { caseStudyType } from './caseStudyType'
import { clientReviewType } from './clientReviewType'
import { teamMemberType } from './teamMemberType'
import { tourScheduleType } from './tourScheduleType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeStringType,
    localeTextType,
    serviceType,
    celebrityType,
    caseStudyType,
    clientReviewType,
    teamMemberType,
    tourScheduleType,
  ],
}
