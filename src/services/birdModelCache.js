/**
 * AMPLIFY DIGITAL — MAXIMUM-SPEED 3D BIRD MODEL CACHING & PRELOAD ENGINE
 * 
 * Features:
 * 1. Immediate Eager Preloading & Pre-Parsing on script evaluation.
 * 2. In-Memory RAM Cache + Pre-parsed Three.js GLTF for 0ms synchronous mount on page load.
 * 3. Persistent IndexedDB Cache for instant repeat loads from native SSD.
 * 4. Compatible with both local dev ('/') and GitHub Pages ('/amplify-website/').
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getAssetUrl } from '../utils/assetUrl';

export const BIRD_MODEL_PATH = getAssetUrl('models/amplify_bird_intro.glb');

const DB_NAME = 'AmplifyBirdCacheDB_v2';
const STORE_NAME = 'bird_glb';
const DB_VERSION = 2;

let inMemoryBirdBuffer = null;
let preloadedBirdGLTF = null;
let activeBirdPreloadPromise = null;
let activeBirdParsePromise = null;

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
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
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
export async function getCachedBirdModel(url = BIRD_MODEL_PATH) {
  if (inMemoryBirdBuffer) return inMemoryBirdBuffer;

  try {
    const db = await openDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(url);

      req.onsuccess = () => {
        if (req.result && req.result instanceof ArrayBuffer) {
          inMemoryBirdBuffer = req.result;
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
 * Store ArrayBuffer in IndexedDB for permanent local flash speed
 */
export async function cacheBirdModel(url, buffer) {
  try {
    inMemoryBirdBuffer = buffer;
    const db = await openDB();
    if (!db) return;

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(buffer, url);
  } catch (err) {
    console.warn('Failed to cache bird model in IndexedDB:', err);
  }
}

/**
 * Check if the bird model is already in RAM
 */
export function isBirdModelReady() {
  return preloadedBirdGLTF !== null || inMemoryBirdBuffer !== null;
}

/**
 * Get synchronously available preloaded GLTF if ready
 */
export function getPreloadedBirdGLTF() {
  return preloadedBirdGLTF;
}

/**
 * Load GLB with eager in-memory / cache-first strategy
 */
export async function loadBirdGLBWithCache(url = BIRD_MODEL_PATH) {
  // 1. Instant in-memory RAM cache (0ms)
  if (inMemoryBirdBuffer) {
    return inMemoryBirdBuffer;
  }

  // If eager preload is in flight, await it
  if (activeBirdPreloadPromise && (!url || url === BIRD_MODEL_PATH)) {
    const res = await activeBirdPreloadPromise;
    if (res) return res;
  }

  // 2. Local IndexedDB cache (instant native SSD/flash speed)
  const cached = await getCachedBirdModel(url);
  if (cached) {
    inMemoryBirdBuffer = cached;
    return cached;
  }

  // 3. Fast parallel network fetch
  const fetchUrl = url + (url.includes('?') ? '&' : '?') + 'v=1.0';
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      const fallbackRes = await fetch(url);
      if (!fallbackRes.ok) {
        throw new Error(`Failed to fetch 3D bird model: ${fallbackRes.statusText}`);
      }
      const arrayBuffer = await fallbackRes.arrayBuffer();
      cacheBirdModel(url, arrayBuffer);
      return arrayBuffer;
    }

    const arrayBuffer = await response.arrayBuffer();
    cacheBirdModel(url, arrayBuffer);
    return arrayBuffer;
  } catch (err) {
    const fallbackRes = await fetch(url);
    if (!fallbackRes.ok) throw err;
    const arrayBuffer = await fallbackRes.arrayBuffer();
    cacheBirdModel(url, arrayBuffer);
    return arrayBuffer;
  }
}

/**
 * Eager Background Preloader
 */
export function preloadBirdModel() {
  if (inMemoryBirdBuffer) return Promise.resolve(inMemoryBirdBuffer);
  if (activeBirdPreloadPromise) return activeBirdPreloadPromise;

  activeBirdPreloadPromise = loadBirdGLBWithCache(BIRD_MODEL_PATH).catch((err) => {
    console.warn('Bird preload warning:', err);
    activeBirdPreloadPromise = null;
    return null;
  });

  return activeBirdPreloadPromise;
}

/**
 * Preload and parse the GLTF scene ahead of time so mounting is 0ms
 */
export async function preloadAndParseBirdModel() {
  if (preloadedBirdGLTF) return preloadedBirdGLTF;
  if (activeBirdParsePromise) return activeBirdParsePromise;

  activeBirdParsePromise = (async () => {
    try {
      const buffer = await preloadBirdModel();
      if (!buffer) return null;

      return new Promise((resolve) => {
        const loader = new GLTFLoader();
        loader.parse(
          buffer.slice(0),
          '',
          (gltf) => {
            preloadedBirdGLTF = gltf;
            resolve(gltf);
          },
          (err) => {
            console.warn('Bird pre-parse error:', err);
            resolve(null);
          }
        );
      });
    } catch (e) {
      console.warn('Bird pre-parse failed:', e);
      return null;
    }
  })();

  return activeBirdParsePromise;
}

// Auto-trigger preload and parse immediately in browser environment!
if (typeof window !== 'undefined') {
  preloadAndParseBirdModel();
}
