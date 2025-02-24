describe('CreateReward UI Test', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should open the reward modal', async () => {
      await expect(element(by.id('rewardModal'))).toBeVisible();
    });
  
    it('should allow entering a price and quantity', async () => {
      await element(by.id('priceInput')).typeText('100');
      await element(by.id('quantityInput')).typeText('2');
      await expect(element(by.id('priceInput'))).toHaveText('100');
      await expect(element(by.id('quantityInput'))).toHaveText('2');
    });
  
    it('should submit the reward form', async () => {
      await element(by.id('addRewardButton')).tap();
      await expect(element(by.id('rewardModal'))).not.toBeVisible();
    });
  });
  