import {Track} from "./Track";

export type Profile = {
    name: String,
    email: String,
    phone?: String,
    balance: Number,
    favoriteCompositions: Track[]
}
