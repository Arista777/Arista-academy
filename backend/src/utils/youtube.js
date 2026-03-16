import { YOUTUBE_API_KEY } from "./config.js";

function extractYouTubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch (error) {
    return null;
  }

  return null;
}

async function fetchYouTubeMetadata(videoId) {
  if (!videoId || !YOUTUBE_API_KEY) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const response = await fetch(url.toString());
  if (!response.ok) return null;

  const data = await response.json();
  const item = data.items?.[0];
  if (!item?.snippet) return null;

  return {
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
  };
}

export { extractYouTubeId, fetchYouTubeMetadata };
