import * as smoldot from 'smoldot/worker';
import { compileBytecode } from 'smoldot/bytecode';

compileBytecode().then((bytecode) => {
    self.postMessage(bytecode);
});

self.onmessage = (event) => {
    if (event.data instanceof MessagePort) {
        smoldot.run(event.data);
    }
};