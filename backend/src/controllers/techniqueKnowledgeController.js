import {
  addTechniqueLink,
  addTechniqueResource,
  getTechniqueLinks,
  getTechniqueResources,
} from "../services/techniqueKnowledgeService.js";

async function listTechniqueLinks(req, res) {
  const { id } = req.params;

  try {
    const links = await getTechniqueLinks(id);
    res.json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch technique links" });
  }
}

async function createTechniqueLink(req, res) {
  const { id } = req.params;

  try {
    const record = await addTechniqueLink({
      technique_id: id,
      related_technique_id: req.body?.related_technique_id,
      relation_type: req.body?.relation_type,
    });

    res.status(201).json(record || { message: "Link already exists" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create technique link" });
  }
}

async function listTechniqueResources(req, res) {
  const { id } = req.params;

  try {
    const resources = await getTechniqueResources(id);
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch technique resources" });
  }
}

async function createTechniqueResource(req, res) {
  const { id } = req.params;

  try {
    const record = await addTechniqueResource({
      technique_id: id,
      resource_type: req.body?.resource_type,
      title: req.body?.title,
      url: req.body?.url,
      content: req.body?.content,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create technique resource" });
  }
}

export {
  listTechniqueLinks,
  createTechniqueLink,
  listTechniqueResources,
  createTechniqueResource,
};
