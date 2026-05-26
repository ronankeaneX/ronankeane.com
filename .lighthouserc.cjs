/**
 * Lighthouse CI config — invoked by the GitHub Actions workflow at
 * .github/workflows/preview-quality.yml and locally via `npx lhci autorun`.
 *
 * Targets the built static output in ./dist. Adjust `assert` thresholds
 * once the site has real content; the SEO score is the load-bearing one
 * for an LLM-citation-focused build.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
