import {
    intArg,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
  } from 'nexus'
  import { Context } from '../context'
  import { Book } from './types/book'
  
  export const BookCreateInput = inputObjectType({
    name: 'BookCreateInput',
    definition(t) {
      t.nonNull.string('title')
      t.string('content')
    },
  })
    
  export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
  
      t.field('createBook', {
        type: Book,
        args: {
          data: nonNull(
            arg({
              type: 'BookCreateInput',
            }),
          ),
          authorEmail: stringArg() || undefined,
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.book.create({
            data: {
              title: args.data.title,
              content: args.data.content,
            },
          })
        },
      })
  
      t.field('deleteBook', {
        type: Book,
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.book.delete({
            where: { id: args.id },
          })
        },
      })
  
    },
  })
  