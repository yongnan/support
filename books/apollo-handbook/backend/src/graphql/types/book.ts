import {
    objectType,
  } from 'nexus'
  import { Context } from '../../context'

  export const Book = objectType({
    name: 'Book',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.nonNull.field('updatedAt', { type: 'DateTime' })
      t.nonNull.string('title')
      t.string('content')
      t.nonNull.boolean('published')
      t.nonNull.int('viewCount')
    },
  })
  