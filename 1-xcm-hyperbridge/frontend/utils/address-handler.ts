import Keyring from "@polkadot/keyring"

export function encodePolkaAddress(polkaAddress?: string): string {  
	const keyring = new Keyring()  
	  
	return polkaAddress ? keyring.encodeAddress(polkaAddress, 0) : ""  
}