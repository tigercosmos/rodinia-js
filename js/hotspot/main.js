addEventListener('message', function (e) {
    const data = e.data;
    if (data.msg == "start") {
        main({
            grid_rows: 1000,
            grid_cols: 1000,
            sim_time: 2,

        });
        postMessage({
            msg: "finished"
        });
    }
});

// Returns the current system time in microseconds 
function get_time() {
    return Date.now();
}


var BLOCK_SIZE = 16
var BLOCK_SIZE_C = BLOCK_SIZE
var BLOCK_SIZE_R = BLOCK_SIZE

var STR_SIZE = 256

/* maximum power density possible (say 300W for a 10mm x 10mm chip)	*/
var MAX_PD = 3.0e6
/* required precision in degrees	*/
var PRECISION = 0.001
var SPEC_HEAT_SI = 1.75e6
var K_SI = 100
/* capacitance fitting factor	*/
var FACTOR_CHIP = 0.5

//var NUM_THREAD 4

/* chip parameters	*/
const t_chip = 0.0005;
const chip_height = 0.016;
const chip_width = 0.016;

/* ambient temperature, assuming no package at all	*/
const amb_temp = 80.0;

var num_omp_threads;

/* Single iteration of the transient solver in the grid model.
 * advances the solution of the discretized difference equations 
 * by one time step
 */
function single_iteration(result, temp, power, row, col,
    Cap_1, Rx_1, Ry_1, Rz_1,
    step) {
    var delta;
    var r, c;
    var chunk;
    var num_chunk = row * col / (BLOCK_SIZE_R * BLOCK_SIZE_C);
    var chunks_in_row = col / BLOCK_SIZE_C;
    var chunks_in_col = row / BLOCK_SIZE_R;


    // #pragma omp parallel for shared(power, temp, result) private(chunk, r, c, delta) firstprivate(row, col, num_chunk, chunks_in_row) schedule(static)

    for (chunk = 0; chunk < num_chunk; ++chunk) {
        var r_start = BLOCK_SIZE_R * (chunk / chunks_in_col);
        var c_start = BLOCK_SIZE_C * (chunk % chunks_in_row);
        var r_end = r_start + BLOCK_SIZE_R > row ? row : r_start + BLOCK_SIZE_R;
        var c_end = c_start + BLOCK_SIZE_C > col ? col : c_start + BLOCK_SIZE_C;

        if (r_start == 0 || c_start == 0 || r_end == row || c_end == col) {
            for (r = r_start; r < r_start + BLOCK_SIZE_R; ++r) {
                for (c = c_start; c < c_start + BLOCK_SIZE_C; ++c) {
                    /* Corner 1 */
                    if ((r == 0) && (c == 0)) {
                        delta = (Cap_1) * (power[0] +
                            (temp[1] - temp[0]) * Rx_1 +
                            (temp[col] - temp[0]) * Ry_1 +
                            (amb_temp - temp[0]) * Rz_1);
                    } /* Corner 2 */
                    else if ((r == 0) && (c == col - 1)) {
                        delta = (Cap_1) * (power[c] +
                            (temp[c - 1] - temp[c]) * Rx_1 +
                            (temp[c + col] - temp[c]) * Ry_1 +
                            (amb_temp - temp[c]) * Rz_1);
                    } /* Corner 3 */
                    else if ((r == row - 1) && (c == col - 1)) {
                        delta = (Cap_1) * (power[r * col + c] +
                            (temp[r * col + c - 1] - temp[r * col + c]) * Rx_1 +
                            (temp[(r - 1) * col + c] - temp[r * col + c]) * Ry_1 +
                            (amb_temp - temp[r * col + c]) * Rz_1);
                    } /* Corner 4	*/
                    else if ((r == row - 1) && (c == 0)) {
                        delta = (Cap_1) * (power[r * col] +
                            (temp[r * col + 1] - temp[r * col]) * Rx_1 +
                            (temp[(r - 1) * col] - temp[r * col]) * Ry_1 +
                            (amb_temp - temp[r * col]) * Rz_1);
                    } /* Edge 1 */
                    else if (r == 0) {
                        delta = (Cap_1) * (power[c] +
                            (temp[c + 1] + temp[c - 1] - 2.0 * temp[c]) * Rx_1 +
                            (temp[col + c] - temp[c]) * Ry_1 +
                            (amb_temp - temp[c]) * Rz_1);
                    } /* Edge 2 */
                    else if (c == col - 1) {
                        delta = (Cap_1) * (power[r * col + c] +
                            (temp[(r + 1) * col + c] + temp[(r - 1) * col + c] - 2.0 * temp[r * col + c]) *
                            Ry_1 +
                            (temp[r * col + c - 1] - temp[r * col + c]) * Rx_1 +
                            (amb_temp - temp[r * col + c]) * Rz_1);
                    } /* Edge 3 */
                    else if (r == row - 1) {
                        delta = (Cap_1) * (power[r * col + c] +
                            (temp[r * col + c + 1] + temp[r * col + c - 1] - 2.0 * temp[r * col + c]) * Rx_1 +
                            (temp[(r - 1) * col + c] - temp[r * col + c]) * Ry_1 +
                            (amb_temp - temp[r * col + c]) * Rz_1);
                    } /* Edge 4 */
                    else if (c == 0) {
                        delta = (Cap_1) * (power[r * col] +
                            (temp[(r + 1) * col] + temp[(r - 1) * col] - 2.0 * temp[r * col]) * Ry_1 +
                            (temp[r * col + 1] - temp[r * col]) * Rx_1 +
                            (amb_temp - temp[r * col]) * Rz_1);
                    }
                    result[r * col + c] = temp[r * col + c] + delta;
                }
            }
            continue;
        }

        for (r = r_start; r < r_start + BLOCK_SIZE_R; ++r) {
            // #pragma omp simd        
            for (c = c_start; c < c_start + BLOCK_SIZE_C; ++c) {
                /* Update Temperatures */
                result[r * col + c] = temp[r * col + c] +
                    (Cap_1 * (power[r * col + c] +
                        (temp[(r + 1) * col + c] + temp[(r - 1) * col + c] - 2.0 * temp[r * col + c]) * Ry_1 +
                        (temp[r * col + c + 1] + temp[r * col + c - 1] - 2.0 * temp[r * col + c]) * Rx_1 +
                        (amb_temp - temp[r * col + c]) * Rz_1));
            }
        }
    }
}


/* Transient solver driver routine: simply converts the heat 
 * transfer differential equations to difference equations 
 * and solves the difference equations by iterating
 */
function compute_tran_temp(result, num_iterations, temp, power, row, col) {

    var i = 0;


    var grid_height = chip_height / row;
    var grid_width = chip_width / col;

    var Cap = FACTOR_CHIP * SPEC_HEAT_SI * t_chip * grid_width * grid_height;
    var Rx = grid_width / (2.0 * K_SI * t_chip * grid_height);
    var Ry = grid_height / (2.0 * K_SI * t_chip * grid_width);
    var Rz = t_chip / (K_SI * grid_height * grid_width);

    var max_slope = MAX_PD / (FACTOR_CHIP * t_chip * SPEC_HEAT_SI);
    var step = PRECISION / max_slope / 1000.0;

    var Rx_1 = 1.0 / Rx;
    var Ry_1 = 1.0 / Ry;
    var Rz_1 = 1.0 / Rz;
    var Cap_1 = step / Cap;

    console.log(`total iterations: ${num_iterations}\tstep size: ${step}`);
    console.log(`Rx: ${Rx}\tRy: ${Ry}\tRz: ${Rz}\tCap: ${Cap}`);


    {
        var r = result;
        var t = temp;
        for (var i = 0; i < num_iterations; i++) {

            console.log("iteration", i);

            single_iteration(r, t, power, row, col, Cap_1, Rx_1, Ry_1, Rz_1, step);
            var tmp = t;
            t = r;
            r = tmp;
        }
    }

    console.log(`iteration ${i++}`);

}

function writeoutput(vect, grid_rows, grid_cols) {

    var i, j, index = 0;

    for (i = 0; i < grid_rows; i++)
        for (j = 0; j < grid_cols; j++) {
            console.log(index, vect[i * grid_cols + j]);
            index++;
        }
}

function read_temp(vect, grid_rows, grid_cols) {
    for (var i = 0; i < grid_rows * grid_cols; i++) {
        vect[i] = 320 + Math.random() * 10;
    }
}

function read_power(vect, grid_rows, grid_cols) {
    for (var i = 0; i < grid_rows * grid_cols; i++) {
        vect[i] = 0.002048 + Math.random() / 1000;
    }
}

function main(args) {
    var grid_rows, grid_cols, sim_time, i;
    var temp, power, result;

    /*  PARAMETERS	*/

    grid_rows = args.grid_rows;
    grid_cols = args.grid_cols;
    sim_time = args.sim_time;


    /* allocate memory for the temperature and power arrays	*/
    temp = new SharedArrayBuffer(grid_rows * grid_cols * Float64Array.BYTES_PER_ELEMENT);
    power = new SharedArrayBuffer(grid_rows * grid_cols * Float64Array.BYTES_PER_ELEMENT);
    result = new SharedArrayBuffer(grid_rows * grid_cols * Float64Array.BYTES_PER_ELEMENT);

    /* read initial temperatures and input power	*/
    read_temp(temp, grid_rows, grid_cols);
    read_power(power, grid_rows, grid_cols);

    console.log("Start computing the transient temperature");

    var start_time = get_time();

    compute_tran_temp(result, sim_time, temp, power, grid_rows, grid_cols);

    var end_time = get_time();

    console.log("Ending simulation");
    console.log(`Total time: ${end_time - start_time} seconds`);

    /* output results	*/
    // writeoutput((1 & sim_time) ? result : temp, grid_rows, grid_cols);

    console.log("Finished.");

    return 0;
}