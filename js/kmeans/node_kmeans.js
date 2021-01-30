main();


/*---< main() >-------------------------------------------------------------*/
function main() {
    var nclusters = 5;
    var attributes = [];
    var cluster_centres = null;
    var i, j;

    var numAttributes;
    var numObjects;
    var nloops = 1;
    var threshold = 0.001;
    var timing;


    numAttributes = numObjects = 0;

    numObjects = 10;
    numAttributes = 34;

    console.log("I/O completed\n");

    // for(var i = 0 ; i < numObjects; i++) {
    attributes[0] = "1 0 273 18347 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0.00 0.00 0.00 0.00 1.00 0.00 0.00 2 255 1.00 0.00 0.50 0.03 0.00 0.00 0.00 0.00".split(" ");
    attributes[1] = "1 0 270 3557 0 0 0 0 0 0 0 0 0 0 0 0 12 12 0.00 0.00 0.00 0.00 1.00 0.00 0.00 12 255 1.00 0.00 0.08 0.03 0.00 0.00 0.00 0.00".split(" ");
    attributes[2] = "1 0 296 9308 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0.00 0.00 0.00 0.00 1.00 0.00 0.00 22 255 1.00 0.00 0.05 0.03 0.00 0.00 0.00 0.00".split(" ");
    attributes[3] = "1 0 302 4776 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0.00 0.00 0.00 0.00 1.00 0.00 0.00 32 255 1.00 0.00 0.03 0.02 0.00 0.00 0.00 0.00".split(" ");
    attributes[4] = "1 0 248 6196 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0.00 0.00 0.00 0.00 1.00 0.00 0.00 42 255 1.00 0.00 0.02 0.02 0.00 0.00 0.00 0.00".split(" ");
    attributes[5] = "1 0 73 1847 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0.00 0.00 0.00 0.00 1.00 0.00 0.00 2 255 1.00 0.00 0.50 0.03 0.00 0.00 0.00 0.00".split(" ");
    attributes[6] = "1 0 20 357 0 0 0 0 0 0 0 0 0 0 0 0 12 12 0.00 0.00 0.00 0.00 1.00 0.00 0.00 12 255 1.00 0.00 0.08 0.03 0.00 0.00 0.00 0.00".split(" ");
    attributes[7] = "1 0 26 308 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0.00 0.00 0.00 0.00 1.00 0.00 0.00 22 255 1.00 0.00 0.05 0.03 0.00 0.00 0.00 0.00".split(" ");
    attributes[8] = "1 0 32 476 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0.00 0.00 0.00 0.00 1.00 0.00 0.00 32 255 1.00 0.00 0.03 0.02 0.00 0.00 0.00 0.00".split(" ");
    attributes[9] = "1 0 48 196 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0.00 0.00 0.00 0.00 1.00 0.00 0.00 42 255 1.00 0.00 0.02 0.02 0.00 0.00 0.00 0.00".split(" ");
    // }



    timing = Date.now();
    for (i = 0; i < nloops; i++) {

        cluster_centres = cluster(numObjects,
            numAttributes,
            attributes, /* [numObjects][numAttributes] */
            nclusters,
            threshold,
        );

    }
    timing = Date.now() - timing;


    console.log("number of Clusters:", nclusters);
    console.log("number of Attributes:", numAttributes);

    console.log("Time for process:", timing);

    return (0);
}

const RANDOM_MAX = 2147483647;


/*---< cluster() >-----------------------------------------------------------*/
function cluster(numObjects, /* number of input objects */
    numAttributes, /* size of attribute of each object */
    attributes, /* [numObjects][numAttributes] */
    nclusters,
    threshold, /* in:   */
) {
    var membership;
    var tmp_cluster_centres;

    membership = [];

    /* perform regular Kmeans */
    tmp_cluster_centres = kmeans_clustering(attributes,
        numAttributes,
        numObjects,
        nclusters,
        threshold,
        membership);

    return tmp_cluster_centres; /*out: [best_nclusters][numAttributes] */
}

function find_nearest_point(pt, /* [nfeatures] */
    nfeatures,
    pts, /* [npts][nfeatures] */
    npts) {
    var index, i;
    var min_dist = 3.40282347e+38;

    /* find the cluster center id with min distance to pt */
    for (i = 0; i < npts; i++) {
        var dist;
        dist = euclid_dist_2(pt, pts[i], nfeatures); /* no need square root */
        if (dist < min_dist) {
            min_dist = dist;
            index = i;
        }
    }
    return (index);
}

/*----< euclid_dist_2() >----------------------------------------------------*/
/* multi-dimensional spatial Euclid distance square */
function euclid_dist_2(pt1, pt2, numdims) {
    let i;
    let ans = 0.0;

    for (i = 0; i < numdims; i++)
        ans += (pt1[i] - pt2[i]) * (pt1[i] - pt2[i]);

    return (ans);
}


/*----< kmeans_clustering() >---------------------------------------------*/
function kmeans_clustering(feature, /* in: [npoints][nfeatures] */
    nfeatures,
    npoints,
    nclusters,
    threshold,
    membership) /* out: [npoints] */ {

    var i, j, k, n = 0,
        index, loop = 0;
    var new_centers_len; /* [nclusters]: no. of points in each cluster */
    var new_centers; /* [nclusters][nfeatures] */
    var clusters; /* out: [nclusters][nfeatures] */
    var delta;

    var timing;

    var nthreads;
    var partial_new_centers_len;
    var partial_new_centers;

    nthreads = 1;

    /* allocate space for returning variable clusters[] */
    clusters = [];
    clusters[0] = [];
    for (i = 1; i < nclusters; i++)
        clusters[i] = clusters[i - 1] + nfeatures;

    /* randomly pick cluster centers */
    for (i = 0; i < nclusters; i++) {
        //n = (var)rand() % npoints;
        for (j = 0; j < nfeatures; j++)
            clusters[i][j] = feature[n][j];
        n++;
    }

    for (i = 0; i < npoints; i++)
        membership[i] = -1;

    /* need to initialize new_centers_len and new_centers[0] to all 0 */
    new_centers_len = [];

    new_centers = [];
    for ( i = 0; i < nfeatures; i ++)
        new_centers[i] = [];
    for (i = 1; i < nclusters; i++)
        new_centers[i] = new_centers[i - 1] + nfeatures;


    partial_new_centers_len = [];
    for ( i = 0; i < nclusters; i ++)
        partial_new_centers_len[i] = [];
    for (i = 1; i < nthreads; i++)
        partial_new_centers_len[i] = partial_new_centers_len[i - 1] + nclusters;

    partial_new_centers = [];
    for ( i = 0; i < nclusters; i ++)
        partial_new_centers[i] = [];
    for (i = 1; i < nthreads; i++)
        partial_new_centers[i] = partial_new_centers[i - 1] + nclusters;

    for (i = 0; i < nthreads; i++) {
        for (j = 0; j < nclusters; j++)
            partial_new_centers[i][j] = [];
    }

    console.log("num of threads =", nthreads);

    do {
        delta = 0.0;
        // #pragma omp parallel \
        // shared(feature,clusters,membership,partial_new_centers,partial_new_centers_len)
        {

            var tid = 0; // TODO
            // #pragma omp for \
            //             private(i,j,index) \
            //             firstprivate(npoints,nclusters,nfeatures) \
            //             schedule(static) \
            //             reduction(+:delta)
            for (i = 0; i < npoints; i++) {
                /* find the index of nestest cluster centers */
                index = find_nearest_point(feature[i],
                    nfeatures,
                    clusters,
                    nclusters);
                /* if membership changes, increase delta by 1 */
                if (membership[i] != index) delta += 1.0;

                /* assign the membership to object i */
                membership[i] = index;

                /* update new cluster centers : sum of all objects located within */
                partial_new_centers_len[tid][index]++;
                for (j = 0; j < nfeatures; j++)
                    partial_new_centers[tid][index][j] += feature[i][j];
            }
        } /* end of #pragma omp parallel */

        /* let the main thread perform the array reduction */
        for (i = 0; i < nclusters; i++) {
            for (j = 0; j < nthreads; j++) {
                new_centers_len[i] += partial_new_centers_len[j][i];
                partial_new_centers_len[j][i] = 0.0;
                for (k = 0; k < nfeatures; k++) {
                    new_centers[i][k] += partial_new_centers[j][i][k];
                    partial_new_centers[j][i][k] = 0.0;
                }
            }
        }

        /* replace old cluster centers with new_centers */
        for (i = 0; i < nclusters; i++) {
            for (j = 0; j < nfeatures; j++) {
                if (new_centers_len[i] > 0)
                    clusters[i][j] = new_centers[i][j] / new_centers_len[i];
                new_centers[i][j] = 0.0; /* set back to 0 */
            }
            new_centers_len[i] = 0; /* set back to 0 */
        }

    }
    while (delta > threshold && loop++ < 500);


    return clusters;
}