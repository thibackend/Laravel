<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // quy ước tên table:
    /*
      Tên Model: Post =>table :posts
      Tên Model: ProductCategory: product_categories
     */
    protected $table = 'posts';

    // quy ước khóa chính. mặc định laravel sẽ lấy field id làm khóa chính.

    //trong trường hợp muốn khai báo một id với khác thì chúng ta có thể dùng thuộc tính id.

    // -- cấu hình primary key;
    protected $primaryKey = 'id'; // dùng thuộc tính này để có thể làm thay đổi khóa chính trong laravel
    // thay vào đó những tìm kiếm thì sẽ được thông qua trường đó trong bảng.
    // ví dụ; Post::find(..)  thì lúc này trong find(); này sẽ là tìm kiếm dựa theo status tức status hiện tại là khóa chính để các truy vấn tìm kiếm được.


    // --------------------------------
    public $incrementing = false; // incrementing phải đặt là public

    protected $keyType = 'string';

    // incrementing và keyType dùng để khi mà chúng ta muốn chuyển kiểu tự động tăng cho khóa chính thì cho incrementing là true và chuyển keyType là int.
    // và nếu không làm vậy thì sẽ có trường hợp không tự động thêm được.


    // -- cấu hình timestamp
    // laravel ngầm hiểu table sẽ có sẳn 2 trường created_at và updated_at
    // nếu mà không muốn thì chúng ta có thể thêm trường timestamp = false ; vào để vô hiệu hóa nó.

    public $timestamps = true; // chúng ta phải khai báo nó là public.

    // khi ta chèn dữ liệu thì tự động laravel sẽ chèn cho chúng ta hai trường created_at và updated_at 
    // nếu nếu mà chúng ta muốn bỏ hai trường đó đi thì chúng ta hãy cho attribute là timestamp = false;

    //nếu muốn thay hai tên trường created_at và updated_at thì chúng ta thực hiện dùng hằng số để thay đổi.
    // và khi bật timestamp lên thì nó cũng không bị lỗi.

    const CREATED_AT = 'them_ngay';
    const UPDATED_AT = 'cap_nhat_ngay';
    // nhưng bạn phải chắc chắn rằng bên database của bạn phải có hai trường
    // them_ngay và cap_nhat_ngay để thay và bù vào trường mặc định là created_at và updated_at.



    // -- Đặt giá trị mặc định cho trường trong bảng.

    protected $attributes = [
        'status' => 0 // khi đặt giá trị như này thì khi chèn vào thì nó sẽ là giá trị mặc định mà mình chèn vào này.

    ];


    protected $fillable = [
        'title', 'content', 'status'
    ];


    public function LearnORMQuery($dataPost = [])
    {

        // ----------------- select -----------
        // $posts = Post::all();
        // $activePosts = $posts->reject(function ($posts) {
        //     return $posts->status == 0;
        // });
        // // đây là một trong những phương thức trong colection reject là loại bỏ đi những trường hợp không muốn ra.
        // dd($activePosts);


        // -- chunk

        // Post::chunk(2, function ($posts) {
        //     foreach ($posts as $post) :
        //         echo $post->title . "<br>";
        //     endforeach;
        //     echo "End chunk.__ <br>";
        // });
        // dùng khi lấy các dữ liệu lớn.
        // khi dùng chunk như này và bỏ giá trị vào là 2 thì nó sẽ 
        // chỉ lấy một lần 2 giá trị rồi chạy vòng foreach và cứ thế lặp lại cho đến khi nó hết dữ liệu trong database.

        // -- cursor 

        // $allPost = Post::where('status', 1)->cursor();
        // //  cái này cũng dùng khi lấy các dữ liệu lớn
        // foreach ($allPost as $item) :
        //     echo $item->content;
        // endforeach;


        // ----------------- insert ---------------
        // $dataSave =   Post::create($dataPost);
        // $insertStatus = Post::insert($dataPost); // đối với query builder thì status nó sẽ không làm theo như model đã config.
        // // status sẽ không có default value.
        // // tao_ngay và sua_ngay sẽ không được chạy luôn.
        // // với ORM query thì nó sẽ kết nối trực tiếp đến model và làm việc thông qua model


        // $arr = [
        //     $dataSave,
        //     $insertStatus
        // ];
        // dd($arr);

        // ---- firstOrCreate() method

        // $post = Post::firstOrCreate(
        //     [
        //         'id' => 3  // kiếm nếu id đã tồn tại thì thực hiện show ra
        //         // nếu id này không tồn tại trong bảng thì sẽ thực hiện tạo mới.
        //     ],
        //     $dataPost
        // );
        // dd($post->title);


        // ---- save method;

        $post = new Post();
        $post->title = $dataPost["title"];
        $post->content = $dataPost["content"];
        // điều tiện ích trong đây là chúng ta có thể sữ dụng các điều kiện
        // trước khi thực hiện chèn.
        $post->status = $dataPost["status"] = 1;
        $post->save();
    }
}
