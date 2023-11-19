const { describe, it, before, after } = require('mocha');
const { assert } = require('chai');
const { Builder } = require('selenium-webdriver');
const FlipkartPage = require('./models/flipkartPage');

describe('Flipkart Test', function () {
    let driver;
    let flipkartPage;
    this.timeout(200000);
    // Setup before running the tests
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        flipkartPage = new FlipkartPage(driver);

    });

    // Cleanup after running the tests
    after(async function () {
        await driver.quit();
    });

    it('should navigate to the home page and search for Samsung Galaxy S10', async function () {

        // Navigate to the home page
        await flipkartPage.navigateToHomePage();

        // Search for Samsung Galaxy S10
        await flipkartPage.searchForProduct('Samsung Galaxy S10');

        // Filter by Mobiles
        await flipkartPage.filterByCategory('Mobiles');

        // Click on Samsung checkbox
        await flipkartPage.clickCheckbox("(//div[@title='SAMSUNG']/descendant::input[@type='checkbox']/following-sibling::div)[1]");

        // Click on Flipkart assured checkbox
        await flipkartPage.clickCheckbox("//div[@class='_24_Dny _3tCU7L']");

        // Click on sort by price high to low
        await flipkartPage.clickSortOption('Price -- High to Low');

        // Get product details
        let products = await flipkartPage.getProductDetails();

        // Print product details
        for (const product of products) {
            console.log(product);
        }
    });
});
