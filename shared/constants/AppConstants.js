import keyMirror from 'react/lib/keyMirror';
export default  {
    ActionTypes: keyMirror({
        ADD_CHANNEL: null,
        CREATE_IDENTITY: null,
        IMPORT_CHANNELS: null,
        INIT_LIKES: null,
        LIKE: null,
        LOADING: null,
        LOAD_VIDEOS: null,
        LOAD_DETAIL: null,
        MARK_AS: null,
        OPEN_LINK: null,
        REFRESH: null,
        REMOVE_CHANNEL: null,
        SEARCH: null,
        SHOW_PAGE: null,
        TOGGLE_EDIT_MODE: null,
        TOGGLE_FULL_SCREEN: null,
        TOGGLE_SELECT_MODE: null
    }),
    ActionSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),
    ActionUrls: {
        CHANNEL: 'https://www.googleapis.com/youtube/v3/channels',
        VIDEO: 'https://www.googleapis.com/youtube/v3/videos',
        PLAYLIST: 'https://www.googleapis.com/youtube/v3/playlists',
        PLAYLIST_ITEMS: 'https://www.googleapis.com/youtube/v3/playlistItems',
        SEARCH: 'https://www.googleapis.com/youtube/v3/search',
        SUBSCRIPTIONS: 'https://www.googleapis.com/youtube/v3/subscriptions'
    },
    AuthObj: {
        client_id: '576249677252-d30dhhg3rr0vpbjmsfve152iis2n761m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        immediate: true,
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube'
    }
};