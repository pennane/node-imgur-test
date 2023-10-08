import ImgurClient from 'imgur'
import dotenv from 'dotenv'
import { createReadStream } from 'fs'
dotenv.config()

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const IMGUR_CLIENT_SECRET = process.env.IMGUR_CLIENT_SECRET

if (!IMGUR_CLIENT_ID) {
  throw new Error('IMGUR_CLIENT_ID is not set in .env')
}
if (!IMGUR_CLIENT_SECRET) {
  throw new Error('IMGUR_CLIENT_SECRET is not set in .env')
}

const client = new ImgurClient({
  clientId: IMGUR_CLIENT_ID,
  clientSecret: IMGUR_CLIENT_SECRET,
})

const uploadImage = async (filePath: string) => {
  const response = await client.upload({
    image: createReadStream(filePath) as any,
    type: 'stream',
  })
  if (response.data.link) {
    return response.data.link
  }
  throw new Error('Invalid response from Imgur')
}

uploadImage('./src/testimg.png')
  .then((link) => console.log('Image uploaded at: ' + link))
  .catch((err) => console.log('Upload failed: ' + err.message))
