/**
 * Bulletproof asset URL resolver for both Vite Local Dev and GitHub Pages subpaths
 */
export function getAssetUrl(relPath) {
  if (!relPath) return '';
  // Remove leading './' or '/'
  const clean = relPath.replace(/^(\.\/|\/)/, '');
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}
