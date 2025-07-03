
function getDescription() {
    return new Promise<string>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id!,
                { type: "getDescription" },
                (response) => resolve(response)
            )
        })
    })
}

function getTitle() {
    return new Promise<string>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id!,
                { type: "getTitle" },
                (response) => resolve(response)
            )
        })
    })
}

export { getDescription, getTitle }