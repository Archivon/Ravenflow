export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    if (this.routes[path]) {
      this.currentRoute = path;
      this.routes[path]();
      
      // Atualizar URL sem recarregar página
      window.history.pushState({ path }, '', `#${path}`);
    }
  }

  init() {
    // Verificar hash na URL
    const hash = window.location.hash.substring(1) || 'dashboard';
    this.navigate(hash);

    // Listener para mudanças no hash
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1) || 'dashboard';
      this.navigate(hash);
    });
  }
}
