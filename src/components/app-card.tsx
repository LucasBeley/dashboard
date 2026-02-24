import type { DiscoveredApp } from "@/lib/scanner";
import { StatusBadge } from "./status-badge";
import { TechTag } from "./tech-tag";

function GithubIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.25a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AppCard({ app }: { app: DiscoveredApp }) {
  if (!app.meta) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-5">
        <p className="text-sm font-medium text-gray-500">{app.folderName}/</p>
        <p className="mt-1 text-xs text-gray-600">
          {app.parseError ? "Invalid app.meta.json" : "No app.meta.json"}
        </p>
        {app.parseError && (
          <p className="mt-2 text-xs text-red-400/70 font-mono break-all">
            {app.parseError.slice(0, 120)}
          </p>
        )}
      </div>
    );
  }

  const { meta, git } = app;

  return (
    <div className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-100 truncate">
            {meta.displayName}
          </h3>
          {meta.version && (
            <span className="text-xs text-gray-500 font-mono">
              v{meta.version}
            </span>
          )}
        </div>
        <StatusBadge status={meta.status} />
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-400 line-clamp-2">
        {meta.description}
      </p>

      {/* Tech Stack */}
      {meta.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {meta.techStack.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>
      )}

      {/* Deploy info */}
      {meta.deploy && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span>Deploy:</span>
          <StatusBadge status={meta.deploy.status} type="deploy" />
          {meta.deploy.method && (
            <span className="text-gray-600">via {meta.deploy.method}</span>
          )}
        </div>
      )}

      {/* Git info */}
      {git.lastCommitDate && (
        <p className="mt-2 text-xs text-gray-600 truncate">
          {git.branch && (
            <span className="font-mono text-gray-500">{git.branch}</span>
          )}
          {git.branch && " · "}
          {git.lastCommitDate}
          {git.lastCommitMessage && ` — ${git.lastCommitMessage}`}
        </p>
      )}

      {/* Links */}
      <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        {meta.github?.url && (
          <a
            href={meta.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        )}
        {meta.deploy?.url && (
          <a
            href={meta.deploy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ExternalLinkIcon />
            <span>Visit</span>
          </a>
        )}
        {meta.tags.length > 0 && (
          <div className="ml-auto flex gap-1">
            {meta.tags.map((tag) => (
              <span key={tag} className="text-[10px] text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
