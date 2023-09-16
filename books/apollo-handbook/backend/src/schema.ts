import {
  makeSchema,
  asNexusMethod,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import * as types from './graphql/types'
import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'


export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types: [
    types,
    queries,
    mutations,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
