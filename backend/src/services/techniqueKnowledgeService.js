import { createTechniqueLink, listTechniqueLinks } from "../models/techniqueLinkModel.js";
import { createTechniqueResource, listTechniqueResources } from "../models/techniqueResourceModel.js";
import { extractYouTubeId, fetchYouTubeMetadata } from "../utils/youtube.js";

async function getTechniqueLinks(techniqueId) {
  return listTechniqueLinks(techniqueId);
}

async function addTechniqueLink(payload) {
  return createTechniqueLink(payload);
}

async function getTechniqueResources(techniqueId) {
  return listTechniqueResources(techniqueId);
}

async function addTechniqueResource(payload) {
  const { url, resource_type, title, content } = payload;
  let finalTitle = title;
  let finalContent = content;

  if (resource_type === "video" && url) {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      const metadata = await fetchYouTubeMetadata(videoId);
      if (metadata) {
        finalTitle = finalTitle || metadata.title;
        finalContent = finalContent || metadata.description;
      }
    }
  }

  return createTechniqueResource({
    ...payload,
    title: finalTitle || "Resource",
    content: finalContent || null,
  });
}

export {
  getTechniqueLinks,
  addTechniqueLink,
  getTechniqueResources,
  addTechniqueResource,
};
