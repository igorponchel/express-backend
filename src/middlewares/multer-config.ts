import { Request } from 'express'
import multer from 'multer'
import path from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const MIME_TYPES = new Map<string, string>([
  ['image/jpg', 'jpg'],
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
])

const storage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
    callback(null, path.resolve(__dirname, '..', '..', 'uploads'))
  },

  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES.get(file.mimetype)

    callback(null, name + Date.now() + '.' + extension)
  },
})

export const MulterHandler = multer({ storage }).single('image')
