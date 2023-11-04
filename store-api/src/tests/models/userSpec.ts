import { User, UserStore } from "../../models/users";

const store = new UserStore();

const _user: User = {
  id: 0,
  fisrtname: "test",
  lastname: "test",
  username: "test",
  password_digest: "test",
};

describe("User models", () => {
  it("create method should add a user", async () => {
    const result = await store.create(_user as User);
    expect(result).toBeTruthy();
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(typeof result[0]).toBe(typeof _user);
  });

  it("show method should return a user object", async () => {
    const newUser = await store.create(_user as User);
    const result = await store.show(newUser.id);
    expect(result?.username).toBe(newUser.username);
  });

  it("authenticate method should return a user object", async () => {
    const result = await store.authenticate(
      _user.username,
      _user.password_digest,
    );
    expect(result?.username).toBe(_user.username);
  });
});
