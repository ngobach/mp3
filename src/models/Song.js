import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    title: String,
    artist: String,
    thumbnail: String,
    source: String,
});

const Song = mongoose.model('Song', schema);

export default Song;
