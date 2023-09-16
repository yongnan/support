import {
    intArg,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    enumType,
  } from 'nexus'
import { Context } from '../context'
import { Book } from './types/book'

export const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
  })
  
export const OrderByUpdatedAtInput = inputObjectType({
    name: 'OrderByUpdatedAtInput',
    definition(t) {
      t.nonNull.field('updatedAt', { type: SortOrder })
    },
  })
    
export const Query = objectType({
    name: 'Query',
    definition(t) {
  
      t.nonNull.list.nonNull.field('books', {
        type: Book,
        args: {
          searchString: stringArg(),
          skip: intArg(),
          take: intArg(),
          orderBy: arg({
            type: 'OrderByUpdatedAtInput',
          }),
        },
        resolve: (_parent, args, context: Context) => {
          const or = args.searchString
            ? {
                OR: [
                  { title: { contains: args.searchString } },
                  { content: { contains: args.searchString } },
                ],
              }
            : {}
  
          return context.prisma.book.findMany({
            where: {
              //published: true,
              ...or,
            },
            take: args.take || undefined,
            skip: args.skip || undefined,
            orderBy: args.orderBy || undefined,
          })
        },
      })

    },
  })
  
