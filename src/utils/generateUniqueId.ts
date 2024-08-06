import { Url } from '../model/url'
import shortid from 'shortid';

const generateUniqueId = async () => {
    let urlId = shortid.generate()
    while (true) {
        const urlObject = await Url.findOne({ shortUrlId: urlId })
        if (!urlObject) break;
        urlId = shortid.generate()
    }
    return urlId
}

export default generateUniqueId