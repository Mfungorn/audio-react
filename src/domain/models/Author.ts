import {Genre} from "./Genre";
import {Album} from "./Album";
import {Track} from "./Track";

export type Author = {
    id: string,
    name: string,
    bio: string,
    logo: string,
    rating: number,
    genres?: Array<Genre>,
    albums?: Array<Album>,
    compositions?: Array<Track>
}
