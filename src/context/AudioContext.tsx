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

export enum Action {
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
    track: Track | null,
    authorId: string,
    albumId: string,
    trackId: string
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
    track: Track,
    authorId: string,
    albumId: string,
    trackId: string,
}

const audioContext: AudioContext = {
    authors: Array<Author>(),
    albums: Array<Album>(),
    tracks: Array<Track>(),
    genres: Array<Genre>(),
    author: null,
    album: null,
    track: null,
    authorId: '',
    albumId: '',
    trackId: ''
};

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
    authorId: '',
    albumId: '',
    trackId: ''
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
                authorId: action.authorId,
                albumId: action.albumId,
                trackId: action.trackId
            };
        case Action.GET_AUTHORS:
            return {
                ...state,
                authors: action.authors
            };
        default:
            return state
    }
};

export const AudioContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Тут получишь данные из апи
    // const { loading, error, data } = useFetch(
    //     `http://www.mocky.io/v2/5e4c5f243100005700d8bf35`,
    //     { data: [] },
    //     [],
    // )
    //
    // console.log('loading', loading)
    // console.log('error', error)
    // console.log('data', data)
    const {loading, error, data} = useFetch(
        `${process.env.CDN_PATH}/api/`,
        {data: []},
        [],
    );

    // useEffect(() => {
    //     dispatch({
    //         type: 'INIT_STATE',
    //         id: data.id,
    //         name: data.name,
    //         surname: data.surname,
    //     })
    // }, [
    //     data,
    // ])
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
            authorId: initialState.authorId,
            albumId: initialState.albumId,
            trackId: initialState.trackId
        })
    }, [data]);

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
