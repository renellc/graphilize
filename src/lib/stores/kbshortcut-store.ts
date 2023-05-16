import { writable } from "svelte/store";

const createKeyboardshortcutStore = () => {
  const keyboardShortcutStore = writable({
    lastActiveShortcut: {
      keyComb: "",
      codeComb: "",
    },
    shortcuts: new Map<string, { onPressDown: () => void, onPressRelease?: () => void }>(),
  });
  const { subscribe, update } = keyboardShortcutStore;

  let keysActiveKey: Set<string> = new Set();
  let keysActiveCode: Set<string> = new Set();

  function handleKeyDown(event: KeyboardEvent) {
    if (event.repeat) {
      return;
    }

    keysActiveKey.add(event.key);
    keysActiveCode.add(event.code);
    update((store) => {
      const keyComb = Array.from(keysActiveKey).sort().join("+");
      const codeComb = Array.from(keysActiveCode).sort().join("+");

      if (store.shortcuts.has(keyComb)) {
        store.shortcuts.get(keyComb).onPressDown();
        store.lastActiveShortcut.keyComb = keyComb;
      } else if (store.shortcuts.has(codeComb)) {
        store.shortcuts.get(codeComb).onPressDown();
        store.lastActiveShortcut.codeComb = codeComb;
      }

      return store;
    });
  }

  function handleKeyUp(event: KeyboardEvent) {
    keysActiveKey.delete(event.key);
    keysActiveCode.delete(event.code);
    update((prev) => {
      const store = { ...prev, lastActiveShortcut: { ...prev.lastActiveShortcut } };
      const keyComb = Array.from(keysActiveKey).sort().join("+");
      const codeComb = Array.from(keysActiveCode).sort().join("+");

      if (
        keyComb !== store.lastActiveShortcut.keyComb &&
        store.shortcuts.has(store.lastActiveShortcut.keyComb)
      ) {
        const onPressRelease = store.shortcuts.get(store.lastActiveShortcut.keyComb).onPressRelease
        onPressRelease && onPressRelease();
      } else if (
        codeComb !== store.lastActiveShortcut.codeComb &&
        store.shortcuts.has(store.lastActiveShortcut.codeComb)
      ) {
        const onPressRelease = store.shortcuts.get(store.lastActiveShortcut.codeComb).onPressRelease
        onPressRelease && onPressRelease();
      }

      store.lastActiveShortcut.keyComb = keyComb;
      store.lastActiveShortcut.codeComb = codeComb;
      return store;
    });
  }

  return {
    subscribe,
    initialize() {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    },
    destroy() {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    },
    registerShortcuts(shortcuts: {
      shortcut: string[],
      onPressDown: () => void,
      onPressRelease?: () => void,
    }[]) {
      update((prev) => {
        const store = { ...prev, shortcuts: new Map(prev.shortcuts) };
        for (const shortcut of shortcuts) {
          store.shortcuts.set(shortcut.shortcut.sort().join("+"), {
            onPressDown: shortcut.onPressDown,
            onPressRelease: shortcut.onPressRelease,
          });
        }
        return store;
      });
    }
  };
};

export const KeyboardShortcutStore = createKeyboardshortcutStore();
