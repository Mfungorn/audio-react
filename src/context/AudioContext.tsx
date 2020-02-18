import * as React from 'react';
import {useContext, useReducer} from "react";
import {State} from "./AudioReducer";

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
    'GET_AUTHORS', 'GET_ALBUMS', 'GET_TRACKS', 'GET_GENRES',
    'GET_AUTHOR', 'GET_ALBUM', 'GET_TRACK', 'GET_GENRE',
    'SEARCH'
}
type AudioContextAction = {
    type: Action,
    payload: any
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

export type AudioContext = {
    authors: Array<Author>,
    albums: Array<Album>,
    tracks: Array<Track>,
    genres: Array<Genre>
}

const audioContext: AudioContext = {
    authors: Array<Author>(),
    albums: Array<Album>(),
    tracks: Array<Track>(),
    genres: Array<Genre>()
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
            authors: action.payload
        };
        case Action.GET_AUTHOR: return {
            ...state,
            author: action.payload
        }
    }
};

export const AudioContext = React.createContext<AudioContext>(audioContext);
export const AudioContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
};