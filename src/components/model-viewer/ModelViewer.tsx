'use client';

import { useMemo, useState } from 'react';
import { Scene } from './Scene';
import type { ViewerSettings, PresetModel } from '@/types/model';
import { PRESET_MODELS } from '@/config/models';

export function ModelViewer() {
  const [selectedId, setSelectedId] = useState<string>(PRESET_MODELS[0]?.id);

  const [settings, setSettings] = useState<ViewerSettings>({
    autoRotate: true,
    showGrid: true,
    backgroundColor: '#1a1a2e',
  });

  const selectedModel = useMemo<PresetModel | null>(() => {
    return PRESET_MODELS.find((m) => m.id === selectedId) ?? null;
  }, [selectedId]);

  const characters = useMemo(
    () => PRESET_MODELS.filter((m) => m.category === 'character'),
    []
  );

  const objects = useMemo(
    () => PRESET_MODELS.filter((m) => m.category === 'object'),
    []
  );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Scene
        model={selectedModel}
        settings={settings}
        onModelLoad={() => {
          console.log('モデル読み込み完了:', selectedModel?.name);
        }}
        onModelError={(error) => {
          console.error('モデル読み込みエラー:', error);
        }}
      />

      <div className="absolute top-4 left-4 z-10 bg-white/95 rounded-lg p-4 shadow space-y-4 w-64">
        <h3 className="font-bold text-gray-800 text-sm">キャラクター</h3>
        <div className="flex flex-col gap-2">
          {characters.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedId(model.id)}
              className={`flex flex-col items-start px-3 py-2 rounded border text-left transition ${
                selectedId === model.id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'
              }`}
            >
              <span className="text-sm font-semibold">{model.name}</span>
              {model.description && (
                <span className="text-[11px] opacity-80">
                  {model.description}
                </span>
              )}
            </button>
          ))}
        </div>

        <h3 className="font-bold text-gray-800 text-sm mt-2">オブジェクト</h3>
        <div className="flex flex-col gap-2">
          {objects.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedId(model.id)}
              className={`flex flex-col items-start px-3 py-2 rounded border text-left transition ${
                selectedId === model.id
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-emerald-50'
              }`}
            >
              <span className="text-sm font-semibold">{model.name}</span>
              {model.description && (
                <span className="text-[11px] opacity-80">
                  {model.description}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-white/90 rounded-lg p-4 space-y-3 shadow">
        <h3 className="font-bold text-gray-800 text-sm">表示設定</h3>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoRotate}
            onChange={() =>
              setSettings((prev) => ({ ...prev, autoRotate: !prev.autoRotate }))
            }
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">自動回転</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.showGrid}
            onChange={() =>
              setSettings((prev) => ({ ...prev, showGrid: !prev.showGrid }))
            }
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">グリッド表示</span>
        </label>

        <div className="space-y-1">
          <span className="text-sm text-gray-700">背景色</span>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                backgroundColor: e.target.value,
              }))
            }
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>

        {selectedModel && (
          <div className="pt-2 border-t border-gray-200 mt-2">
            <p className="text-[11px] text-gray-500">
              現在のモデル:{' '}
              <span className="font-semibold">{selectedModel.name}</span>
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-10 bg-white/80 rounded-lg p-3 text-xs text-gray-600">
        <p>🖱️ 左ドラッグ: 回転</p>
        <p>🖱️ 右ドラッグ: 移動</p>
        <p>🖱️ スクロール: ズーム</p>
      </div>
    </div>
  );
}
