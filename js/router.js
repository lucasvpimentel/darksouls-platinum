export const ROUTES = ['home', 'rota', 'atlas', 'conquistas', 'armas', 'magias', 'aprimoramentos', 'farm', 'lore', 'builds', 'dados'];

export function startRouter(render) {
  const go = () => {
    const r = location.hash.replace(/^#\//, '');
    if (!ROUTES.includes(r)) { location.replace('#/home'); return; }
    render(r);
  };
  addEventListener('hashchange', go);
  go();
  return go;
}
