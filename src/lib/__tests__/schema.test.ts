import { describe, it, expect } from "vitest";
import { appMetaSchema } from "../schema";

describe("appMetaSchema", () => {
  const validMeta = {
    name: "test-app",
    displayName: "Test App",
    description: "A test application",
    status: "in-progress",
    techStack: ["React", "TypeScript"],
    github: {
      owner: "LucasBeley",
      repo: "test-app",
      url: "https://github.com/LucasBeley/test-app",
    },
    deploy: {
      method: "docker",
      status: "not-deployed",
      url: null,
    },
    createdAt: "2026-02-24",
    tags: ["test"],
  };

  it("parses a valid full metadata object", () => {
    const result = appMetaSchema.parse(validMeta);
    expect(result.name).toBe("test-app");
    expect(result.displayName).toBe("Test App");
    expect(result.status).toBe("in-progress");
    expect(result.techStack).toEqual(["React", "TypeScript"]);
  });

  it("parses minimal required fields", () => {
    const minimal = {
      name: "minimal",
      displayName: "Minimal App",
      description: "Just the basics",
      status: "planning",
    };
    const result = appMetaSchema.parse(minimal);
    expect(result.name).toBe("minimal");
    expect(result.techStack).toEqual([]);
    expect(result.tags).toEqual([]);
    expect(result.github).toBeUndefined();
    expect(result.deploy).toBeUndefined();
  });

  it("rejects invalid status values", () => {
    const invalid = {
      ...validMeta,
      status: "unknown-status",
    };
    expect(() => appMetaSchema.parse(invalid)).toThrow();
  });

  it("rejects missing required fields", () => {
    expect(() => appMetaSchema.parse({})).toThrow();
    expect(() =>
      appMetaSchema.parse({ name: "only-name" })
    ).toThrow();
  });

  it("rejects invalid deploy status", () => {
    const invalid = {
      ...validMeta,
      deploy: { method: "docker", status: "invalid" },
    };
    expect(() => appMetaSchema.parse(invalid)).toThrow();
  });

  it("rejects invalid github url", () => {
    const invalid = {
      ...validMeta,
      github: { owner: "test", repo: "test", url: "not-a-url" },
    };
    expect(() => appMetaSchema.parse(invalid)).toThrow();
  });

  it("defaults techStack and tags to empty arrays", () => {
    const noArrays = {
      name: "no-arrays",
      displayName: "No Arrays",
      description: "Missing optional arrays",
      status: "ready",
    };
    const result = appMetaSchema.parse(noArrays);
    expect(result.techStack).toEqual([]);
    expect(result.tags).toEqual([]);
  });
});
