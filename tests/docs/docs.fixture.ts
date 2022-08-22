import { ClientFunction, fixture, Selector, test } from "testcafe";

fixture`Docs`.page`https://testcafe.io/`;

const getLocationPart = ClientFunction((locationPart: "host" | "pathname") => {
  return window.location[locationPart];
});

test("Page loading", async (t) => {
  await t.expect(getLocationPart("host")).eql("testcafe.io");
});

test("Docs tab exist", async (t) => {
  const docsTab = Selector("a").withText("Docs");
  await t.expect(docsTab.exists).eql(true);
});

test("Navigate to docs", async (t) => {
  const docsTab = Selector("a").withText("Docs");
  await t
    .click(docsTab)
    .expect(getLocationPart("pathname"))
    .contains("documentation");
});
