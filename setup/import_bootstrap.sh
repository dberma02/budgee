#!/bin/bash

# Imports bootstrap stylesheets.
content=$(wget https://bootswatch.com/cosmo/bootstrap.min.css -q -O -)
echo $content >> ../client/node_modules/bootstrap/dist/css/bootstrap-cosmo.min.css
