import multer from 'multer'
import path from 'path'

import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default function uploadResolver(storagePath) {
   
   const storage = multer.diskStorage(
      {
         destination: function(req, file, cb) {
            const filePath = path.resolve(__dirname, '../../public/img', storagePath)
            cb(null, filePath)
         },
         filename: function(req, file, cb) {
            const fileName = Date.now() + file.fieldname + path.extname(file.originalname)
            cb(null, fileName)
         }
      }
   )

   return multer({ storage: storage })

}