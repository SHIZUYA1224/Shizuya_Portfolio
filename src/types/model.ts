// src/types/model.ts

export type ModelType = 'gltf' | 'vrm' | null;
export type ModelCategory = 'character' | 'object';

export interface ModelData {
  url: string;
  type: ModelType;
  name: string;
}

export interface PresetModel extends ModelData {
  id: string;
  category: ModelCategory;
  description?: string;
}

export interface ViewerSettings {
  autoRotate: boolean;
  showGrid: boolean;
  backgroundColor: string;
}
