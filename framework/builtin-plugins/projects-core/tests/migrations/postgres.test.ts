import { describe, expect, it } from "bun:test";

import {
  buildProjectsCoreMigrationSql,
  buildProjectsCoreRollbackSql,
  getProjectsCoreLookupIndexName,
  getProjectsCoreStatusIndexName
} from "../../src/postgres";

describe("projects-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildProjectsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS projects_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS projects_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS projects_core.exception_records");
    expect(sql).toContain(getProjectsCoreLookupIndexName());
    expect(sql).toContain(getProjectsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildProjectsCoreRollbackSql({ schemaName: "projects_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS projects_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS projects_core_preview CASCADE");
  });
});
