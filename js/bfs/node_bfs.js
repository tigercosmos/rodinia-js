const fs = require("fs");


//Structure to hold a node information
var Node = {
	starting,
	no_of_edges
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

	num_omp_threads = argc.num_omp_threads;
	input_f = argc.input_f;

	printf("Reading File\n");
	//Read in Graph from a file
	data = fs.readFileSync("data.txt");
	data = data.split("\n");

	var source = 0;

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

		h_graph_nodes[i].starting = start;
		h_graph_nodes[i].no_of_edges = edgeno;
		h_graph_mask[i] = false;
		h_updating_graph_mask[i] = false;
		h_graph_visited[i] = false;
	}

	//read the source node from the file
	source = Number(data[line_counter++]);
	if (source != 0) {
		console.error("Input data wrong");
	}

	//set the source node as true in the mask
	h_graph_mask[source] = true;
	h_graph_visited[source] = true;

	edge_list_size = Number(data[line_counter++]);

	var id, cost;
	var h_graph_edges = []
	for (var i = 0; i < edge_list_size; i++) {
		var tmp_data = data[line_counter++].split(" ");
		id = Number(tmp_data[0]);
		cost = Number(tmp_data[1]); // no used
		h_graph_edges[i] = id;
	}

	// allocate mem for the result on host side
	var h_cost = new SharedArrayBuffer(no_of_nodes * Int32Array.BYTES_PER_ELEMENT)
	for (var i = 0; i < no_of_nodes; i++)
		h_cost[i] = -1;
	h_cost[source] = 0;

	console.log("Start traversing the tree");

	var k = 0;

	var start_time = Date.now();

	var stop;
	do {
		//if no thread changes this value then the loop stops
		stop = false;

		// #pragma omp parallel for 
		for (var tid = 0; tid < no_of_nodes; tid++) {
			if (h_graph_mask[tid] == true) {
				h_graph_mask[tid] = false;
				for (var i = h_graph_nodes[tid].starting; i < (h_graph_nodes[tid].no_of_edges + h_graph_nodes[tid].starting); i++) {
					var id = h_graph_edges[i];
					if (!h_graph_visited[id]) {
						h_cost[id] = h_cost[tid] + 1;
						h_updating_graph_mask[id] = true;
					}
				}
			}
		}

		// #pragma omp parallel for
		for (var tid = 0; tid < no_of_nodes; tid++) {
			if (h_updating_graph_mask[tid] == true) {
				h_graph_mask[tid] = true;
				h_graph_visited[tid] = true;
				stop = true;
				h_updating_graph_mask[tid] = false;
			}
		}
		k++;
	}
	while (stop);

	var end_time = Date.now();
	console.log("Compute time:", (end_time - start_time));

	//Store the result into a file
	FILE * fpo = fopen("result.txt", "w");
	for (int i = 0; i < no_of_nodes; i++)
	fprintf(fpo, "%d) cost:%d\n", i, h_cost[i]);
	fclose(fpo);
	printf("Result stored in result.txt\n");


	// cleanup memory
	free(h_graph_nodes);
	free(h_graph_edges);
	free(h_graph_mask);
	free(h_updating_graph_mask);
	free(h_graph_visited);
	free(h_cost);

}