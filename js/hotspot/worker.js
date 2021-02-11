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


function job() {
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