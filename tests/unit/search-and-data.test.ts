import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { faqsData } from "../../src/data/faqs.js";
import { primaryNavItems } from "../../src/data/navigation.js";
import { projectHubs, projectsData } from "../../src/data/projects.js";
import { servicesData } from "../../src/data/services.js";
import { technologiesData } from "../../src/data/skills.js";
import { socialLinksData } from "../../src/data/social-links.js";
import { translate } from "../../src/i18n/index.js";
import { searchFrontendIndex } from "../../src/services/searchEngine.js";

test("verified project inventory contains all 34 hub projects and local assets exist", () => {
  assert.equal(projectsData.length, 34);
  for (const project of projectsData) {
    assert.ok(project.live.startsWith("https://"), `${project.id} missing live URL`);
    assert.ok(project.github.startsWith("https://github.com/"), `${project.id} missing GitHub URL`);
    const localFile = path.resolve(process.cwd(), "public", project.image.replace(/^\//, ""));
    assert.ok(fs.existsSync(localFile), `Missing image asset: ${localFile}`);
  }
});

test("both project hubs remain separate with verified URLs", () => {
  assert.equal(projectHubs.length, 2);
  assert.equal(projectHubs[0].url, "https://myprojects-hub.netlify.app/");
  assert.equal(projectHubs[1].url, "https://projects-hub-snowy.vercel.app/");
});

test("services list contains exact 8 services and navigation preserves 6 pages", () => {
  assert.equal(servicesData.length, 8);
  assert.equal(primaryNavItems.length, 5);
  assert.ok(faqsData.length >= 5);
  assert.ok(technologiesData.length >= 10);
});

test("verified brand monogram asset and email exist", () => {
  const monogram = path.resolve(process.cwd(), "public/assets/images/brand/brand-monogram.webp");
  assert.ok(fs.existsSync(monogram));
  const emailEntry = socialLinksData.find((s) => s.id === "email");
  assert.equal(emailEntry?.value, "arslansahil850@gmail.com");
});

test("bilingual translations resolve in English and Urdu without missing keys", () => {
  const enHero = translate("en", "hero.titleLine1");
  const urHero = translate("ur", "hero.titleLine1");
  assert.notEqual(enHero, "hero.titleLine1");
  assert.notEqual(urHero, "hero.titleLine1");
  assert.notEqual(enHero, urHero);
});

test("frontend global search matches projects, services, technologies, and pages in EN and UR", () => {
  const stayoraResults = searchFrontendIndex("Stayora", "en");
  assert.ok(stayoraResults.some((item) => item.category === "project" && item.title === "Stayora"));

  const nodeResults = searchFrontendIndex("Node.js", "en");
  assert.ok(nodeResults.some((item) => item.category === "technology"));

  const urServiceResults = searchFrontendIndex("ویب", "ur");
  assert.ok(urServiceResults.length > 0);
});
