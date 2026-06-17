

const STORAGE_KEY = "audioType";

// 1. Load saved value when popup opens
document.addEventListener("DOMContentLoaded", async () => {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  const savedValue = result[STORAGE_KEY] || "off";

  // set checked radio
  const radios = document.querySelectorAll('input[name="audioType"]');
  radios.forEach(radio => {
    radio.checked = (radio.value === savedValue);
  });
});

// 2. Save value on change
document.querySelectorAll('input[name="audioType"]').forEach(radio => {
  radio.addEventListener("change", async (e) => {
    if (e.target.checked) {
      await chrome.storage.sync.set({
        [STORAGE_KEY]: e.target.value
      });
    }
  });
});