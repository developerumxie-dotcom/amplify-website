/**
 * AMPLIFY AI — MAXIMUM-SPEED 3D MODEL CACHING & PRELOAD ENGINE
 * Features:
 * 1. Immediate Eager Preloading & Pre-Parsing on script evaluation.
 * 2. In-Memory RAM Cache + Pre-parsed Three.js GLTF for 0ms synchronous mount.
 * 3. Persistent IndexedDB Cache (v2) for instant repeat loads.
 * 4. Automatic purge of any legacy oversized 56MB buffers.
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getAssetUrl } from '../../../utils/assetUrl';

export const MASCOT_MODEL_PATH = getAssetUrl('models/eagle_mascot_hi_cloud.glb');

const DB_NAME = 'AmplifyAICacheDB_v3';
const STORE_NAME = 'glb_models';
const DB_VERSION = 3;

// In-Memory RAM cache (0ms instant access once fetched/parsed)
let inMemoryBuffer = null;
let preloadedGLTF = null;
let activePreloadPromise = null;
let activeParsePromise = null;

function openDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
        }
        db.createObjectStore(STORE_NAME);
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Retrieve cached ArrayBuffer by key/URL from IndexedDB
 */
export async function getCachedModel(url) {
  if (inMemoryBuffer) return inMemoryBuffer;

  try {
    const db = await openDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(url);

      req.onsuccess = () => {
        if (req.result && req.result instanceof ArrayBuffer) {
          // If cached buffer is oversized (> 10MB from legacy 56MB model), purge it
          if (req.result.byteLength > 10 * 1024 * 1024) {
            try {
              const delTx = db.transaction(STORE_NAME, 'readwrite');
              delTx.objectStore(STORE_NAME).delete(url);
            } catch { }
            resolve(null);
            return;
          }
          inMemoryBuffer = req.result;
          resolve(req.result);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Store ArrayBuffer in IndexedDB for permanent local speed
 */
export async function cacheModel(url, buffer) {
  try {
    inMemoryBuffer = buffer;
    const db = await openDB();
    if (!db) return;

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(buffer, url);
  } catch (err) {
    console.warn('Failed to cache model in IndexedDB:', err);
  }
}

/**
 * Check if the model is already in RAM (buffer or preloaded GLTF)
 */
export function isModelReady() {
  return preloadedGLTF !== null || inMemoryBuffer !== null;
}

/**
 * Get synchronously available preloaded GLTF if ready
 */
export function getPreloadedGLTF() {
  return preloadedGLTF;
}

/**
 * Load GLB with eager in-memory / cache-first strategy
 */
export async function loadGLBWithCache(url = MASCOT_MODEL_PATH) {
  // 1. Instant in-memory RAM cache (0ms)
  if (inMemoryBuffer) {
    return inMemoryBuffer;
  }

  // If eager preload is currently running for this model, await it
  if (activePreloadPromise && (!url || url === MASCOT_MODEL_PATH)) {
    const res = await activePreloadPromise;
    if (res) return res;
  }

  // 2. Local IndexedDB cache (instant native SSD/flash speed)
  const cached = await getCachedModel(url);
  if (cached) {
    inMemoryBuffer = cached;
    return cached;
  }

  // 3. Fast parallel network fetch
  const fetchUrl = url + (url.includes('?') ? '&' : '?') + 'v=2.2';
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      const fallbackRes = await fetch(url);
      if (!fallbackRes.ok) {
        throw new Error(`Failed to fetch 3D model: ${fallbackRes.statusText}`);
      }
      const arrayBuffer = await fallbackRes.arrayBuffer();
      cacheModel(url, arrayBuffer);
      return arrayBuffer;
    }

    const arrayBuffer = await response.arrayBuffer();
    cacheModel(url, arrayBuffer);
    return arrayBuffer;
  } catch (err) {
    // If cache-busted fetch threw, try direct url
    const fallbackRes = await fetch(url);
    if (!fallbackRes.ok) {
      throw err;
    }
    const arrayBuffer = await fallbackRes.arrayBuffer();
    cacheModel(url, arrayBuffer);
    return arrayBuffer;
  }
}

/**
 * Eager Background Preloader
 * Begins downloading / retrieving model into RAM the moment script loads.
 */
export function preloadMascotModel() {
  if (inMemoryBuffer) return Promise.resolve(inMemoryBuffer);
  if (activePreloadPromise) return activePreloadPromise;

  activePreloadPromise = loadGLBWithCache(MASCOT_MODEL_PATH).catch((err) => {
    console.warn('Preload warning:', err);
    activePreloadPromise = null;
    return null;
  });

  return activePreloadPromise;
}

/**
 * Preload and parse the GLTF scene ahead of time so mounting is 0ms
 */
export async function preloadAndParseModel() {
  if (preloadedGLTF) return preloadedGLTF;
  if (activeParsePromise) return activeParsePromise;

  activeParsePromise = (async () => {
    try {
      const buffer = await preloadMascotModel();
      if (!buffer) return null;

      return new Promise((resolve) => {
        const loader = new GLTFLoader();
        loader.parse(
          buffer.slice(0),
          '',
          (gltf) => {
            preloadedGLTF = gltf;
            resolve(gltf);
          },
          (err) => {
            console.warn('Pre-parse error:', err);
            resolve(null);
          }
        );
      });
    } catch (e) {
      console.warn('Pre-parse failed:', e);
      return null;
    }
  })();

  return activeParsePromise;
}

// Auto-trigger preload and parse immediately in browser environment!
if (typeof window !== 'undefined') {
  preloadAndParseModel();
}
