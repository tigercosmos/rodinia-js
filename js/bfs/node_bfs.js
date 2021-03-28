const fs = require("fs");


//Structure to hold a node information
var Node = {
	starting,
	no_of_edges
};

////////////////////////////////////////////////////////////////////////////////
// Main Program
////////////////////////////////////////////////////////////////////////////////
function main( argc) {
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

	no_of_nodes = Number(data[0]);

	// allocate host memory
	var h_graph_nodes = [];
	var h_graph_mask_buf =  new SharedArrayBuffer(no_of_nodes * Int8Array.BYTES_PER_ELEMENT)
	var h_updating_graph_mask_buf = new SharedArrayBuffer(no_of_nodes * Int8Array.BYTES_PER_ELEMENT)
	var h_graph_visited_buf =  new SharedArrayBuffer(no_of_nodes * Int8Array.BYTES_PER_ELEMENT)

	var h_graph_mask =  new Int8Array(h_graph_mask_buf);
	var h_updating_graph_mask =  new Int8Array(h_updating_graph_mask_buf);
	var h_graph_visited =  new Int8Array(h_graph_visited_buf);

	var start, edgeno;
	// initalize the memory
	for ( var i = 0; i < no_of_nodes; i++) {
		var tmp_data = data[i+1].split(" ");
		start = tmp_data[0];
		edgeno = tmp_data[1];

		h_graph_nodes[i].starting = start;
		h_graph_nodes[i].no_of_edges = edgeno;
		h_graph_mask[i] = false;
		h_updating_graph_mask[i] = false;
		h_graph_visited[i] = false;
	}

	//read the source node from the file
	fscanf(fp, "%d", & source);
	// source=0; //tesing code line

	//set the source node as true in the mask
	h_graph_mask[source] = true;
	h_graph_visited[source] = true;

	fscanf(fp, "%d", & edge_list_size);

	var id, cost;
	var * h_graph_edges = (var * ) malloc(sizeof(int) * edge_list_size);
	for (var i = 0; i < edge_list_size; i++) {
		fscanf(fp, "%d", & id);
		fscanf(fp, "%d", & cost);
		h_graph_edges[i] = id;
	}

	if (fp)
		fclose(fp);


	// allocate mem for the result on host side
	var * h_cost = (var * ) malloc(sizeof(int) * no_of_nodes);
	for (var i = 0; i < no_of_nodes; i++)
		h_cost[i] = -1;
	h_cost[source] = 0;

	printf("Start traversing the tree\n");

	var k = 0;#
	ifdef OPEN
	double start_time = omp_get_wtime();#
	ifdef OMP_OFFLOAD# pragma omp target data map(to: no_of_nodes, h_graph_mask[0: no_of_nodes], h_graph_nodes[0: no_of_nodes], h_graph_edges[0: edge_list_size], h_graph_visited[0: no_of_nodes], h_updating_graph_mask[0: no_of_nodes]) map(h_cost[0: no_of_nodes]) {
		#
		endif# endif
		bool stop;
		do {
			//if no thread changes this value then the loop stops
			stop = false;

			#
			ifdef OPEN
			//omp_set_num_threads(num_omp_threads);
			# ifdef OMP_OFFLOAD# pragma omp target# endif# pragma omp parallel
			for# endif
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

			#
			ifdef OPEN# ifdef OMP_OFFLOAD# pragma omp target map(stop)# endif# pragma omp parallel
			for# endif
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
		while (stop);#
		ifdef OPEN
		double end_time = omp_get_wtime();
		printf("Compute time: %lf\n", (end_time - start_time));#
		ifdef OMP_OFFLOAD
	}#
	endif# endif
	//Store the result into a file
	FILE * fpo = fopen("result.txt", "w");
	for (var i = 0; i < no_of_nodes; i++)
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