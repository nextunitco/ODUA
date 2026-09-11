import { LOCAL_IMAGES } from './localImages';

export function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;

  if (url.endsWith('/cocoa_house_sharp.jpg')) {
    return LOCAL_IMAGES.cocoaHouseSharp;
  }

  if (url.endsWith('/cocoa_house_wikipedia.jpg')) {
    return LOCAL_IMAGES.cocoaHouseWikipedia;
  }

  return url;
}