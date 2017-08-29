<?php

error_reporting(0);

if(!file_exists("Public/cachefile")) {
    exec("gulp run");
}

include "index.html";