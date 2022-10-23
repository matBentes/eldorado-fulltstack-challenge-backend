import { Request, Response } from 'express'
import { prisma } from '../server'
import { genereateIsbn } from '../utils'

class Book {
  async listAll (req: Request, res: Response): Promise<Response> {
    try {
      const books = await prisma.book.findMany()
      return res.json(books).status(200)
    } catch (e) {
      return res.status(500)
    }
  }

  async insert (req: Request, res: Response): Promise<Response> {
    const isbn = genereateIsbn()
    try {
      const {
        name,
        author,
        copies,
        pages
      } = req.body

      const newBook = await prisma.book.create({
        data: {
          isbn,
          name,
          author,
          copies,
          pages
        }
      })
      return res.status(201).json(newBook)
    } catch (error) {
      return res.status(404)
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { isbn } = req.params

      await prisma.book.delete({
        where: {
          isbn
        }
      })

      return res.status(204).json()
    } catch (e) {
      return res.status(500)
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    try {
      const { isbn } = req.params
      const {
        name,
        author,
        copies,
        pages
      } = req.body

      await prisma.book.update({
        where: { isbn },
        data: {
          name,
          author,
          copies,
          pages
        }
      })

      return res.status(204).json()
    } catch (e) {
      return res.status(500)
    }
  }
}

export default new Book()
