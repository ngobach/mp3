import { Album } from './site-config';
export interface Song {
    name: string;
    artist: string;
    cover: string;
    source: string;
    zmp3Id?: string;
    albums?: Album[];
}
