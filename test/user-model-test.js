import { assert } from "chai";
import { db } from "../src/models/db.js";

suite("User API tests", () => {

  const joebloggs = {
    firstName: "Joe",
    lastName: "Bloggs",
    email: "joebloggs@gmail.com",
    password: "joebloggs",
  };

  setup(async () => {
    db.init();
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(joebloggs);
    assert.deepEqual(joebloggs, newUser)
  });
});