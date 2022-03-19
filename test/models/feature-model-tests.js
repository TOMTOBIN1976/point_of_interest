import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPoilists, testFeatures, castle, rockcashel, abbey, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Track Model tests", () => {

  let abbeyList = null;

  setup(async () => {
    db.init("mongo");
    await db.Poiliststore.deleteAllPoilists();
    await db.Featurestore.deleteAllFeatures();
    abbeyList = await db.Poiliststore.addPoilist(abbey);
    for (let i = 0; i < testFeatures.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testFeatures[i] = await db.Featurestore.addTrack(abbeyList._id, testFeatures[i]);
    }
  });

  test("create single track", async () => {
    const mozartList = await db.Poiliststore.addPoilist(mozart);
    const track = await db.Featurestore.addTrack(mozartList._id, concerto)
    assert.isNotNull(track._id);
    assertSubset (concerto, track);
  });

  test("get multiple Features", async () => {
    const Features = await db.Featurestore.getFeaturesByPoilistId(beethovenList._id);
    assert.equal(testFeatures.length, testFeatures.length)
  });

  test("delete all Features", async () => {
    const Features = await db.Featurestore.getAllFeatures();
    assert.equal(testFeatures.length, Features.length);
    await db.Featurestore.deleteAllFeatures();
    const newFeatures = await db.Featurestore.getAllFeatures();
    assert.equal(0, newFeatures.length);
  });

  test("get a track - success", async () => {
    const mozartList = await db.Poiliststore.addPoilist(mozart);
    const track = await db.Featurestore.addTrack(mozartList._id, concerto)
    const newTrack = await db.Featurestore.getTrackById(track._id);
    assertSubset (concerto, newTrack);
  });

  test("delete One Track - success", async () => {
    await db.Featurestore.deleteTrack(testFeatures[0]._id);
    const Features = await db.Featurestore.getAllFeatures();
    assert.equal(Features.length, testPoilists.length - 1);
    const deletedTrack = await db.Featurestore.getTrackById(testFeatures[0]._id);
    assert.isNull(deletedTrack);
  });

  test("get a track - bad params", async () => {
    assert.isNull(await db.Featurestore.getTrackById(""));
    assert.isNull(await db.Featurestore.getTrackById());
  });

  test("delete one track - fail", async () => {
    await db.Featurestore.deleteTrack("bad-id");
    const Features = await db.Featurestore.getAllFeatures();
    assert.equal(Features.length, testPoilists.length);
  });
});
