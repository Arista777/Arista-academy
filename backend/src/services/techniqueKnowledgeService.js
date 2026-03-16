import { createTechniqueLink, listTechniqueLinks } from "../models/techniqueLinkModel.js";
import { createTechniqueResource, listTechniqueResources } from "../models/techniqueResourceModel.js";

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
  return createTechniqueResource(payload);
}

export {
  getTechniqueLinks,
  addTechniqueLink,
  getTechniqueResources,
  addTechniqueResource,
};
