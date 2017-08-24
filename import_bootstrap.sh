#!/bin/bash

# Sets up bootstrap formatting. This script requires homebrew to be installed.

brew install wget
content=$(wget https://bootswatch.com/cosmo/bootstrap.min.css -q -O -)
echo $content >> ./node_modules/bootstrap/dist/css/bootstrap-cosmo.min.css
