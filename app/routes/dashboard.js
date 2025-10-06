import Route from '@ember/routing/route';

export default class DashboardRoute extends Route {
  model() {
    console.log('Dashboard route loaded');
    return { message: 'Dashboard is working!' };
  }
}
