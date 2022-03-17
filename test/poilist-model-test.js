import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPoilists, castle } from "./fixtures.js";

suite("Point of Interest Model tests", () => {

  setup(async () => {
    db.init("");
    await db.poilistStore.deleteAllPoilists();
    for (let i = 0; i < testPoilists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPoilists[i] = await db.poilistStore.addPoilist(testPoilists[i]);
    }
  });

  test("create a point of interest", async () => {
    const poilist = await db.poilistStore.addPoilist(castle);
    assert.equal(castle, poilist);
    assert.isDefined(poilist._id);
  });

  test("delete all point of interests", async () => {
    let returnedPoilists = await db.poilistStore.getAllPoilists();
    assert.equal(returnedPoilists.length, 3);
    await db.poilistStore.deleteAllPoilists();
    returnedPoilists = await db.poilistStore.getAllPoilists();
    assert.equal(returnedPoilists.length, 0);
  });

  test("get a point of interest - success", async () => {
    const poilist = await db.poilistStore.addPoilist(castle);
    const returnedPoilist = await db.poilistStore.getPoilistById(poilist._id);
    assert.equal(castle, poilist);
  });

  test("delete One point of interes - success", async () => {
    const id = testPoilists[0]._id;
    await db.poilistStore.deletePoilistById(id);
    const returnedPoilists = await db.poilistStore.getAllPoilists();
    assert.equal(returnedPoilists.length, testPoilists.length - 1);
    const deletedPoilist = await db.poilistStore.getPoilistById(id);
    assert.isNull(deletedPoilist);
  });

  test("get a point of interest - bad params", async () => {
    assert.isNull(await db.poilistStore.getPoilistById(""));
    assert.isNull(await db.poilistStore.getPoilistById());
  });

  test("delete One point of interest - fail", async () => {
    await db.poilistStore.deletePoilistById("bad-id");
    const allPoilists = await db.poilistStore.getAllPoilists();
    assert.equal(testPoilists.length, allPoilists.length);
  });
});