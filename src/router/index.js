import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";

// Остальные страницы грузятся по требованию, чтобы не утяжелять первый экран
const MenuPage = () => import("../views/MenuPage.vue");
const OurStoryPage = () => import("../views/OurStoryPage.vue");
const LocationPage = () => import("../views/LocationPage.vue");
const NewsPage = () => import("../views/NewsPage.vue");
const ReservationPage = () => import("../views/ReservationPage.vue");
const PostPage = () => import("@/views/PostPage.vue");

const AdminMenuManager = () => import("@/admin/views/AdminMenuManager.vue");
const AdminPostsStories = () => import("@/admin/views/components/AdminPostsStories.vue");
const AdminPostEditor = () => import("@/admin/views/components/AdminPostEditor.vue");
const PrivacyPolicy = () => import("@/views/PrivacyPolicy.vue");
const TermsOfUse = () => import("@/views/TermsOfUse.vue");
const AdminLogin = () => import("@/admin/views/AdminLogin.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  { path: "/privacy-policy", name: "PrivacyPolicy", component: PrivacyPolicy },
  { path: "/terms-of-use", name: "TermsOfUse", component: TermsOfUse },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminMenuManager,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
  },
  {
    path: "/our-story",
    name: "OurStory",
    component: OurStoryPage,
  },
  {
    path: "/location",
    name: "Location",
    component: LocationPage,
  },
  {
    path: "/news",
    name: "News",
    component: NewsPage,
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: ReservationPage,
  },
  {
    path: "/admin/posts",
    name: "AdminPostsStories",
    component: AdminPostsStories,
    meta: { requiresAdmin: true },
  },
  {
    path: "/post/:id",
    name: "PostPage",
    component: PostPage,
  },
  {
    path: "/admin/posts/new",
    component: AdminPostEditor,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/posts/edit/:id",
    component: AdminPostEditor,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory('/restaurant-project/'),
  routes,
});

// Админка доступна только после входа через разрешённый Google-аккаунт
router.beforeEach(async (to) => {
  if (!to.matched.some((record) => record.meta.requiresAdmin)) return true;

  const { getCurrentUser, hasAdminAccess } = await import("@/services/admin-auth.service");
  try {
    const user = await getCurrentUser();
    if (user && (await hasAdminAccess())) return true;
  } catch (error) {
    console.error(error);
  }
  return { name: "AdminLogin", query: { redirect: to.fullPath } };
});

export default router;
