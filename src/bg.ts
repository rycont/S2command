import { ShortcutsT } from "./types"
import hotkeys from 'hotkeys-js';

chrome.storage.sync.get('shortcuts', ({shortcuts: rawShortcuts}) => {
    const shortcuts: ShortcutsT = JSON.parse(rawShortcuts)
    Object.keys(shortcuts).filter(uri => RegExp(uri).test(location.href)).forEach(uri => {
        Object.keys(shortcuts[uri]).forEach(key => {
            hotkeys(key, (event) => eval(shortcuts[uri][key]))
        })
    })
})