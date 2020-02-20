import * as React from 'react';
import {createContext, useEffect, useReducer} from 'react';
import useFetch from 'use-http'
import config from "../config/config";

export type Author = {
    id: string,
    name: string
}
export type Album = {
    id: string,
    title: string
}
export type Track = {
    id: string,
    title: string,
    price: number
}
export type Genre = {
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
    'SEARCH',
    'ERROR',
    'LOADING'
}

type AudioContextState = {
    authors: Array<Author> | null,
    albums: Array<Album> | null,
    tracks: Array<Track> | null,
    genres: Array<Genre> | null
}
type PageState = {
    author: Author | null,
    album: Album | null,
    track: Track | null,
}
type RequestState = {
    error: any,
    loading: boolean
}

export type State = AudioContextState & PageState & RequestState

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
}

export const AudioContext = createContext(null);

// const initialState = {
//     id: null,
//     name: '',
//     surname: '',
// };
const initialState: State = {
    authors: Array<Author>(),
    albums: Array<Album>(),
    tracks: Array<Track>(),
    genres: Array<Genre>(),
    author: null,
    album: null,
    track: null,
    error: null,
    loading: false
};

const reducer = (state: State, action: AudioContextAction) => {
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
        case Action.REQUEST_AUTHORS:
            return {
                ...state,
                authors: action.authors,
                loading: false
            };
        case Action.REQUEST_ALBUMS:
            return {
                ...state,
                albums: action.albums,
                loading: false
            };
        case Action.REQUEST_TRACKS:
            return {
                ...state,
                tracks: action.tracks,
                loading: false
            };
        case Action.REQUEST_GENRES:
            return {
                ...state,
                genres: action.genres,
                loading: false
            };
        case Action.REQUEST_AUTHOR:
            return {
                ...state,
                author: action.author,
                loading: false
            };
        case Action.REQUEST_ALBUM:
            return {
                ...state,
                album: action.album,
                loading: false
            };
        case Action.REQUEST_TRACK:
            return {
                ...state,
                track: action.track,
                loading: false
            };
        case Action.SEARCH:
            return {
                ...state
            };
        case Action.LOADING:
            return {
                ...state,
                loading: true
            };
        case Action.ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state
    }
};

export const AudioContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Тут получишь данные из апи
    const {loading, error, data} = useFetch(
        config.apiUrl,
        {data: []},
        [],
    );

    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);

    useEffect(() => {
        dispatch({
            type: Action.INIT_STATE,
            authors: data.authors,
            albums: data.albums,
            tracks: data.tracks,
            genres: data.genres,
            author: initialState.author,
            album: initialState.album,
            track: initialState.track,
            error: null,
            loading: false
        })
    }, [
        data
    ]);

    return (
        <AudioContext.Provider
            value={{
                state,
                dispatch,
                // И тут прокинешь полученные из апи данные
                data,
                error,
                loading,
            }}
            {...props}
        />
    )
};
