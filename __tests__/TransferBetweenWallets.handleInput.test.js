describe('handleInput', () => {
    let setAmountMock;
  
    beforeEach(() => {
      // Mock setAmount function
      setAmountMock = jest.fn();
    });
  
    const allowedChars = /^[+]?[0-9]*(\.[0-9]*)?$/;
  
    function handleInput(input) {
      if (allowedChars.test(input)) {
        setAmountMock(input);
      }
    }
  
    test('updates amount for valid numeric input', () => {
      handleInput('123');
      expect(setAmountMock).toHaveBeenCalledWith('123');
  
      handleInput('45.67');
      expect(setAmountMock).toHaveBeenCalledWith('45.67');
  
      handleInput('.');
      expect(setAmountMock).toHaveBeenCalledWith('.');
      
      handleInput('+');
      expect(setAmountMock).toHaveBeenCalledWith('+');
    });
  
    test('does not update amount for invalid input', () => {
      handleInput('abc');
      expect(setAmountMock).not.toHaveBeenCalled();
  
      handleInput('12abc34');
      expect(setAmountMock).not.toHaveBeenCalled();
  
      handleInput('12@34');
      expect(setAmountMock).not.toHaveBeenCalled();
      
      
      handleInput('12..34');
      expect(setAmountMock).not.toHaveBeenCalled();
    });
  
    test('handles empty string input', () => {
      handleInput('');
      expect(setAmountMock).toHaveBeenCalledWith('');
    });
  });
  