import { createTechnique, listTechniques } from "../models/techniqueModel.js";

async function getTechniques() {
  return listTechniques();
}

async function addTechnique(payload) {
  const { name, category, description } = payload;
  return createTechnique({ name, category, description });
}

export { getTechniques, addTechnique };
