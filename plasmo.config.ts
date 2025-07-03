import { defineManifestConfig } from "plasmo/dist"

export default defineManifestConfig({
    contentScripts: {
        leetcode: {
            matches: ["https://leetcode.com/problems/*"]
        }
    }
})