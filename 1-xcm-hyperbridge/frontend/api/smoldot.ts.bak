import { startFromWorker } from "polkadot-api/smoldot/from-worker";

// 1. Initialize a variable to hold the instance
let smoldotInstance = null;

// 2. Only instantiate the Worker if we are in the browser (client-side)
if (typeof window !== "undefined") {
    const SmWorker = new Worker(
        new URL("polkadot-api/smoldot/worker", import.meta.url)
    );
    smoldotInstance = startFromWorker(SmWorker);
}

// 3. Export the instance (it will be null on the server)
export const smoldot = smoldotInstance;