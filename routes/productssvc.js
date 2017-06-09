var express = require('express');
var router = express.Router();
var projectId = 'arunneo-test';

router.get('/api/getProducts/:productname', function(req, res,next) {

  console.log("Received Request for product Search "+ req.params.productname);

var sqlQuery= "SELECT cf.column.name as Name ,cf.column.cell.value as Value FROM product_catalog.pcatalog  where cf.column.name='name' and cf.column.cell.value like '%" + req.params.productname + "%' LIMIT 10;"

const BigQuery = require('@google-cloud/bigquery');

// The project ID to use, e.g. "your-project-id"
// const projectId = "your-project-id";

// Instantiates a client
const bigquery = BigQuery({
  projectId: projectId
});

// Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
const options = {
  query: sqlQuery,
  timeoutMs: 10000, // Time out after 10 seconds.
  useLegacySql: true // Use standard SQL syntax for queries.
};

var productCatalog = {
  products : []
};

// Runs the query
bigquery
  .query(options)
  .then((results) => {
    const rows = results[0];
    var jsonData = {};
    console.log('Rows:');
    rows.forEach( function(row) {
      //console.log(row);
      jsonData=row ;
      productCatalog.products.push(jsonData);
    });
    console.log(JSON.stringify(productCatalog));
    res.json(productCatalog);
    productCatalog.products.empty();
  })
  .catch((err) => {
    console.error('ERROR:', err);
    return res.status(500).json({
          err: 'Failed to Fetch from Big Table'
        });
  });


});



module.exports = router;
