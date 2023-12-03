import mongoose from 'mongoose';
import shortid from 'shortid';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    unique: true,
    required: true,
    default: shortid.generate,
  },
});


const UrlModel = mongoose.model('Url', urlSchema);

export default UrlModel;
