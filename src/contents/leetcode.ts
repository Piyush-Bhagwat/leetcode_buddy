import type { PlasmoContentScript } from "plasmo"

// Only run on LeetCode problem pages
export const config: PlasmoContentScript = {
    matches: ["https://leetcode.com/problems/*"]
}

// Ensure it's a module so Plasmo includes it
export { }

function getTitleFromURL(): string {
    const slug = window.location.pathname.split("/")[2] || ""
    return slug
        .replace(/-/g, " ")                    // dash to space
        .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize each word
}

// Your alert/test code
// alert("LeetCode content script loaded!")
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "getDescription") {
        const descElem = document.querySelector("div[data-track-load='description_content']")
        const description = descElem?.textContent?.trim() || ""
        sendResponse(description)
    }

    if (req.type == "getTitle") {
        const title = getTitleFromURL() || ""
        sendResponse(title);
    }
    return true;
});

