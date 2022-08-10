
describe('EditableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer

        //ничего страшного что page подчёркивается

        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-story&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

