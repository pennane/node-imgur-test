import ImgurClient from 'imgur'
import { createReadStream } from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const IMGUR_CLIENT_SECRET = process.env.IMGUR_CLIENT_SECRET

if (!IMGUR_CLIENT_ID) throw new Error('IMGUR_CLIENT_ID not in .env')
if (!IMGUR_CLIENT_SECRET) throw new Error('IMGUR_CLIENT_SECRET not in .env')

const client = new ImgurClient({
  clientId: IMGUR_CLIENT_ID,
  clientSecret: IMGUR_CLIENT_SECRET,
})

const uploadImage = async (filePath: string) => {
  const response = await client.upload({
    image: createReadStream(filePath) as any,
    type: 'stream',
  })

  if (response.status !== 200 || typeof response?.data?.link !== 'string') {
    throw new Error('Upload failed ' + JSON.stringify(response))
  }

  return response.data.link
}

uploadImage('./src/testimgg.png')
  .then((link) => console.log('Image uploaded into: ' + link))
  .catch(console.error)
