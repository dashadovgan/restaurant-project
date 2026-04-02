import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import MenuPage from "../views/MenuPage.vue";
import OurStoryPage from "../views/OurStoryPage.vue";
import LocationPage from "../views/LocationPage.vue";
import NewsPage from "../views/NewsPage.vue";
import ReservationPage from "../views/ReservationPage.vue";
import PostPage from "@/views/PostPage.vue";

import AdminMenuManager from "@/admin/views/AdminMenuManager.vue";
import AdminPostsStories from "@/admin/views/components/AdminPostsStories.vue";
import AdminPostEditor from "@/admin/views/components/AdminPostEditor.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import TermsOfUse from "@/views/TermsOfUse.vue";

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
  },
  {
    path: "/post/:id",
    name: "PostPage",
    component: PostPage,
  },
  {
    path: "/admin/posts/new",
    component: AdminPostEditor,
  },
  {
    path: "/admin/posts/edit/:id",
    component: AdminPostEditor,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
