const STATE_COLORS: Record<string, [string, string]> = {
  oyo: ['#0b6b4b', '#f1cf00'],
  ogun: ['#1b5e20', '#f1cf00'],
  ondo: ['#1565c0', '#f1cf00'],
  osun: ['#8a1538', '#f1cf00'],
  ekiti: ['#7b1fa2', '#f1cf00'],
  lagos: ['#00695c', '#f1cf00'],
};

export function getStateLogo(state: string): string {
  const key = state.toLowerCase().replace(/ state$/, '').trim();
  const [primary, accent] = STATE_COLORS[key] || ['#0b6b4b', '#f1cf00'];
  const initials = key.slice(0, 2).toUpperCase();
  const label = `${key.charAt(0).toUpperCase()}${key.slice(1)} State`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><circle cx="80" cy="80" r="75" fill="${primary}"/><circle cx="80" cy="80" r="64" fill="none" stroke="${accent}" stroke-width="6"/><path d="M80 28l8 18 20 2-15 13 5 20-18-10-18 10 5-20-15-13 20-2z" fill="${accent}"/><text x="80" y="101" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="35" font-weight="700">${initials}</text><text x="80" y="124" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="10" font-weight="700">${label.toUpperCase()}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}