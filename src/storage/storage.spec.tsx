import { getUserFromStorage, removeUserFromStorage, saveUserInStorage } from "./userStorage";

describe('Storage/Auth', () => {
  it('should be set and get token on storage', async () => {
    await saveUserInStorage({
      access_token: 'token-to-test',
    })

    const token = await getUserFromStorage();
    expect(token).toBeTruthy();
  });

  it('should be remove token from storage', async () => {
    await saveUserInStorage({
      access_token: 'token-to-test',
    });

    await removeUserFromStorage();

    const token = await getUserFromStorage();
    expect(token).toBeNull();
  });
})