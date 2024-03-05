// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { RequestType, SearchSliceType, YoutubeResponse } from "../types";

const glueResults = (videos: YoutubeResponse, channels: YoutubeResponse, search: YoutubeResponse) => {
    return {
        pageInfo: search.pageInfo,
        nextPageToken: search.nextPageToken,
        items: videos.items.map((video) => ({
            ...video, channel: channels.items.find(({ id }) => id === video.snippet.channelId)?.snippet
        }))
    }
}

const getVideos = async (requestParametrs: RequestType) => {

    const { maxResults = 12, order, query, pageToken } = requestParametrs

    const request = `search?type=video${query ? '&q=' + query : ''}&maxResults=${maxResults}${order ? "&order=" + order : ''}${pageToken ? '&pageToken=' + pageToken : ''}`;
    const search = await api.get<Promise<YoutubeResponse>, YoutubeResponse>(request);

    const videoIds = search.items.map((item) => item.id.videoId).join(',')
    const videos = await api.get<Promise<YoutubeResponse>, YoutubeResponse>(`videos?id=${videoIds}&part=statistics,contentDetails,snippet`) //&${maxResults}

    const channelIds = videos.items.map(item => item.snippet.channelId)
    const channels = await api.get<Promise<YoutubeResponse>, YoutubeResponse>(`channels?id=${channelIds}&part=snippet`) //&${maxResults}
    
    return glueResults(videos, channels, search);
}

export const searchThunk = createAsyncThunk('search',
    async (query: RequestType) => {
        return await getVideos(query);
    }
)

export const nextPageThunk = createAsyncThunk('search/next page',
    async (query: RequestType) => {
        return await getVideos(query);
    }
)

const initialState: SearchSliceType = {
    isLoading: false,
    error: '',
    data: {
        items: [],
        nextPageToken: '',
        pageInfo: {}
    },
    lastSearch: { query: '' }
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        lastSearch: (state, action) => {
            state.lastSearch = action.payload;
        },
        resetSearch: () => initialState
    },
    extraReducers: (builder) => builder
        .addCase(searchThunk.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(searchThunk.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        })
        .addCase(searchThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(nextPageThunk.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(nextPageThunk.fulfilled, (state, action) => {
            state.data.items = state.data.items.concat(action.payload.items);
            state.data.nextPageToken = action.payload.nextPageToken;
            state.isLoading = false;
        })
        .addCase(nextPageThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    ,
    selectors: {
        selectVideos: createSelector(
            [(state) => state.data.items],
            (data) => data
        ),
        selectPageInfo: createSelector(
            [(state) => state.data.searchPageInfo],
            (data) => data
        ),
    }
})

export const { lastSearch, resetSearch } = searchSlice.actions;
export const { selectVideos, selectPageInfo } = searchSlice.selectors;
export const searchReducer = searchSlice.reducer;

