import { LOCAL_IMAGES } from './localImages';
import oduaLogo from './oduaLogo.svg';

export const DEFAULT_LOGO = oduaLogo;

export function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;

  if (url.endsWith('/cocoa_house_sharp.jpg')) {
    return LOCAL_IMAGES.cocoaHouseSharp;
  }

  if (url.endsWith('/cocoa_house_wikipedia.jpg')) {
    return LOCAL_IMAGES.cocoaHouseWikipedia;
  }

  if (url.includes('i.postimg.cc/mg37tmcB/logo.png')) {
    return DEFAULT_LOGO;
  }

  return url;
}