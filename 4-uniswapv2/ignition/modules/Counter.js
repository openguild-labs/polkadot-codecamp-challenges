const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')

module.exports = buildModule('CounterModule', (m) => {
    const initialCount = m.getParameter('initialCount', 0)

    const counter = m.contract('Counter', [initialCount])

    return { counter }
})
