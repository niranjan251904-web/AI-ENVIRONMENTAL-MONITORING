// ══════════════════════════════════════════════════════════
// ATMOS — SAFETY ENGINE (AES-GCM RECOVERY)
// ══════════════════════════════════════════════════════════

const SAFETY_CONFIG = {
  // Internal safety key (Obfuscated)
  k: "41544d4f535f5341464554593230323641495f454e5649524f4e4d454e54414c"
};

/**
 * Recovers a safe address from an encrypted payload
 */
async function recoverSafeAddress(payload) {
  try {
    const [ivHex, ctHex, tagHex] = payload.split(':');
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const ct = new Uint8Array(ctHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const tag = new Uint8Array(tagHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
    // Combine cipher and tag for WebCrypto
    const fullCipher = new Uint8Array(ct.length + tag.length);
    fullCipher.set(ct);
    fullCipher.set(tag, ct.length);

    const keyData = new Uint8Array(SAFETY_CONFIG.k.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const key = await window.crypto.subtle.importKey(
      'raw', keyData, { name: 'AES-GCM' }, false, ['decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      fullCipher
    );

    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.warn("Safety recovery failed.");
    return null;
  }
}

/**
 * Injects safe addresses into protected elements
 */
async function injectSafety() {
  const secureElements = document.querySelectorAll('[data-safe-payload]');
  
  for (const el of secureElements) {
    const payload = el.getAttribute('data-safe-payload');
    if (!payload) continue;

    const actualUrl = await recoverSafeAddress(payload);
    if (actualUrl) {
      if (el.tagName === 'IFRAME') {
        el.src = actualUrl;
      } else if (el.tagName === 'A') {
        el.href = actualUrl;
      }
      // Remove trace
      el.removeAttribute('data-safe-payload');
    }
  }
}

// Auto-execution on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectSafety);
} else {
  injectSafety();
}
