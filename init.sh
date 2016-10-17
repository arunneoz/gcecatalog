#!/bin/sh
export DATABASE_SERVICE_NAME='local'
export local_SERVICE_HOST='localhost'
export local_SERVICE_PORT=27017
export MONGODB_DATABASE='pharmacyApp'
export MONGODB_USER='pharma'
export MONGODB_PASSWORD='pharma'
export PRESCRIBERSVC='http://prescriber-datagrid.172.16.177.135.xip.io/rest/prescribercache/'
export PRESCRIPTIONRULESSVC='http://drugsvc-digitalpharmacy.172.16.177.135.xip.io/DrugUtilizationReviewSvc-1.0.0/api/validatePrescription' 
