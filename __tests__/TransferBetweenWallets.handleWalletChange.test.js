describe('handleWalletChange', () => {
  let setPrimaryWalletMock;
  let primaryWallet;

  beforeEach(() => {
    // Mock setPrimaryWallet function
    setPrimaryWalletMock = jest.fn();

    // Define the function under test
    function handleWalletChange() {
      if (primaryWallet === 'wallet') {
        setPrimaryWalletMock('bankWallet');
      } else {
        setPrimaryWalletMock('wallet');
      }
    }

    // Make handleWalletChange available in tests
    global.handleWalletChange = handleWalletChange;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('sets primary wallet to "bankWallet" when current wallet is "wallet"', () => {
    primaryWallet = 'wallet';
    handleWalletChange();
    expect(setPrimaryWalletMock).toHaveBeenCalledWith('bankWallet');
  });

  test('sets primary wallet to "wallet" when current wallet is "bankWallet"', () => {
    primaryWallet = 'bankWallet';
    handleWalletChange();
    expect(setPrimaryWalletMock).toHaveBeenCalledWith('wallet');
  });

  test('sets primary wallet to "wallet" when current wallet is undefined', () => {
    primaryWallet = undefined;
    handleWalletChange();
    expect(setPrimaryWalletMock).toHaveBeenCalledWith('wallet');
  });
});
