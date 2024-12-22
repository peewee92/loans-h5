import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  next();
});

export default router;
