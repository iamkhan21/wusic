globalThis.Audio = jest.fn().mockImplementation(() => {
  return {
    pause: jest.fn(),
    play: jest.fn(),
  };
});
