function getSomething() {
    return 'something';
}

async function testAsync() {
    return 'hello async';
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
// 把方法变成异步

// await : async wait 等待

// const result = testAsync();
// console.log(result);