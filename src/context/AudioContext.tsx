import * as React from 'react';
import {useEffect, useReducer} from 'react';

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

enum Action {
    'INIT_STATE',
    'GET_AUTHORS', 'GET_ALBUMS', 'GET_TRACKS', 'GET_GENRES',
    'GET_AUTHOR', 'GET_ALBUM', 'GET_TRACK', 'GET_GENRE',
    'SEARCH'
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
    track: Track | null
}
export type State = AudioContextState & PageState

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
    track: Track
}

const audioContext: AudioContext = {
    authors: Array<Author>(),
    albums: Array<Album>(),
    tracks: Array<Track>(),
    genres: Array<Genre>(),
    author: null,
    album: null,
    track: null
};

const initialState: State = {
    authors: Array<Author>(),
    albums: Array<Album>(),
    tracks: Array<Track>(),
    genres: Array<Genre>(),
    author: null,
    album: null,
    track: null
};

const reducer = (state: State, action: AudioContextAction) => {
    switch (action.type) {
        case Action.GET_AUTHORS: return {
            ...state,
            authors: action.authors
        };
        case Action.GET_AUTHOR: return {
            ...state,
            author: action.author
        }
    }
};

export const AudioContext = React.createContext<AudioContext>(audioContext);
export const AudioContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: Action.INIT_STATE,
            authors: Array<Author>(),
            albums: Array<Album>(),
            tracks: Array<Track>(),
            genres: Array<Genre>(),
            author: null,
            album: null,
            track: null
        })
    })
};