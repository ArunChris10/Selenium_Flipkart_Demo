const { By, Key, until } = require('selenium-webdriver');

class FlipkartPage {
    constructor(driver) {
        this.driver = driver;

    }

    async navigateToHomePage() {
        await this.driver.get('https://www.flipkart.com');
        await this.driver.wait(until.titleIs('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!'), 5000);
    }

    async searchForProduct(productName) {
        let searchInput = await this.driver.findElement(By.name('q'));
        await searchInput.sendKeys(productName, Key.RETURN);
        await this.driver.wait(until.titleIs(`${productName}- Buy Products Online at Best Price in India - All Categories | Flipkart.com`), 5000);
    }

    async filterByCategory(category) {
        await this.driver.findElement(By.linkText(category)).click();
        await this.driver.wait(until.titleIs(`Mobile Price List | Compare Mobiles on Buy Online @ Flipkart.`), 5000);
    }

    async clickCheckbox(checkboxXPath) {
        await this.driver.findElement(By.xpath(checkboxXPath)).click();
        await this.driver.sleep(2000);
    }

    async clickSortOption(sortOption) {
        await this.driver.findElement(By.xpath(`//div[text()='${sortOption}']`)).click();
        await this.driver.sleep(2000);
    }

    async getProductDetails() {
        let productNames = await this.driver.findElements(By.xpath("//div[@class='_4rR01T']"));
        let productPrices = await this.driver.findElements(By.xpath("//div[@class='_30jeq3 _1_WHN1']"));
        let productUrls = await this.driver.findElements(By.xpath("//a[@class='_1fQZEK']"));

        let products = [];

        if (productNames.length === productPrices.length && productNames.length === productUrls.length) {
            for (let i = 0; i < productNames.length; i++) {
                let name = await productNames[i].getText();
                let price = await productPrices[i].getText();
                let url = await productUrls[i].getAttribute("href");
                products.push({ serialNum: i + 1, productName: name, productPrice: price, productUrl: url });
            }
        }

        return products;
    }
}

module.exports = FlipkartPage;
