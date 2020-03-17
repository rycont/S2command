import Notabase from "notabase";
import { ShortcutsT } from "../types";
const nb = new Notabase();

const input = document.getElementById("db") as HTMLInputElement;
input.addEventListener("change", () =>
  chrome.storage.sync.set({ dbUri: input.value })
);
(async () => {
  const { dbUri } = (await new Promise(resolve =>
    chrome.storage.sync.get(resolve)
  )) as { dbUri: string };
  input.value = dbUri
  const shortcuts = (await nb.fetch(dbUri)).rows;

  const data: ShortcutsT = {};

  shortcuts.forEach(shortcut => {
    const {
      Key: key,
      Action: action,
      URI: [uri]
    } = shortcut;
    if (!data[uri]) data[uri] = {};
    data[uri][key] = action;
  });
  chrome.storage.sync.set({
    shortcuts: JSON.stringify(data)
  });
})();
