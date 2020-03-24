import {Author} from "./Author";

export type Album = {
    id: string,
    title: string,
    cover: string,
    rating: number,
    authors?: Array<Author>,
    // genres?: Array<Genre>,
    // compositions?: Array<Track>,
}
