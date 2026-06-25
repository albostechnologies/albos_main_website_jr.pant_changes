// Static route for the /about section. The single-page shell (app/page.jsx)
// reads the active section from window.location.pathname, so re-exporting it
// here makes /about deep-linkable in the static export (replaces the old
// next.config rewrite, which a static host cannot run).
export { default } from "../page";
