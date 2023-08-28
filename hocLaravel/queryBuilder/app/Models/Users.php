<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
use PhpParser\Node\Expr\FuncCall;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';

    // day la nhung raw query;

    public function getAllUsers($filter, $keywords, $sortArr, $perPage = null)
    {
        // $users = DB::select('SELECT * FROM users ORDER BY created_at DESC');
        DB::enableQueryLog();

        $users = DB::table($this->table)
            ->select('users.*', 'groups.name as group_name')
            ->leftJoin('groups', 'users.group_id', '=',  'groups.id')
            ->where('trash', 0);

        if (!empty($sortArr['sortBy'])) :
            $users = $users->orderBy($sortArr['sortBy'], $sortArr['sortType']);
        else :
            $users = $users->orderBy('created_at', 'desc');
        endif;
        if (!empty($filter)) {
            $users = $users->where($filter);
        }
        if (!empty($keywords)) :
            $users = $users->where(
                function ($query) use ($keywords) {
                    $query->orWhere('fullname', 'like', "%$keywords%");
                    $query->orWhere('email', 'like', "%$keywords%");
                }
            );
        endif;


        if (!empty($perPage)) {
            $users = $users->paginate($perPage); // $perpage bang ghi tren mot trang.
            $users = $users->appends(request()->query());
        } else {
            $users = $users->get();
        }
        $query = DB::getQueryLog();
        // dd($query);
        // dd($users);
        return $users;
    }

    public function addUser($datauser)
    {
        // DB::insert('INSERT into users (fullname,email,created_at) values (?, ?,?)', $datauser);
        DB::table($this->table)->insert(
            $datauser
        );
    }


    public function getDetail($id)
    {
        $userDetail = DB::select('SELECT * FROM users WHERE id = ?', [$id]);
        return $userDetail;
    }

    public function updateUser($data, $id)
    {
        // $data[] = $id;
        // return DB::update('UPDATE ' . $this->table . ' SET fullname= ?, email = ?, update_at=? WHERE id =?', $data);
        return DB::table($this->table)->where('id', $id)->update($data);
    }

    public function Del(string $id)
    {
        // return DB::delete('DELETE FROM ' . $this->table . ' WHERE id = ?', [$id]);
        return DB::table($this->table)->where('id', $id)->delete();
    }

    public function statementUser($sql)
    {
        return DB::statement($sql);
        // chung ta se dung nay dde thuc hien tat ca cac truy van;
        // vi du: SELECT * FROM users ;
        // Drop table users;
        // noi chung no co the thuc hien cac cau lenh truy van;
    }

    // query builder;

    public function learnQueryBuilderSelect()
    {
        // $user = DB::table($this->table)


        // _________SELECT _______________
        // lay du lieu tat ca nguoi dung;
        //lay tat ca ban ghi cua table;
        // return DB::table($this->table)->get(); // cai nay se tra ra mot mang

        // lay mot ban ghi dau tien cua table 

        //->first();  // cai nay tra ra mot std class la phai dung nhu phuong thuc chi doi tuong;

        //     ->select('fullname as ten', 'email as EMAIL')  // chung ta co the dat dinh danh cho no bang tu khoa 'as'
        //     // select phai dat truoc get va first;
        //     // -->> get and first la phai cuooi cung;
        //     // table la phai dat datua tien;
        //     ->get(); // lenh nay chi dinh ca truong muon lay ra;


        // _________________ WHERE ____________________________

        // ->select('*')
        // // ->where('id','>=',10)
        // // ->where('id','<>',10)  // <> hoac != bieu tuong nay la 'khac' q '<>' as 'khac' 10; 
        // // ->where('id','<=',10)  // condition lon hon hoac bang 10 thi lay;
        // ->where('id','<=',10)

        // ---- ket hop AND VS OR___ 

        // //_________ AND _______
        // ->select('*')
        // // ->where('id','>=', 10)
        // // ->where('id','> 10') // truong hop nay la AND
        // ->where([
        //     [
        //         'id', '>=',11
        //     ],
        //     [
        //         'id','<=',12
        //     ]
        // ])  // chung ta co the dung mang de so sanh AND;
        // // === OR ==== 
        // // ->where('id',12)
        // // ->orWhere('id',13)
        // ->get(); // bang la truong hop default; khong can bo cung duoc;



        // ________________ DEBUG CÂU LỆNH SQL_____________________

        // ->where('id', 12)
        // ->orWhere('id', 13)
        // ->toSql();

        // khi lệnh cuối trỏ đến câu lênh toSQL() thì nó sẽ thực hiện show ra các truy vấn đó theo kiểu dễ nhìn như sql;
        // SHOW ra :  "select * from `users` where `id` = ? or `id` = ?";


        // cách khác -------------------------

        // DB::enableQueryLog();
        // $id = 13; 
        // // câu lệnh này sẽ bọc query của mình và khi
        // // getQueryLog thì chúng ta sẽ thấy các câu lệnh truy vấn đó.
        // $user = DB::table($this->table)
        //     ->where('id', 12)
        //     ->orWhere('id', 13)
        //     ->get();
        // $sql = DB::getQueryLog();

        // dd($sql);
        /**
         * kết qua
         * array:1 [▼ // app\Models\Users.php:127
         *   0 => array:3 [▼
         *   "query" => "select * from `users` where `id` = ? or `id` = ?"
         *   "bindings" => array:2 [▼
         *     0 => 12 đây là tham trị truyền vào.
         *     1 => 13  đây là tham trị truyền vào.
         * 
         *   ]
    
         *   "time" => 9.3
         * ]
         *]
         */

        // _____Trường hợp các điều kiện phức tạp hơn____ 
        //  -----------------------------------------------------------------

        // ->where('id',18)->get();

        //     ->where('id', 12)
        //     ->where(function ($query) use ($id) { // thực hiện dùng id truyền vào;
        //         $query->where('id', '<', $id);
        //     })
        //     ->get();
        // $sql = DB::getQueryLog();
        // dd($sql);





        // ______________ TÌM KIẾM ___________________

        // $keyword = 'thi.a24';
        DB::enableQueryLog();
        $user = DB::table($this->table)
            ->select('*')
            // ->where('email', 'like', '%'.$keyword.'%')  // truy vấn like
            // "select * from `users` where `email` like ?" ->sql

            // --whereBetween --
            // ->whereBetween('id',[10,12])  // truy vấn lấy theo khoảng. 
            // select * from `users` where `id` between ? and ? ->sql


            // --- whereIn --
            // ->whereIn('id' , [12, 13])

            // "query" => "select * from `users` where `id` in (?, ?)"
            // "bindings" => array:2 [▼
            // 0 => 12
            // 1 => 13
            // ]

            // -- whereNotBetween() ____-----
            // ->whereNotBetween('id',[12,13])
            // "query" => "select * from `users` where `id` not between ? and ?"


            // --- whereNotIn ----
            // ->whereNotIn('id',[12,13])
            //  "query" => "select * from `users` where `id` not in (?, ?)";


            // --- whereNull() -------
            // ->whereNull('update_at')
            // "query" => "select * from `users` where `update_at` is null"


            // ------- Và ở đây cung có nhiều hàm nữa khác chúng ta có thể dung where_ xong tìm kiếm hàm mà mình muốn dùng là được.
            // như là whereNotNull, 
            // ->whereFullText();
            // -> ..... 
            // học thêm ở phần tiếp theo



            //_________________________ TRUY VẤN DATE _------_----_----_--__

            // ->whereDate('created_at', '2023-07-23') // hàm này chỉ nhận ngày. nếu chúng ta bỏ cả ngày và giờ vào thì nó sẽ không so sánh được.
            // bỏ như này sẽ là sai: 2023-07-23 09:10:29
            // Query:"select * from `users` where date(`created_at`) = ?"

            // ->whereMonth('created_at', '7') // hàm này sẽ so sánh tháng.
            //  "select * from `users` where month(`created_at`) = ?"

            // ->whereDay('created_at','23') 
            //select * from `users` where day(`created_at`) = ?" sẽ gọi hàm day() sql

            // ->whereYear('created_at', 2023)
            //"select * from `users` where year(`created_at`) = ?"
            // thực hiện gọi hàm year trong sql.







            // ---- ----- TRUY VẤN GIÁ TRỊ CỘT______________________________

            // ->whereColumn('created_at', '<>', 'update_at')
            // slq: "select * from `users` where `created_at` > `update_at`"

            // ->whereColumn(
            //     [
            //         [
            //             "created_at", '>', 'update_at'
            //         ],
            //         // những mảng con này sẽ tương tự như "AND"  mà chúng ta không cần phải 
            //         // ghi tiếp ->whereColumn() thứ hai điều này khiến cho mọi thứ nó tiện hơn.
            //         [
            //             'created_at', '<>', 'fullname'
            //         ]
            //     ]
            // )
            // SQL :select * from `users` where (`created_at` > `update_at` and `created_at` <> `fullname`)






            // _________________________NỐI BẢNG (join)________________________________


            // ->join('groups', 'users.group_id', '=', 'groups.id')
            // ->select('users.*', 'groups.created_at as group_create', 'groups.updated_at as group_update', 'groups.name as group_name')
            // ->where('groups.name', 'admin')
            //select * from `users` inner join `groups` on `users`.`group_id` = `groups`.`id`

            // join() này chính là INNER JOIN


            // leftJoin -----

            // ->leftJoin('groups', 'users.group_id', '=', 'groups.id')
            // Ưu tiên bảng bên trái tức là bảng hiện tại mình đang ở mà chuyển sang lấy dữ
            // liệu từ một bảng khác via relationship thì khi bảng user có dữ liệu thì sẽ lấy hết trước mà chưa màng đến bảng
            // bên phải tức là bảng mình join vào.

            // rightJoin()------
            // ->rightJoin('groups', 'users.group_id', '=', 'groups.id')











            // Sắp xếp ____________ORDER BY________________

            // -- Tăng dần và giảm dần.

            // ->orderBy('id', 'DESC') // DESC sắp xếp theo chiều giảm dần.
            // "select * from `users` order by `id` desc"
            // ->orderByDesc('id')



            // ->orderBy('id', 'asc') // ASC sắp xếp theo chiều tăng dần.
            // SQL: select * from `users` order by `id` asc"


            // -- Sắp xếp nhiều cột.

            // ->orderBy('fullname', 'DESC')
            // ->orderBy('id', 'DESC')
            // ->orderBy('created_at', "desc")

            //--- đối với sắp xếp nhiều cột theo như tôi thấy thì nó sẽ ưu tiên những thứ tự đầu
            // ví dụ tôi cho fullname trước thì nó luôn sắp xếp theo fullname còn mấy cái order còn lại thì nó không có theo lắm.

            // -- sắp xếp ngẫu nhiên.

            // ->inRandomOrder('id')
            //SQL: "select * from `users` order by RAND(id)"


            // Truy vấn theo nhóm ________________ GROUP BY__ HAVING________


            // ->select(DB::raw('count(email) as email_count'), 'email')
            // ->groupBy('email')



            // group by là để khi trường hợp mà cần lấy một dữ giống thôi
            // ví dụ nếu người dùng cần lấy một email mà trùng với tên còn lại thì chỉ lấy 
            // ra một người duy nhất thôi.
            // SQL : "select count(email) as email_count, `email` from `users` group by `email`"

            // --- having()

            // ->having('email_count', '>=', 2)
            // SQL: "select count(email) as email_count, `email` from `users` group by `email` having `email_count` >= ?"
            // having này dùng trong trường hợp có các điều kiện tiếp theo
            // mà mình muốn đặt cho nó.


            // Giới hạn________________ limit, offset __________


            // -- limit
            // ->offset(1) // offset 1 loại bỏ đi cái đầu tiên 
            // ->limit(2)  // nó lấy theo chỉ mục giá trị đầu tiên nó sẽ là 0.
            //tức là khi mà chúng ta offset thì nó sẽ lấy bắt đầu từ đâu đó.
            // trong lệnh trên thì ta lấy 2 bản ghi và loại bỏ đi bản ghi đầu tiên.
            // SQL:  "select * from `users` limit 2 offset 1"


            // ->take(3)
            // ->skip(2)
            // "select * from `users` limit 3 offset 2"
            // câu lệnh này đều giống như các câu lệnh ở trên. limit và offset





            ->get();
        $sql = DB::getQueryLog();
        dd($user);
        dd($sql);
    }

    public function learnQueryBuilderInsert()
    {
        DB::enableQueryLog();
        // $status = DB::table($this->table)
        // ->insert([
        //     'fullname'=>"Nguyen Van A",
        //     'email'=>'Nguyenvana@gmail.com',
        //     'group_id'=>1,
        //     'created_at'=>date('Y-m-d H:i:s')
        // ]);
        // // ->get();
        // $lastId = DB::getPdo()->lastInsertId(); // hàm này để lấy id. phương thức lastInsertId() là phương thức của pdo

        // $lastId = DB::table($this->table)
        //     ->insertGetId(
        //         [
        //             'fullname' => "Nguyen Van A",
        //             'email' => 'Nguyenvana@gmail.com',
        //             'group_id' => 1,
        //             'created_at' => date('Y-m-d H:i:s')
        //         ]
        //     );

        // việc gọi hàm insertGetId là để chúng ta có thể vừa chèn dữ liệu vừa nhận về được ID của bảng ghi mà chúng ta đã tạo đó.






        $sql  = DB::getQueryLog();

        // dd($lastId);
        dd($sql);
    }


    public function learnQueryBuilderUpdate()
    {
        DB::enableQueryLog();
        $status = DB::table($this->table)
            // ->where('id', 20) // nếu mà chúng ta không có where tìm kiếm ở đây thì nó sẽ thực hiện update tất cả các bảng ghi trong database thành một dữ liệu
            ->update([
                'fullname' => "Nguyen Van Nhat",
                'email' => 'nhat@gmail.com',
            ]);
        $sql  = DB::getQueryLog();
        dd($sql);
        dd($status);
    }

    public function learnQueryBuilderDelete()
    {
        DB::enableQueryLog();

        // ======  delete ===== 
        // $status = DB::table($this->table)
        //     ->where('id', 20) // nếu không có where thì sẽ thực hiện xóa tất cả.
        //     ->delete();



        // đếm số bản ghi-------------

        $count = DB::table($this->table)
            ->where('id', '>', 15)
            ->count();
        // SQL: select count(*) as aggregate from `users`
        // cái time là khoảng thời gian chạy của nó.

        $sql  = DB::getQueryLog();
        dd($sql);
        dd($count);
    }


    public function learnDBrawQuery()
    {
        DB::enableQueryLog();

        $result = DB::table($this->table)


            // --- selectRaw_-------

            // ->selectRaw('fullname, email ,count(id) as email_count') // select raw giúp chúng ta tích hợp được các câu lệnh truy vấn thuận lợi và phức tạp hơn chúng ta có thể sữ dụng cả cái hàm vào trong query.
            // ->select(
            //     DB::raw('count(id) as email_count')  // rawquery thường sữ dụng khi có các vấn đề phức tạp cần giải quết
            //     // khi chúng ta cần lấy dữ liệu trong một trường hợp mà query builder không thể truy cập được.
            //     // ví dụ như : select( 'count(id )') -> nếu ghi như này thì sẽ bị lỗi syntax.
            // // )
            // // thay vì phải viết : ->select( DB::raw('fullname,email')) như này thì chúng ta có thể sữ dụng selectRaw() nó sẽ thuận tiện hơn rất nhiều.

            // ->groupBy('email')
            // ->groupBy('fullname')
            // ->where('id', '>', 20)
            // chúng ta cũng có thế sữ dụng where raw.

            // --- whereRaw , orWhereRaw -----

            // ->whereRaw("id > ?", [10])
            // ->orWhereRaw('id = ?',[10]) 


            // --- orderByRaw() -----
            // ->orderByRaw('id desc')


            // --- groupByRaw ------
            // ->groupByRaw('fullname, email')

            // --------havingRaw-------- 
            // ->having('email_count','=',2)

            // ->havingRaw('email_count > ?',[1])
            // ->havingRaw('count(id) > ?', [1])


            // chung quy là raw query thì sẽ có thể ghi một cách thuận tiện hơn và rỏ ràng hơn. Giống như việc chúng ta viết sql.
            // ->select('users.*', 'groups.name')
            ->join('groups', "groups.id", '=', 'users.group_id')
            // ->where(
            //     'group_id',
            //     '=',
            //     function ($query) {
            //         $query->select('id')
            //             ->from('groups')
            //             ->where('name', 'manager');
            //     }
            // )
            // ta thực hiện các query lòng bàng function vì không làm như này những truy vấn sẽ không được đóng vào dấu.
            // và khiến cho việc truy vấn trở nên phức tạp hơn.

            // subquery ---- 

            // ->select('users.*', 'groups.name', DB::raw("(select count(id) from groups) as group_count")) // đây là cách chúng ta có thể lòng một subquery.
            ->selectRaw('users.*, groups.name, (SELECT count(id) FROM groups) as group_count') // đây là cách chúng ta có thể lòng một subquery. một là dung DB::raw  hai là dùng selectRaw();


            ->get();
        $sql  = DB::getQueryLog();
        dd($result);
        dd($sql);
    }
}
