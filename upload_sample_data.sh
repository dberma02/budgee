#!/bin/bash

curl -v POST http://localhost:3000/api/transactions -d @sample_data.json --header "Content-Type: application/json"
