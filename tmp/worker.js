console.log("new a worker")
addEventListener('message', function (e) {
        console.log("data", e.data)
        let arr2 = new Float64Array(e.data.arr[2]);
        arr2[3] = 5;
        postMessage("done")
});
