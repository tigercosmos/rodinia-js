const LIMIT = -999;
const BLOCK_SIZE = 16;

// Returns the current system time in microseconds 
function get_time() {
    return Date.now();
}


function maximum(a, b, c) {

    var k;
    if (a <= b)
        k = b;
    else
        k = a;

    if (k <= c)
        return (c);
    else
        return (k);
}


var blosum62 = [
    [4, -1, -2, -2, 0, -1, -1, 0, -2, -1, -1, -1, -1, -2, -1, 1, 0, -3, -2, 0, -2, -1, 0, -4],
    [-1, 5, 0, -2, -3, 1, 0, -2, 0, -3, -2, 2, -1, -3, -2, -1, -1, -3, -2, -3, -1, 0, -1, -4],
    [-2, 0, 6, 1, -3, 0, 0, 0, 1, -3, -3, 0, -2, -3, -2, 1, 0, -4, -2, -3, 3, 0, -1, -4],
    [-2, -2, 1, 6, -3, 0, 2, -1, -1, -3, -4, -1, -3, -3, -1, 0, -1, -4, -3, -3, 4, 1, -1, -4],
    [0, -3, -3, -3, 9, -3, -4, -3, -3, -1, -1, -3, -1, -2, -3, -1, -1, -2, -2, -1, -3, -3, -2, -4],
    [-1, 1, 0, 0, -3, 5, 2, -2, 0, -3, -2, 1, 0, -3, -1, 0, -1, -2, -1, -2, 0, 3, -1, -4],
    [-1, 0, 0, 2, -4, 2, 5, -2, 0, -3, -3, 1, -2, -3, -1, 0, -1, -3, -2, -2, 1, 4, -1, -4],
    [0, -2, 0, -1, -3, -2, -2, 6, -2, -4, -4, -2, -3, -3, -2, 0, -2, -2, -3, -3, -1, -2, -1, -4],
    [-2, 0, 1, -1, -3, 0, 0, -2, 8, -3, -3, -1, -2, -1, -2, -1, -2, -2, 2, -3, 0, 0, -1, -4],
    [-1, -3, -3, -3, -1, -3, -3, -4, -3, 4, 2, -3, 1, 0, -3, -2, -1, -3, -1, 3, -3, -3, -1, -4],
    [-1, -2, -3, -4, -1, -2, -3, -4, -3, 2, 4, -2, 2, 0, -3, -2, -1, -2, -1, 1, -4, -3, -1, -4],
    [-1, 2, 0, -1, -3, 1, 1, -2, -1, -3, -2, 5, -1, -3, -1, 0, -1, -3, -2, -2, 0, 1, -1, -4],
    [-1, -1, -2, -3, -1, 0, -2, -3, -2, 1, 2, -1, 5, 0, -2, -1, -1, -1, -1, 1, -3, -1, -1, -4],
    [-2, -3, -3, -3, -2, -3, -3, -3, -1, 0, 0, -3, 0, 6, -4, -2, -2, 1, 3, -1, -3, -3, -1, -4],
    [-1, -2, -2, -1, -3, -1, -1, -2, -2, -3, -3, -1, -2, -4, 7, -1, -1, -4, -3, -2, -2, -1, -2, -4],
    [1, -1, 1, 0, -1, 0, 0, 0, -1, -2, -2, 0, -1, -2, -1, 4, 1, -3, -2, -2, 0, 0, 0, -4],
    [0, -1, 0, -1, -1, -1, -1, -2, -2, -1, -1, -1, -1, -2, -1, 1, 5, -2, -2, 0, -1, -1, 0, -4],
    [-3, -3, -4, -4, -2, -2, -3, -2, -2, -3, -2, -3, -1, 1, -4, -3, -2, 11, 2, -3, -4, -3, -2, -4],
    [-2, -2, -2, -3, -2, -1, -2, -3, 2, -1, -1, -2, -1, 3, -3, -2, -2, 2, 7, -1, -3, -2, -1, -4],
    [0, -3, -3, -3, -1, -2, -2, -3, -3, 3, 1, -2, 1, -1, -2, -2, 0, -3, -1, 4, -3, -2, -1, -4],
    [-2, -1, 3, 4, -3, 0, 1, -1, 0, -3, -4, 0, -3, -3, -2, 0, -1, -4, -3, -3, 4, 1, -1, -4],
    [-1, 0, 0, 1, -3, 3, 4, -2, 0, -3, -3, 1, -1, -3, -1, 0, -1, -3, -2, -2, 1, 4, -1, -4],
    [0, -1, -1, -1, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -2, 0, 0, -2, -1, -1, -1, -1, -1, -4],
    [-4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, 1]
];

////////////////////////////////////////////////////////////////////////////////
// Program main
////////////////////////////////////////////////////////////////////////////////
function main(argc, argv) {
    runTest(argc, argv);

    console.log("success!");
}

main();


function nw_optimized(input_itemsets, output_itemsets, referrence, max_rows, max_cols, penalty) {
    for (var blk = 1; blk <= (max_cols - 1) / BLOCK_SIZE; blk++) {

        // #pragma omp parallel for schedule(static) shared(input_itemsets, referrence) firstprivate(blk, max_rows, max_cols, penalty)

        for (var b_index_x = 0; b_index_x < blk; ++b_index_x) {
            var b_index_y = blk - 1 - b_index_x;
            var input_itemsets_l = [];
            var reference_l = [];

            // Copy referrence to local memory
            for (var i = 0; i < BLOCK_SIZE; ++i) {
                // #pragma omp simd
                for (var j = 0; j < BLOCK_SIZE; ++j) {
                    reference_l[i * BLOCK_SIZE + j] = referrence[max_cols * (b_index_y * BLOCK_SIZE + i + 1) + b_index_x * BLOCK_SIZE + j + 1];
                }
            }

            // Copy input_itemsets to local memory
            for (var i = 0; i < BLOCK_SIZE + 1; ++i) {
                // #pragma omp simd
                for (var j = 0; j < BLOCK_SIZE + 1; ++j) {
                    input_itemsets_l[i * (BLOCK_SIZE + 1) + j] = input_itemsets[max_cols * (b_index_y * BLOCK_SIZE + i) + b_index_x * BLOCK_SIZE + j];
                }
            }

            // Compute
            for (var i = 1; i < BLOCK_SIZE + 1; ++i) {
                for (var j = 1; j < BLOCK_SIZE + 1; ++j) {
                    input_itemsets_l[i * (BLOCK_SIZE + 1) + j] = maximum(input_itemsets_l[(i - 1) * (BLOCK_SIZE + 1) + j - 1] + reference_l[(i - 1) * BLOCK_SIZE + j - 1],
                        input_itemsets_l[i * (BLOCK_SIZE + 1) + j - 1] - penalty,
                        input_itemsets_l[(i - 1) * (BLOCK_SIZE + 1) + j] - penalty);
                }
            }

            // Copy results to global memory
            for (var i = 0; i < BLOCK_SIZE; ++i) {
                // #pragma omp simd
                for (var j = 0; j < BLOCK_SIZE; ++j) {
                    input_itemsets[max_cols * (b_index_y * BLOCK_SIZE + i + 1) + b_index_x * BLOCK_SIZE + j + 1] = input_itemsets_l[(i + 1) * (BLOCK_SIZE + 1) + j + 1];
                }
            }

        }
    }

    console.log("Processing bottom-right matrix\n");

    for (var blk = 2; blk <= (max_cols - 1) / BLOCK_SIZE; blk++) {
        // #pragma omp parallel for schedule(static) shared(input_itemsets, referrence) firstprivate(blk, max_rows, max_cols, penalty)
        for (var b_index_x = blk - 1; b_index_x < (max_cols - 1) / BLOCK_SIZE; ++b_index_x) {
            var b_index_y = (max_cols - 1) / BLOCK_SIZE + blk - 2 - b_index_x;

            var input_itemsets_l = [];
            var reference_l = [];

            // Copy referrence to local memory
            for (var i = 0; i < BLOCK_SIZE; ++i) {
                // #pragma omp simd
                for (var j = 0; j < BLOCK_SIZE; ++j) {
                    reference_l[i * BLOCK_SIZE + j] = referrence[max_cols * (b_index_y * BLOCK_SIZE + i + 1) + b_index_x * BLOCK_SIZE + j + 1];
                }
            }

            // Copy input_itemsets to local memory
            for (var i = 0; i < BLOCK_SIZE + 1; ++i) {
                // #pragma omp simd
                for (var j = 0; j < BLOCK_SIZE + 1; ++j) {
                    input_itemsets_l[i * (BLOCK_SIZE + 1) + j] = input_itemsets[max_cols * (b_index_y * BLOCK_SIZE + i) + b_index_x * BLOCK_SIZE + j];
                }
            }

            // Compute
            for (var i = 1; i < BLOCK_SIZE + 1; ++i) {
                for (var j = 1; j < BLOCK_SIZE + 1; ++j) {
                    input_itemsets_l[i * (BLOCK_SIZE + 1) + j] = maximum(input_itemsets_l[(i - 1) * (BLOCK_SIZE + 1) + j - 1] + reference_l[(i - 1) * BLOCK_SIZE + j - 1],
                        input_itemsets_l[i * (BLOCK_SIZE + 1) + j - 1] - penalty,
                        input_itemsets_l[(i - 1) * (BLOCK_SIZE + 1) + j] - penalty);
                }
            }

            // Copy results to global memory
            for (var i = 0; i < BLOCK_SIZE; ++i) {
                // #pragma omp simd
                for (var j = 0; j < BLOCK_SIZE; ++j) {
                    input_itemsets[max_cols * (b_index_y * BLOCK_SIZE + i + 1) + b_index_x * BLOCK_SIZE + j + 1] = input_itemsets_l[(i + 1) * (BLOCK_SIZE + 1) + j + 1];
                }
            }
        }
    }

}

////////////////////////////////////////////////////////////////////////////////
//! Run a simple test for CUDA
////////////////////////////////////////////////////////////////////////////////
function runTest(argc, argv) {
    var max_rows, max_cols, penalty;
    var input_itemsets, output_itemsets, referrence;

    var omp_num_threads;


    // the lengths of the two sequences should be able to divided by 16.
    // And at current stage  max_rows needs to equal max_cols
    max_rows = 2048;
    max_cols = 2048;
    penalty = 100;
    omp_num_threads = 4;


    max_rows = max_rows + 1;
    max_cols = max_cols + 1;
    referrence = [];
    input_itemsets = [];
    output_itemsets = [];

    for (var i = 0; i < max_cols; i++) {
        for (var j = 0; j < max_rows; j++) {
            input_itemsets[i * max_cols + j] = 0;
        }
    }

    console.log("Start Needleman-Wunsch\n");

    for (var i = 1; i < max_rows; i++) { //please define your own sequence. 
        input_itemsets[i * max_cols] = Math.floor(Math.random() * 1000) % 10 + 1;
    }
    for (var j = 1; j < max_cols; j++) { //please define your own sequence.
        input_itemsets[j] = Math.floor(Math.random() * 1000) % 10 + 1;
    }


    for (var i = 1; i < max_cols; i++) {
        for (var j = 1; j < max_rows; j++) {
            referrence[i * max_cols + j] = blosum62[input_itemsets[i * max_cols]][input_itemsets[j]];
        }
    }

    for (var i = 1; i < max_rows; i++)
        input_itemsets[i * max_cols] = -i * penalty;
    for (var j = 1; j < max_cols; j++)
        input_itemsets[j] = -j * penalty;



    //Compute top-left matrix 
    console.log("Num of threads:", omp_num_threads);
    console.log("Processing top-left matrix");

    var start_time = get_time();

    nw_optimized(input_itemsets, output_itemsets, referrence,
        max_rows, max_cols, penalty);

    var end_time = get_time();

    console.log("Total time:", end_time - start_time);
}