import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage(
   {
      destination: function(req, file, cb) {
         const filePath = path.resolve(__dirname, "../../public/img/users")
         cb(null, filePath)
      },
      filename: function(req, file, cb) {
         const fileName = Date.now() + file.fieldname + path.extname(file.originalname)
         cb(null, fileName)
      }
   }
)

const upload = multer({ storage: storage })

export default upload