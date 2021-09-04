const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.YOUTUBE_API_BASE_URL,
});

module.exports.getChannelById = async (req, res) => {
    try {
        const channelData = await instance.get('/channels', {
            params: {
                part: "snippet,contentDetails,statistics",
                id: req.params.id,
                key: process.env.API_KEY
            },
        })
        // console.log(channelData.data);
        return res.status(400).json({ ok: true, data: channelData.data.items[0]})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, message: "Can find any channel by ID!" })
    }
}

module.exports.getPlaylistsByChannelId = async (req, res) => {
    try {
        // console.log(req.query);
        const channelPlaylistsData = await instance.get('/playlists', {
            params: {
                part: "snippet,contentDetails",
                channelId: req.params.id,
                key: process.env.API_KEY,
                pageToken: req.query.pageToken,
                maxResults: req.query.maxResults,
            },
        })
        // console.log(channelPlaylistsData.data);
        return res.status(400).json(
            {
                ok: true,
                count: channelPlaylistsData.data.pageInfo.totalResults,
                pagination: {
                    nextPageToken: channelPlaylistsData.data.nextPageToken,
                    prevPageToken: channelPlaylistsData.data.prevPageToken,
                    maxResults: req.query.maxResults
                },
                data: channelPlaylistsData.data.items
            }
        )
    } catch (error) {
        // console.log(error.response.data.error.message);
        return res.status(400).json({ ok: false, message: error.response.data.error.message })
    }
}

module.exports.getVideosByPlaylistId = async (req, res) => {
    try {
        const playlistVideo = await instance.get('/playlistItems', {
            params: {
                part: "contentDetails",
                playlistId: req.params.id,
                key: process.env.API_KEY,
                pageToken: req.query.pageToken,
                maxResults: req.query.maxResults,
            },
        })
        // console.log(playlistVideo.data);
        return res.status(400).json(
            {
                ok: true,
                count: playlistVideo.data.pageInfo.totalResults,
                pagination: {
                    nextPageToken: playlistVideo.data.nextPageToken,
                    prevPageToken: playlistVideo.data.prevPageToken,
                    maxResults: req.query.maxResults
                },
                data: playlistVideo.data.items.map(item => {
                    return {
                        ...item,
                        embedLink: `https://www.youtube.com/embed/${item.contentDetails.videoId}`
                    }
                })
            }
        )
    } catch (error) {
        // console.log(error.response.data.error.message);
        return res.status(400).json({ ok: false, message: error.response.data.error.message })
    }
}

module.exports.saveVideoIds = async (req, res) => {
    try {
        const videoIds = req.body.videoIds;
        const channelData = await instance.get('/channels', {
            params: {
                part: "snippet",
                id: req.params.id,
                key: process.env.API_KEY
            },
        })
        console.log(channelData.data.pageInfo.totalResults);
        if (channelData.data.pageInfo.totalResults === 0) {
            console.log("throw");
            throw new Error('Channel does not exist');
        }
        // console.log(playlistVideo.data);
        return res.status(400).json(
            {
                ok: true,
                message: `Channel ${channelData?.data.items[0].snippet.title} was save ${videoIds.length} videos to system`
            }
        )
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ ok: false, message: error.response?.data.error.message || error.message })
    }
}