import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("modules/portfolio/layouts/PortfolioLayout.tsx", [
    index("modules/portfolio/pages/HomePage.tsx"),
    route("portfolio", "modules/portfolio/pages/PortfolioPage.tsx"),
    route("diaries", "modules/portfolio/pages/DiariesPage.tsx"),
    route("sitemap", "modules/portfolio/pages/SitemapPage.tsx"),
    route("project/:slug", "modules/portfolio/pages/ProjectDetailPage.tsx"),
    route("diary/:slug", "modules/portfolio/pages/DiaryDetailPage.tsx"),
    
    // CMS Routes (Protected)
    layout("modules/cms/layouts/CMSLayout.tsx", [
      route("cms", "modules/cms/pages/CMSDashboard.tsx"),
    ]),
  ]),
  route("login", "modules/auth/pages/LoginPage.tsx"),
  route("register", "modules/auth/pages/RegisterPage.tsx"),
  route("setup", "modules/shared/pages/InitPage.tsx"),
] satisfies RouteConfig;
