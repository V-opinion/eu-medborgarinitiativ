/**
 * WebMCP Tool Registration
 * 
 * Exposes site tools to AI agents via the browser's navigator.modelContext API.
 * Embed this script in your page's <head> or at the end of <body>.
 * 
 * Spec: https://webmachinelearning.github.io/webmcp/
 * Chrome blog: https://developer.chrome.com/blog/webmcp-epp
 */

(function initWebMCP() {
  // Guard: only run if the WebMCP API is available
  if (!navigator.modelContext) {
    console.debug("[WebMCP] navigator.modelContext not available in this browser.");
    return;
  }

  const controller = new AbortController();
  const { signal } = controller;

  // --- Tool: search ---
  navigator.modelContext.registerTool(
    {
      name: "search",
      description: "Search the site for content matching a query.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search term or phrase."
          }
        },
        required: ["query"]
      }
    },
    async ({ query }) => {
      // TODO: replace with your real search endpoint
      const url = `/search?q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Search failed: ${res.status}`);
      const data = await res.json();
      return {
        results: data.results ?? [],
        total: data.total ?? 0
      };
    },
    { signal }
  );

  // --- Tool: navigate ---
  navigator.modelContext.registerTool(
    {
      name: "navigate",
      description: "Navigate to a path on this site.",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Relative path to navigate to, e.g. '/about' or '/products/123'."
          }
        },
        required: ["path"]
      }
    },
    async ({ path }) => {
      window.location.href = path;
      return { navigated: true, path };
    },
    { signal }
  );

  // --- Tool: get-page-content ---
  navigator.modelContext.registerTool(
    {
      name: "get-page-content",
      description: "Retrieve the main text content of the current page.",
      inputSchema: {
        type: "object",
        properties: {},
        required: []
      }
    },
    async () => {
      const main =
        document.querySelector("main") ||
        document.querySelector("article") ||
        document.body;
      return {
        title: document.title,
        url: window.location.href,
        content: main ? main.innerText.trim() : ""
      };
    },
    { signal }
  );

  console.debug("[WebMCP] Tools registered: search, navigate, get-page-content");

  // Unregister tools when page unloads
  window.addEventListener("pagehide", () => controller.abort(), { once: true });
})();
