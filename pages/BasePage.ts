import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { removeAdsScript } from '../utils/hideAds';

export class BasePage {
    readonly page: Page;
    readonly accessibilityTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = '/') {
        await this.page.route('**/*', route => {
            const url = route.request().url();
            if (
                url.includes('ads') ||
                url.includes('doubleclick') ||
                url.includes('googlesyndication') ||
                url.includes('adservice') ||
                url.includes('shopee')
            ) {
                return route.abort();
            }
            return route.continue();
        });

        await this.page.goto(path, { waitUntil: 'load' });
        await this.page.evaluate(() => {
            const removeAds = () => {
                const selectors = [
                    'iframe[src*="ads"]',
                    'iframe[id^="aswift"]',
                    'ins.adsbygoogle',
                    'div[id^="google_ads_iframe"]',
                    'img[src*="shopee"]',
                ];
                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => el.remove());
                });
            };
            removeAds();
            const observer = new MutationObserver(removeAds);
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }


    async checkAccessibility(pageName: string) {
        const accessibilityScanResults = await new AxeBuilder({ page: this.page })
            .withTags(this.accessibilityTags)
            .exclude('#subscribe')
            .exclude('a[href$="contact_us"]')
            .exclude('.btn-primary')
            .exclude('#susbscribe_email')
            .exclude('form > p')
            .exclude('#cbb')
            .exclude('a[href="/"][style="color: orange;"]')
            .exclude('.active.item > .col-sm-6:nth-child(1) > h1')
            .exclude('.active.item > .col-sm-6:nth-child(1) > h1 > span')
            .exclude('button.btn-success')
            .exclude('div.productinfo.text-center > h2')
            .analyze();

        if (accessibilityScanResults.violations.length > 0) {
            console.warn(`Accessibility violations found on ${pageName}:`);
            accessibilityScanResults.violations.forEach(violation => {
                console.warn(`  - [${violation.impact?.toUpperCase()}] ${violation.help} (${violation.id})`);
                console.warn(`    Nodes: ${violation.nodes.map(node => node.target.join(', ')).join('; ')}`);
                console.warn(`    More info: ${violation.helpUrl}`);
            });
        } else {
            console.log(`No accessibility violations found on ${pageName}.`);
        }
    }
}