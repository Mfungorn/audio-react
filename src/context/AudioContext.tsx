import * as React from 'react';
import {createContext, useEffect, useReducer} from 'react';
import useFetch from 'use-http'

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

export const AudioContext = createContext(null);

const initialState = {
    id: null,
    name: '',
    surname: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_STATE':
            return {
                ...state,
                data: action.data,
            }
        case 'GET_AUTHORS':
            return {
                ...state,
                data: action.data,
            }
        case 'GET_AUTHOR':
            return {
                ...state,
                data: action.data,
            }
        default:
            return state
    }
};

export const AudioContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Тут получишь данные из апи
    const { loading, error, data } = useFetch(
        `http://www.mocky.io/v2/5e4c5f243100005700d8bf35`,
        { data: [] },
        [],
    )

    console.log('loading', loading)
    console.log('error', error)
    console.log('data', data)

    useEffect(() => {
        dispatch({
            type: 'INIT_STATE',
            id: data.id,
            name: data.name,
            surname: data.surname,
        })
    }, [
        data,
    ])

    return (
        <AudioContext.Provider
            value={{
                state,
                dispatch,
                loading,
                error,
                data,
            }}
            {...props}
        />
    )
};
