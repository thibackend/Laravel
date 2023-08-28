<?php

use App\Models\Groups;

if (!function_exists('env')) {
    function env()
    {
        //Xử lý hàm env()
    }
}

if (!function_exists('getAllGroups')) {
    function getAllGroups()
    {
        $group = new Groups();
        return $group->getAll();
    }
}
