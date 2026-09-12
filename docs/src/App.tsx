import { useState } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import SearchPalette, { useSearchHotkeys } from "./components/SearchPalette";
import DocLayout from "./components/DocLayout";
import { routeForPath, routeById } from "./routes";

import Landing from "./pages/Landing";
import DocsPortal from "./pages/DocsPortal";
import GettingStarted from "./pages/GettingStarted";
import HowItWorks from "./pages/HowItWorks";
import Architecture from "./pages/Architecture";
import Security from "./pages/Security";
import Roadmap from "./pages/Roadmap";
import Examples from "./pages/Examples";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchHotkeys(() => setSearchOpen(true));

  const hit = routeForPath(location.pathname);

  if (hit === "404") {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader onSearch={() => setSearchOpen(true)} />
        <NotFound />
        <SiteFooter />
        <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    );
  }

  const route = routeById(hit.id)!;
  const page = (() => {
    switch (hit.id) {
      case "landing":
        return <Landing />;
      case "docs-portal":
        return <DocsPortal />;
      case "examples":
        return <Examples />;
      case "about":
        return <About />;
      default: {
        const body = (() => {
          switch (hit.id) {
            case "getting-started":
              return <GettingStarted />;
            case "how-it-works":
              return <HowItWorks />;
            case "architecture":
              return <Architecture />;
            case "security":
              return <Security />;
            case "roadmap":
              return <Roadmap />;
            default:
              return null;
          }
        })();
        return body ? <DocLayout route={route}>{body}</DocLayout> : null;
      }
    }
  })();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onSearch={() => setSearchOpen(true)} />
      {page}
      <SiteFooter />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
