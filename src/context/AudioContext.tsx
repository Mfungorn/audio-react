import * as React from 'react';
import {createContext, useReducer} from 'react';
import {User} from "./AuthContext";

export type Author = {
    id: string,
    name: string,
    bio: string,
    logo: string,
    rating: number,
    // genres?: Array<Genre>,
    // albums?: Array<AlbumList>,
    // compositions?: Array<Track>
}
export type Album = {
    id: string,
    title: string,
    cover: string,
    rating: number,
    authors?: Array<Author>,
    // genres?: Array<Genre>,
    // compositions?: Array<Track>,
}
export type Track = {
    id: string,
    title: string,
    duration: number,
    text: string,
    cover: string,
    price: number
}
export type Genre = {
    id: string,
    name: string
}

export enum Action {
    'INIT_STATE',
    'REQUEST_AUTHORS',
    'REQUEST_ALBUMS',
    'REQUEST_TRACKS',
    'REQUEST_GENRES',
    'REQUEST_AUTHOR',
    'REQUEST_ALBUM',
    'REQUEST_TRACK',
    'REQUEST_GENRE',
    'REQUEST_PROFILE',
    'SEARCH',
}

type AudioContextState = {
    authors?: Array<Author>,
    albums?: Array<Album>,
    tracks?: Array<Track>,
    genres?: Array<Genre>
}
type PageState = {
    author?: Author,
    album?: Album,
    track?: Track,
}

type ProfileState = {
    profile: User
}

export type State = AudioContextState & PageState & ProfileState

interface AudioContextAction extends State {
    type: Action
}

export type AudioContext = {
    authors: Array<Author>,
    albums: Array<Album>,
    tracks: Array<Track>,
    genres: Array<Genre>,
    author: Author,
    album: Album,
    track: Track,
    profile: User
}

export const AudioContext = createContext(null);

const initialState: State = {
    authors: Array<Author>(),
    albums: Array<Album>(),
    tracks: Array<Track>(),
    genres: Array<Genre>(),
    author: null,
    album: null,
    track: null,
    profile: null
};

const reducer = (state: State, action: AudioContextAction) => {
    console.log(action);

    switch (action.type) {
        case Action.INIT_STATE:
            return {
                ...state,
                authors: action.authors,
                albums: action.albums,
                tracks: action.tracks,
                genres: action.genres,
                author: action.author,
                album: action.album,
                track: action.track,
            };
        case Action.REQUEST_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case Action.REQUEST_AUTHORS:
            return {
                ...state,
                authors: action.authors,
            };
        case Action.REQUEST_ALBUMS:
            return {
                ...state,
                albums: action.albums,
            };
        case Action.REQUEST_TRACKS:
            return {
                ...state,
                tracks: action.tracks,
            };
        case Action.REQUEST_GENRES:
            return {
                ...state,
                genres: action.genres,
            };
        case Action.REQUEST_AUTHOR:
            return {
                ...state,
                author: action.author,
            };
        case Action.REQUEST_ALBUM:
            return {
                ...state,
                album: action.album,
            };
        case Action.REQUEST_TRACK:
            return {
                ...state,
                track: action.track,
            };
        case Action.SEARCH:
            return {
                ...state
            };
        default:
            return state
    }
};

export const AudioContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Тут получишь данные из апи
    // const {loading, error, data} = useFetch(
    //     config.apiUrl,
    //     {data: []},
    //     [],
    // );
    // console.log('loading', loading);
    // console.log('error', error);
    // console.log('data', data);

    // useEffect(() => {
    //     dispatch({
    //         type: Action.INIT_STATE,
    //         authors: data.authors,
    //         albums: data.albums,
    //         tracks: data.tracks,
    //         genres: data.genres,
    //         author: initialState.author,
    //         album: initialState.album,
    //         track: initialState.track,
    //     })
    // }, [
    //     data
    // ]);

    return (
        <AudioContext.Provider
            value={{
                state,
                dispatch,
                // И тут прокинешь полученные из апи данные
                // request,
                // loading,
                // error
            }}
            {...props}
        />
    )
};
