export type UserType = {
    user: string,
    token: string,
    isAuth: boolean
}

type OrderType = 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'

export type FavoritesType = {
    id: string,
    title: string,
    query: string,
    order: OrderType,
    maxResults: number
}

export type AddChangeFavorite = {
    user: string,
    favorite: FavoritesType
}

export type AuthPageUserType = {
    email: string,
    password: string
}

export type RequestType = {
    maxResults?: number,
    query: string,
    order?: string,
    pageToken?: string
}

export type ResponseIdType = {
    "kind": string,
    "videoId": string,
    "channelId": string,
    "playlistId": string
}




export type Item = {
    "kind": "youtube#video",
    "etag": string,
    "id": string | ResponseIdType,
    "snippet": {
        "publishedAt": string,
        "channelId": string,
        "title": string,
        "description": string,
        thumbnails: {
            [key: string]: {
                url: string,
                width: number,
                height: number
            }
        },
        "channelTitle": string,
        "tags": string[],
        "categoryId": string,
        "liveBroadcastContent": string,
        "defaultLanguage": string,
        "localized": {
            "title": string,
            "description": string
        },
        "defaultAudioLanguage": string
    },
    "contentDetails": {
        "duration": string,
        "dimension": string,
        "definition": string,
        "caption": string,
        "licensedContent": boolean,
        "regionRestriction": {
            "allowed": string[],
            "blocked": string[]
        },
        "contentRating": {
            [key: string]: string | string[]
        },
        "projection": string,
        "hasCustomThumbnail": boolean
    },
    "status": {
        [key: string]: string | Date | boolean
    },
    "statistics": {
        [key: string]: string
    },
    channel?: {
        [key: string]: string | object,
        thumbnails: {
            [key: string]: {
                url: string,
                width: number,
                height: number
            }
        },
    }
}

export type YoutubeResponse = {
    items: Item[],
    pageInfo: {
        [key: string]: string
    },
    nextPageToken: string
}


export type SearchSliceType = {
    isLoading: boolean,
    error: string | undefined,
    data: YoutubeResponse,
    lastSearch: RequestType
}

type CardData = {
    watch: string, 
    channelLink: string, 
    videoDuration: string, 
    publishedAt: string

}

export type CardItem = Item & CardData


export type ModalHandler = (content: React.ReactNode, onOk: () => void) => void