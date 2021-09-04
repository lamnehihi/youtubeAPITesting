const express = require('express');
const { getChannelById, getPlaylistsByChannelId, getVideosByPlaylistId, saveVideoIds } = require('../controllers/youtube.controller');

const router = express.Router();

router.get('/channels/:id', getChannelById);
router.get('/channels/:id/playlists', getPlaylistsByChannelId);
router.get('/playlists/:id/videos', getVideosByPlaylistId);

router.post('/channels/:id/videos', saveVideoIds);

module.exports = router;