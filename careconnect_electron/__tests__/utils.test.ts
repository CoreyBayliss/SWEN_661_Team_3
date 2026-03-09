import { storage } from '@/utils/storage';

describe('storage utility', () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;
  let removeItemSpy: jest.SpyInstance;

  beforeAll(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterAll(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
    removeItemSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets and parses a stored value', () => {
    getItemSpy.mockReturnValue(JSON.stringify({ enabled: true }));

    const result = storage.get('settings', { enabled: false });

    expect(getItemSpy).toHaveBeenCalledWith('settings');
    expect(result).toEqual({ enabled: true });
  });

  it('returns default value when parsing fails', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    getItemSpy.mockReturnValue('{invalid json');

    const defaultValue = { enabled: false };
    const result = storage.get('settings', defaultValue);

    expect(result).toEqual(defaultValue);
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it('sets and removes values with success status', () => {
    expect(storage.set('theme', { dark: true })).toBe(true);
    expect(setItemSpy).toHaveBeenCalledWith('theme', JSON.stringify({ dark: true }));

    expect(storage.remove('theme')).toBe(true);
    expect(removeItemSpy).toHaveBeenCalledWith('theme');
  });

  it('clears all CareConnect keys', () => {
    const success = storage.clear();

    expect(success).toBe(true);
    expect(removeItemSpy).toHaveBeenCalledWith('isAuthenticated');
    expect(removeItemSpy).toHaveBeenCalledWith('leftHandMode');
    expect(removeItemSpy).toHaveBeenCalledWith('biometricEnabled');
    expect(removeItemSpy).toHaveBeenCalledWith('onboardingComplete');
    expect(removeItemSpy).toHaveBeenCalledWith('favorites');
  });

  it('prints debug output for all tracked keys', () => {
    const groupSpy = jest.spyOn(console, 'group').mockImplementation(() => undefined);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const groupEndSpy = jest.spyOn(console, 'groupEnd').mockImplementation(() => undefined);

    storage.debug();

    expect(groupSpy).toHaveBeenCalledWith('CareConnect LocalStorage Debug');
    expect(logSpy).toHaveBeenCalledTimes(5);
    expect(groupEndSpy).toHaveBeenCalled();

    groupSpy.mockRestore();
    logSpy.mockRestore();
    groupEndSpy.mockRestore();
  });
});
