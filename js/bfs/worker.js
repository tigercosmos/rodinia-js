"use strict"

var no_of_nodes, h_graph_mask, h_graph_nodes, h_graph_edges,
    h_graph_visited, h_cost, h_updating_graph_mask, stop, thread_num, chunk;

addEventListener('message', function (e) {
    const data = e.data;

    if (data.msg == "start") {
        no_of_nodes = data.no_of_nodes;
        h_graph_nodes = data.h_graph_nodes;
        thread_num = data.thread_num;

        chunk = (no_of_nodes / thread_num) | 0;

        h_graph_mask = new Int8Array(data.h_graph_mask_buf);
        h_graph_edges = new Int32Array(data.h_graph_edges_buf);
        h_graph_visited = new Int8Array(data.h_graph_visited_buf);
        h_cost = new Int32Array(data.h_cost_buf);
        h_updating_graph_mask = new Int8Array(data.h_updating_graph_mask_buf);
        stop = new Int8Array(data.stop_buf);
        postMessage("done");

    } else if (data.msg == "func1") {
        const first_time = (new Date()).getTime();

        func1(no_of_nodes, h_graph_mask, h_graph_nodes, h_graph_edges, h_graph_visited, h_cost, h_updating_graph_mask, data.thread_id);

        const last_time = (new Date()).getTime();
        console.log("job1 takes time:", last_time - first_time, "ms");

        postMessage("done1");

    } else if (data.msg == "func2") {
        const first_time = (new Date()).getTime();

        func2(no_of_nodes, h_updating_graph_mask, h_graph_mask, h_graph_visited, stop, data.thread_id);

        const last_time = (new Date()).getTime();
        console.log("job2 takes time:", last_time - first_time, "ms");

        postMessage("done2");

    }

});

function func1(no_of_nodes, h_graph_mask, h_graph_nodes, h_graph_edges, h_graph_visited, h_cost, h_updating_graph_mask, thread_id) {

    const start = thread_id * chunk;
    const end = thread_id == thread_num - 1 ? no_of_nodes : (thread_id + 1) * chunk;

    for (var tid = start; tid < end; tid++) {
        if (h_graph_mask[tid] == 1) {
            h_graph_mask[tid] = 0;
            for (var i = h_graph_nodes[tid].starting; i < (h_graph_nodes[tid].no_of_edges + h_graph_nodes[tid].starting); i++) {
                var id = h_graph_edges[i];
                if (!h_graph_visited[id]) {
                    h_cost[id] = h_cost[tid] + 1;
                    h_updating_graph_mask[id] = 1;
                }
            }
        }
    }
}


function func2(no_of_nodes, h_updating_graph_mask, h_graph_mask, h_graph_visited, stop, thread_id) {
    const start = thread_id * chunk;
    const end = thread_id == thread_num - 1 ? no_of_nodes : (thread_id + 1) * chunk;

    for (var tid = start; tid < end; tid++) {
        if (h_updating_graph_mask[tid] == 1) {
            h_graph_mask[tid] = 1;
            h_graph_visited[tid] = 1;
            stop[0] = 1;
            h_updating_graph_mask[tid] = 0;
        }
    }
}