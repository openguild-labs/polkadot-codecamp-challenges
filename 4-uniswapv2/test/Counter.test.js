const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Counter', function () {
    let counter
    let owner
    let addr1

    beforeEach(async function () {
        ;[owner, addr1] = await ethers.getSigners()
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy(0)
    })

    describe('Deployment', function () {
        it('Should set the right owner', async function () {
            expect(await counter.owner()).to.equal(owner.address)
        })

        it('Should initialize with the correct count', async function () {
            expect(await counter.getCount()).to.equal(0)
        })

        it('Should initialize with custom count', async function () {
            const Counter = await ethers.getContractFactory('Counter')
            const customCounter = await Counter.deploy(10)
            expect(await customCounter.getCount()).to.equal(10)
        })
    })

    describe('Increment', function () {
        it('Should increment the counter', async function () {
            await counter.increment()
            expect(await counter.getCount()).to.equal(1)
        })

        it('Should increment multiple times', async function () {
            await counter.increment()
            await counter.increment()
            await counter.increment()
            expect(await counter.getCount()).to.equal(3)
        })

        it('Should emit CountIncremented event', async function () {
            await expect(counter.increment()).to.emit(counter, 'CountIncremented').withArgs(1)
        })
    })

    describe('Decrement', function () {
        it('Should decrement the counter', async function () {
            await counter.increment()
            await counter.increment()
            await counter.decrement()
            expect(await counter.getCount()).to.equal(1)
        })

        it('Should revert when decrementing below zero', async function () {
            await expect(counter.decrement()).to.be.revertedWith(
                'Counter: cannot decrement below zero'
            )
        })

        it('Should emit CountDecremented event', async function () {
            await counter.increment()
            await expect(counter.decrement()).to.emit(counter, 'CountDecremented').withArgs(0)
        })
    })

    describe('Reset', function () {
        it('Should reset the counter to zero', async function () {
            await counter.increment()
            await counter.increment()
            await counter.reset()
            expect(await counter.getCount()).to.equal(0)
        })

        it('Should only allow owner to reset', async function () {
            await expect(counter.connect(addr1).reset()).to.be.revertedWith(
                'Counter: only owner can reset'
            )
        })

        it('Should emit CountReset event', async function () {
            await counter.increment()
            await expect(counter.reset()).to.emit(counter, 'CountReset').withArgs(0)
        })
    })
})
