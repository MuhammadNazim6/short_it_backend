import { Url } from '../model/url'
import validateUrl from '../utils/validateUrl'
import generateUniqueId from '../utils/generateUniqueId'
import { Request, Response } from 'express';

export const createShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;
  const clientUrl = process.env.BASE_URL;

  // checking if the url is valid or not
  if (!validateUrl(url)) {
    res.status(400).json({ message: 'Invalid URL entered' })
    return
  }
  try {
    // checking if original url is already present
    const urlExist = await Url.findOne({ url })
    if (urlExist) {
      const shortUrl = `${clientUrl}/${urlExist.shortUrlId}`
      res.status(200).json({ shortUrl, clicks: urlExist.clicks, message:'Url is already present' })
      return
    }

    // creating short url using nanoid
    const shortUrlId = await generateUniqueId()
    await Url.create({
      url,
      shortUrlId
    })
    const shortUrl = `${clientUrl}/${shortUrlId}`
    res.status(200).json({ shortUrl, clicks: 0, message:'Succesfully generated short url' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}


export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  const { shortUrlId } = req.params
  
  try {
    const urlExist = await Url.findOne({ shortUrlId })
    // checking if short url is present
    if (urlExist === null) {
      res.status(404).json({ message: 'No Url found' })
      return
    }

    // $inc increase the clicks by 1
    await Url.findByIdAndUpdate(urlExist._id, { $inc: { "clicks": 1 } })
    // redirect to the original url
    return res.status(200).redirect(urlExist.url)
    // return res.status(200).json({ message: urlExist.url })
  }
  catch (err) {
    console.log(err)
    res.status(500).json('Server Error')
  }
}

// export const deleteUrl = async (req, res) => {
//   const { url } = req.body
//   console.log(url)
//   try {
//       const deletedUrl = await Url.deleteOne({url})
//       if(deletedUrl.deletedCount == 0) {
//           res.status(400).json({message: 'No such url found'})
//           return
//       }
//       res.status(200).json({message: `Url ${url} deleted`})
//   }
//   catch(err) {
//       console.log(err)
//       res.status(500).json({message: 'Server Error'})
//   }
// }