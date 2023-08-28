<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $post;

    public function __construct()
    {
        $this->post = new Post();
    }
    //
    function index()
    {
        echo '<h2> Query Eloquent Model </h2>';
        $this->post->LearnORMQuery();
    }

    public function add()
    {
        $dataInsert = [
            'title' => " Lorem ipsum dolor sit",
            "content" => "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, consequatur?",
        ];
        $this->post->LearnORMQuery($dataInsert);
    }
}
