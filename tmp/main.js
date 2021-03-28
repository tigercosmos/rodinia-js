addEventListener('message', function (e) {
    const data = e.data;
    if (data.msg == "start") {
        main();

    }
});

function main() {

    const worker = new Worker("worker.js");

    let arr = [];
    arr[0] = new SharedArrayBuffer(10 * Float64Array.BYTES_PER_ELEMENT);
    arr[1] = new SharedArrayBuffer(10 * Float64Array.BYTES_PER_ELEMENT);
    arr[2] = new SharedArrayBuffer(10 * Float64Array.BYTES_PER_ELEMENT);

    console.log("first", arr)

    worker.postMessage({
        arr: arr
    });

    worker.onmessage = e => {
        if (e.data == "done") {

            console.log("after", arr)

            let arr2 = new Float64Array(arr[2]);
            console.log("after", arr2)


            postMessage({
                msg: "finished"
            });
        }
    };

}