import { addTechnique, getTechniques } from "../services/techniqueService.js";

async function listTechniques(req, res) {
  try {
    const techniques = await getTechniques();
    res.json(techniques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch techniques" });
  }
}

async function createTechnique(req, res) {
  try {
    const technique = await addTechnique(req.body || {});
    res.status(201).json(technique);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create technique" });
  }
}

export { listTechniques, createTechnique };
