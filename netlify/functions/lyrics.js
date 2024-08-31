const axios = require("axios");

export default async (event) => {
  const { trackTitle, trackArtist } = event.queryStringParameters;

  const MUSIXMATCH_API_KEY = import.meta.env.VITE_MUSIXMATCH_API_KEY;

  if (!MUSIXMATCH_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No Musixmatch API key provided." }),
    };
  }

  try {
    // Step 1: Search for the track to get the song ID
    const searchResponse = await axios.get(
      `https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&q_artist=${trackArtist}&apikey=${MUSIXMATCH_API_KEY}`
    );

    const trackList = searchResponse.data.message.body.track_list;

    if (!trackList || trackList.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No matching track found." }),
      };
    }

    // Extracting the track ID from the first result
    const trackId = trackList[0].track.track_id;

    // Step 2: Use the track ID to get the lyrics
    const lyricsResponse = await axios.get(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${MUSIXMATCH_API_KEY}`
    );

    const lyrics = lyricsResponse.data.message.body.lyrics.lyrics_body;

    return {
      statusCode: 200,
      body: lyrics ? JSON.stringify({ lyrics }) : "lyrics not found",
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: "API rate limit reached or invalid key.",
        }),
      };
    } else {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error fetching lyrics." }),
      };
    }
  }
};
