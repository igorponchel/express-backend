import { Request, RequestHandler, Response } from 'express'
import { Thing } from '~/types/thing'
import * as fs from 'fs'

export class StuffController {
  createThing(req: Request, res: Response, next: RequestHandler) {
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id
    delete thingObject._userId
    const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`,
    })
    thing
      .save()
      .then(() => res.status(201).json({ message: 'Message enregistré.' }))
      .catch((error) => res.status(400).json({ error }))
  }

  modifyThing(req: Request, res: Response, next: RequestHandler) {
    const thingObject = req.file
      ? {
          ...JSON.parse(req.body.thing),
          imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
        }
      : { ...req.body }

    delete thingObject._userId
    Thing.findOne({ _id: req.params.id })
      .then((thing) => {
        if (thing!.userId != req.auth.userId) {
          res.status(401).json({ message: 'Not authorized' })
        } else {
          Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié!' }))
            .catch((error) => res.status(401).json({ error }))
        }
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  }

  deleteThing(req: Request, res: Response, next: RequestHandler) {
    Thing.findOne({ _id: req.params.id })
      .then((thing) => {
        if (thing!.userId != req.auth.userId) {
          res.status(401).json({ message: 'Not authorized' })
        } else {
          const filename = thing!.imageUrl.split('/uploads/')[1]
          fs.unlink(`images/${filename}`, () => {
            Thing.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: 'Objet supprimé !' })
              })
              .catch((error) => res.status(401).json({ error }))
          })
        }
      })
      .catch((error) => {
        res.status(500).json({ error })
      })
  }

  findAll = (req: Request, res: Response, next: RequestHandler) => {
    return Thing.find()
      .then((things) => {
        res.status(200).json(things)
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        })
      })
  }

  findOne(req: Request, res: Response, next: RequestHandler) {
    return Thing.findOne({
      _id: req.params.id,
    })
      .then((thing) => {
        res.status(200).json(thing)
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        })
      })
  }
}
