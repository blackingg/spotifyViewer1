
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// netlify/functions/lyrics.js
var axios = __require("axios");
var lyrics_default = async (event) => {
  const { trackTitle, trackArtist } = event.queryStringParameters;
  const MUSIXMATCH_API_KEY = import.meta.env.VITE_MUSIXMATCH_API_KEY;
  if (!MUSIXMATCH_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No Musixmatch API key provided." })
    };
  }
  try {
    const searchResponse = await axios.get(
      `https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&q_artist=${trackArtist}&apikey=${MUSIXMATCH_API_KEY}`
    );
    const trackList = searchResponse.data.message.body.track_list;
    if (!trackList || trackList.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No matching track found." })
      };
    }
    const trackId = trackList[0].track.track_id;
    const lyricsResponse = await axios.get(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${MUSIXMATCH_API_KEY}`
    );
    const lyrics = lyricsResponse.data.message.body.lyrics.lyrics_body;
    return {
      statusCode: 200,
      body: JSON.stringify({
        lyrics: lyrics || "Lyrics not found"
      })
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: "API rate limit reached or invalid key."
        })
      };
    } else {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error fetching lyrics." })
      };
    }
  }
};
export {
  lyrics_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvbHlyaWNzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IHsgdHJhY2tUaXRsZSwgdHJhY2tBcnRpc3QgfSA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycztcclxuXHJcbiAgY29uc3QgTVVTSVhNQVRDSF9BUElfS0VZID0gaW1wb3J0Lm1ldGEuZW52LlZJVEVfTVVTSVhNQVRDSF9BUElfS0VZO1xyXG5cclxuICBpZiAoIU1VU0lYTUFUQ0hfQVBJX0tFWSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIk5vIE11c2l4bWF0Y2ggQVBJIGtleSBwcm92aWRlZC5cIiB9KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgLy8gU3RlcCAxOiBTZWFyY2ggZm9yIHRoZSB0cmFjayB0byBnZXQgdGhlIHNvbmcgSURcclxuICAgIGNvbnN0IHNlYXJjaFJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFxyXG4gICAgICBgaHR0cHM6Ly9hcGkubXVzaXhtYXRjaC5jb20vd3MvMS4xL3RyYWNrLnNlYXJjaD9xX3RyYWNrPSR7dHJhY2tUaXRsZX0mcV9hcnRpc3Q9JHt0cmFja0FydGlzdH0mYXBpa2V5PSR7TVVTSVhNQVRDSF9BUElfS0VZfWBcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdHJhY2tMaXN0ID0gc2VhcmNoUmVzcG9uc2UuZGF0YS5tZXNzYWdlLmJvZHkudHJhY2tfbGlzdDtcclxuXHJcbiAgICBpZiAoIXRyYWNrTGlzdCB8fCB0cmFja0xpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogNDA0LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJObyBtYXRjaGluZyB0cmFjayBmb3VuZC5cIiB9KSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFeHRyYWN0aW5nIHRoZSB0cmFjayBJRCBmcm9tIHRoZSBmaXJzdCByZXN1bHRcclxuICAgIGNvbnN0IHRyYWNrSWQgPSB0cmFja0xpc3RbMF0udHJhY2sudHJhY2tfaWQ7XHJcblxyXG4gICAgLy8gU3RlcCAyOiBVc2UgdGhlIHRyYWNrIElEIHRvIGdldCB0aGUgbHlyaWNzXHJcbiAgICBjb25zdCBseXJpY3NSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcclxuICAgICAgYGh0dHBzOi8vYXBpLm11c2l4bWF0Y2guY29tL3dzLzEuMS90cmFjay5seXJpY3MuZ2V0P3RyYWNrX2lkPSR7dHJhY2tJZH0mYXBpa2V5PSR7TVVTSVhNQVRDSF9BUElfS0VZfWBcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgbHlyaWNzID0gbHlyaWNzUmVzcG9uc2UuZGF0YS5tZXNzYWdlLmJvZHkubHlyaWNzLmx5cmljc19ib2R5O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGx5cmljczogbHlyaWNzIHx8IFwiTHlyaWNzIG5vdCBmb3VuZFwiLFxyXG4gICAgICB9KSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBlcnJvcjogXCJBUEkgcmF0ZSBsaW1pdCByZWFjaGVkIG9yIGludmFsaWQga2V5LlwiLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiRXJyb3IgZmV0Y2hpbmcgbHlyaWNzLlwiIH0pLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFFBQVEsVUFBUSxPQUFPO0FBRTdCLElBQU8saUJBQVEsT0FBTyxVQUFVO0FBQzlCLFFBQU0sRUFBRSxZQUFZLFlBQVksSUFBSSxNQUFNO0FBRTFDLFFBQU0scUJBQXFCLFlBQVksSUFBSTtBQUUzQyxNQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLFdBQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLE1BQU0sS0FBSyxVQUFVLEVBQUUsT0FBTyxrQ0FBa0MsQ0FBQztBQUFBLElBQ25FO0FBQUEsRUFDRjtBQUVBLE1BQUk7QUFFRixVQUFNLGlCQUFpQixNQUFNLE1BQU07QUFBQSxNQUNqQywwREFBMEQsVUFBVSxhQUFhLFdBQVcsV0FBVyxrQkFBa0I7QUFBQSxJQUMzSDtBQUVBLFVBQU0sWUFBWSxlQUFlLEtBQUssUUFBUSxLQUFLO0FBRW5ELFFBQUksQ0FBQyxhQUFhLFVBQVUsV0FBVyxHQUFHO0FBQ3hDLGFBQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLE1BQU0sS0FBSyxVQUFVLEVBQUUsU0FBUywyQkFBMkIsQ0FBQztBQUFBLE1BQzlEO0FBQUEsSUFDRjtBQUdBLFVBQU0sVUFBVSxVQUFVLENBQUMsRUFBRSxNQUFNO0FBR25DLFVBQU0saUJBQWlCLE1BQU0sTUFBTTtBQUFBLE1BQ2pDLCtEQUErRCxPQUFPLFdBQVcsa0JBQWtCO0FBQUEsSUFDckc7QUFFQSxVQUFNLFNBQVMsZUFBZSxLQUFLLFFBQVEsS0FBSyxPQUFPO0FBRXZELFdBQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLE1BQU0sS0FBSyxVQUFVO0FBQUEsUUFDbkIsUUFBUSxVQUFVO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLFNBQVMsT0FBTztBQUNkLFFBQUksTUFBTSxZQUFZLE1BQU0sU0FBUyxXQUFXLEtBQUs7QUFDbkQsYUFBTztBQUFBLFFBQ0wsWUFBWTtBQUFBLFFBQ1osTUFBTSxLQUFLLFVBQVU7QUFBQSxVQUNuQixPQUFPO0FBQUEsUUFDVCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsT0FBTztBQUNMLGNBQVEsTUFBTSxLQUFLO0FBQ25CLGFBQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLE1BQU0sS0FBSyxVQUFVLEVBQUUsT0FBTyx5QkFBeUIsQ0FBQztBQUFBLE1BQzFEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
