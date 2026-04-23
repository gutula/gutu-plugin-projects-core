import { describe, expect, it } from "bun:test";

import {
  buildProjectsCoreSqliteMigrationSql,
  buildProjectsCoreSqliteRollbackSql,
  getProjectsCoreSqliteLookupIndexName,
  getProjectsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("projects-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildProjectsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS projects_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS projects_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS projects_core_exception_records");
    expect(sql).toContain(getProjectsCoreSqliteLookupIndexName("projects_core_"));
    expect(sql).toContain(getProjectsCoreSqliteStatusIndexName("projects_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildProjectsCoreSqliteRollbackSql({ tablePrefix: "projects_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS projects_core_preview_exception_records");
  });
});
