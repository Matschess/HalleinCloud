<?php

error_reporting(0);

if(!file_exists("Web/cachefile")) {
    exec("gulp build");
}

include "Web/index.html";