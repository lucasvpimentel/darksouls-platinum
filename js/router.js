export const ROUTES = ['rota', 'atlas', 'conquistas', 'armas', 'magias', 'aprimoramentos', 'farm', 'builds', 'dados'];

export function startRouter(render) {
  const go = () => {
    const r = location.hash.replace(/^#\//, '');
    if (!ROUTES.includes(r)) { location.replace('#/rota'); return; }
    render(r);
  };
  addEventListener('hashchange', go);
  go();
  return go;
}
