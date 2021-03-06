const fs = require("fs");


//Structure to hold a node information
var Node = {
	starting: null,
	no_of_edges: null
};

////////////////////////////////////////////////////////////////////////////////
// Main Program
////////////////////////////////////////////////////////////////////////////////
function main(argc) {
	BFSGraph(argc);
}

////////////////////////////////////////////////////////////////////////////////
//Apply BFS on a Graph using CUDA
////////////////////////////////////////////////////////////////////////////////
function BFSGraph(argc) {
	var no_of_nodes = 0;
	var edge_list_size = 0;
	var input_f;
	var num_omp_threads;

	// num_omp_threads = argc.num_omp_threads;
	// input_f = argc.input_f;

	console.log("Reading File\n");
	//Read in Graph from a file
	data = fs.readFileSync(argc.filename);

	data = data.toString().split("\n");

	var source = -1;

	var line_counter = 0;
	no_of_nodes = Number(data[line_counter++]);

	// allocate host memory
	var h_graph_nodes = []; 
	var h_graph_mask_buf = new SharedArrayBuffer(no_of_nodes * Int8Array.BYTES_PER_ELEMENT)
	var h_updating_graph_mask_buf = new SharedArrayBuffer(no_of_nodes * Int8Array.BYTES_PER_ELEMENT)
	var h_graph_visited_buf = new SharedArrayBuffer(no_of_nodes * Int8Array.BYTES_PER_ELEMENT)

	var h_graph_mask = new Int8Array(h_graph_mask_buf);
	var h_updating_graph_mask = new Int8Array(h_updating_graph_mask_buf);
	var h_graph_visited = new Int8Array(h_graph_visited_buf);

	var start, edgeno;
	// initalize the memory
	for (var i = 0; i < no_of_nodes; i++) {
		var tmp_data = data[line_counter++].split(" ");
		start = Number(tmp_data[0]);
		edgeno = Number(tmp_data[1]);

		h_graph_nodes[i] = {
			starting: start,
			no_of_edges: edgeno
		};

		h_graph_mask[i] = 0;
		h_updating_graph_mask[i] = 0;
		h_graph_visited[i] = 0;
	}


	//read the source node from the file
	source = Number(data[line_counter++]);

	//set the source node as 1 in the mask
	h_graph_mask[source] = 1;
	h_graph_visited[source] = 1;

	edge_list_size = Number(data[line_counter++]);

	console.log("edge_list_size", edge_list_size)

	var _id, cost;
	var h_graph_edges_buf = new SharedArrayBuffer(edge_list_size * Int32Array.BYTES_PER_ELEMENT);
	var h_graph_edges = new Int32Array(h_graph_edges_buf);
	for (var i = 0; i < edge_list_size; i++) {
		var tmp_data = data[line_counter++].split(" ");
		_id = Number(tmp_data[0]);
		cost = Number(tmp_data[1]); // no used
		h_graph_edges[i] = _id;
	}

	// allocate mem for the result on host side
	var h_cost_buf = new SharedArrayBuffer(no_of_nodes * Int32Array.BYTES_PER_ELEMENT)
	var h_cost = new Int32Array(h_cost_buf)
	for (var i = 0; i < no_of_nodes; i++)
		h_cost[i] = -1;
	h_cost[source] = 0;

	console.log("Start traversing the tree");

	var k = 0;

	var start_time = Date.now();

	var stop_buf = new SharedArrayBuffer(1 * Int8Array.BYTES_PER_ELEMENT);
	var stop = new Int8Array(stop_buf);
	do {
		//if no thread changes this value then the loop stops
		stop[0] = 0;

		// #pragma omp parallel for 
		for (var tid = 0; tid < no_of_nodes; tid++) {
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

		// #pragma omp parallel for
		for (var tid = 0; tid < no_of_nodes; tid++) {
			if (h_updating_graph_mask[tid] == 1) {
				h_graph_mask[tid] = 1;
				h_graph_visited[tid] = 1;
				stop[0] = 1;
				h_updating_graph_mask[tid] = 0;
			}
		}
		k++;
	}
	while (stop[0]);

	var end_time = Date.now();
	console.log("Compute time:", (end_time - start_time));

	//Store the result into a file
	var result = "";
	for (var i = 0; i < no_of_nodes; i++)
		result += `${i}) cost:${h_cost[i]}\n`

	fs.writeFileSync("result.txt", result);

	console.log("Result stored in result.txt");
}

main({
	filename: "data/graph1M.txt"
});