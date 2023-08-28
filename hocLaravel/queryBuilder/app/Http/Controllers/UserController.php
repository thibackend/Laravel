<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Users;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $user;
    const _PER_PAGE_ = 3;
    public function __construct()
    {
        $this->user = new Users();
    }

    public function index(Request $request)
    {
        // $userStatus =$this ->user->statementUser('SELECT * from users');  // status cua statement method nos chi tra ve mot la true hoac false thoi.
        $title = 'List users';
        $filter = [];
        $keywords = null;
        if (!empty($request->status)) {
            $status = $request->status;
            if ($status == 'active') :
                $status = 1;
            else :
                $status = 0;
            endif;
            array_push($filter, ['users.status', '=', $status]);
        }
        if (!empty($request->group_id)) {
            $groupId = $request->group_id;
            array_push($filter, ['users.group_id', '=', $groupId]);
        }
        $keywords = $request->keywords;

        // xữ lý logic sắp xếp.
        $sortType = 'desc';
        $sortBy = $request->input('sortBy');
        if ($request->sortType == $sortType) :
            $sortType = 'asc';
        endif;
        $sortArr = ['sortBy' => trim($sortBy), 'sortType' => trim($sortType)];
        $users = $this->user->getAllUsers($filter, $keywords, $sortArr, self::_PER_PAGE_);

        // $users = $this->user->learnQueryBuilder();
        // $this->user->learnQueryBuilderInsert();
        // $this->user->learnQueryBuilderUpdate();
        // $this->user->learnQueryBuilderDelete();
        // $this->user->learnDBrawQuery();
        return view('user.list', compact('title', 'users', 'sortType'));
    }

    public function add()
    {
        $allGroup = getAllGroups();
        $title =  'Thêm người dùng mới';
        return view('user.add', compact('title', 'allGroup'));
    }

    public function postAdd(UserRequest $request)
    {
        // $request->validate([
        //     "fullname" => 'required|min:5',
        //     'email' => 'required|email|unique:users,email,fullname',
        //     'group_id' => ['required', 'integer', function ($attribute, $value, $fail) {
        //         if ($value == 0) :
        //             $fail('Bắt buộc phải chọn nhóm');
        //         endif;
        //     }],
        //     'status' => 'Required|integer'
        // ]);

        $user = [
            'fullname' => $request->fullname,
            'email' => $request->email,
            'group_id' => $request->group_id,
            'status' => $request->status,
            'created_at' => date('Y-m-d H:i:s')
        ];
        $this->user->addUser($user);
        return redirect()->route('users.index')->with('msg', "Add sucessful");
    }


    public function getEdit(Request $request, string $id)
    {
        $title = 'User update';
        if (!empty($id)) :
            $userDetail = $this->user->getDetail($id);
            if (!empty($userDetail)) :
                $userDetail = $userDetail[0];
                $request->session()->put('id', $id);
                $allGroup = getAllGroups();
                return view('user.edit', compact('userDetail', 'title', 'allGroup'));
            else :
                return redirect()->route('users.index')->with('msg', 'Nguoi dung khong ton tai');
            endif;
        else :
            return redirect()->route('users.index')->with('msg', "Lien ket khong ton tai");
        endif;
    }
    public function postEdit(UserRequest $request)
    {
        $id = session('id');
        if (empty($id)) :
            return back()->with('msg', "Lien ket khong ton tai");
        endif;
        $data = [
            'fullname' => $request->fullname,
            'email' => $request->email,
            'group_id' => $request->group_id,
            'status' => $request->status,
            'created_at' => date('Y-m-d H:i:s')
        ];
        $this->user->updateUser($data, $id);
        return back()->with('msg', "Cập nhật người dùng Thanh cong");
    }
    public function Del(string $id)
    {
        if (empty($id)) :
            return redirect()->route('users.index')->with('msg', "Lien ket khong ton tai");
        else :
            $this->user->Del($id);
            return redirect()->route('users.index')->with('msg', "Xoa thanh cong");
        endif;
    }
}
