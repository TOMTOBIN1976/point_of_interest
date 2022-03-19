import { assert } from "chai";
import { poitimeService } from "./poitime-service.js";
import { assertSubset } from "../test-utils.js";
import { joe } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await poitimeService.createUser(joe);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });
});