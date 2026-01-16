/**
 * SIGPASS - WebAuthn-based wallet storage
 */

import { mnemonicToAccount } from 'viem/accounts'
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

async function createOrThrow(name: string, data: Uint8Array) {
    try {
        const credential = await navigator.credentials.create({
            publicKey: {
                challenge: new Uint8Array([117, 61, 252, 231, 191, 241]),
                rp: {
                    id: location.hostname,
                    name: location.hostname,
                },
                user: {
                    id: data as BufferSource,
                    name: name,
                    displayName: name,
                },
                pubKeyCredParams: [
                    { type: "public-key", alg: -7 },
                    { type: "public-key", alg: -8 },
                    { type: "public-key", alg: -257 },
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    residentKey: "required",
                    requireResidentKey: true,
                },
            },
        });
        return new Uint8Array((credential as any).rawId);
    } catch (error: unknown) {
        console.error('WebAuthn creation failed:', error);
        return null;
    }
}

async function getOrThrow(id: Uint8Array) {
    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array([117, 61, 252, 231, 191, 241]),
                allowCredentials: [{ type: "public-key", id: id as BufferSource }],
            },
        });
        return new Uint8Array((credential as any).response.userHandle);
    } catch (error: unknown) {
        console.error('WebAuthn get failed:', error);
        return null;
    }
}

function checkBrowserWebAuthnSupport(): boolean {
    if (!navigator.credentials) {
        return false;
    }
    return true;
}

async function createSigpassWallet(name: string) {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const handle = await createOrThrow(name, bytes);
    if (!handle) {
        return null;
    }
    const cache = await caches.open("sigpass-storage");
    const request = new Request("sigpass");
    const response = new Response(handle);
    await cache.put(request, response);
    localStorage.setItem("SIGPASS_STATUS", "TRUE");

    if (handle) {
        return handle;
    } else {
        return null;
    }
}

async function checkSigpassWallet() {
    const status: string | null = localStorage.getItem("SIGPASS_STATUS");
    if (status) {
        return true;
    } else {
        return false;
    }
}

async function getSigpassWallet() {
    const cache = await caches.open("sigpass-storage");
    const request = new Request("sigpass");
    const response = await cache.match(request);
    const handle = response
        ? new Uint8Array(await response.arrayBuffer())
        : new Uint8Array();
    const bytes = await getOrThrow(handle);
    if (!bytes) {
        return null;
    }
    const mnemonicPhrase = bip39.entropyToMnemonic(bytes, wordlist);
    if (mnemonicPhrase) {
        const evmAccount = mnemonicToAccount(mnemonicPhrase, {
            accountIndex: 0,
            addressIndex: 0,
        });
        return evmAccount;
    } else {
        return null;
    }
}

export { createOrThrow, getOrThrow, checkBrowserWebAuthnSupport, createSigpassWallet, getSigpassWallet, checkSigpassWallet };
