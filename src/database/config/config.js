// Read and upload .env file
import customEnv from 'custom-env'
customEnv.env(process.env.NODE_ENV)

const dialectOptions = process.env.NODE_ENV === 'prod' ? {"ssl": {ca: process.env.DB_SSL_CA}} : {}

export default {
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_DATABASE,
   "host": process.env.DB_HOST,
   "dialect": process.env.DB_DIALECT,
   "dialectOptions": dialectOptions
}