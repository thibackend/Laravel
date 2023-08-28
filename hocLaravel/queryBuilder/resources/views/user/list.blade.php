@extends('layout')

@section('title')
    <h1>USERS PAGE</h1>
@endsection

@section('content')
    @if (session('msg'))
        <div class="alert alert-success"> {{ session('msg') }}</div>
    @endif
    <h1 class="mb-5 shadow">{{ $title }}</h1>
    <a href="{{ route('users.add') }}" class="btn btn-primary my-2"> Thêm người dùng</a>
    <form action="" method="get" class="mb-3">
        <div class="row">

            <div class="col-3">
                <select name="status" id="" class="form-control">
                    <option value="">Tất cả trạng thái</option>
                    <option value="active" {{ request()->status == 'active' ? 'selected' : false }}>Kích hoạt</option>
                    <option value="inactive" {{ request()->status == 'inactive' ? 'selected' : false }}>Chưa kích hoạt
                    </option>
                </select>
            </div>
            <div class="col-3">
                <select name="group_id" id="" class="form-control">
                    <option value="" {{ request()->group_id == '' ? 'selected' : false }}>Tất cả các nhóm
                    </option>
                    @if (!empty(getAllGroups()))
                        @foreach (getAllGroups() as $item)
                            <option value="{{ $item->id }}" {{ request()->group_id == $item->id ? 'selected' : false }}>
                                {{ $item->name }}</option>
                        @endforeach
                    @endif

                </select>
            </div>
            <div class="col-4">
                <input type="search" value="{{ request()->keywords }}" class="form-control" name="keywords"
                    placeholder="Tu khoa tim kiem" id="">
            </div>
            <div class="col-2">
                <button type="submit" class="btn btn-primary btn-block">Tim kiem</button>
            </div>
        </div>
    </form>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th width='5%'>STT</th>
                <th><a href="?sortBy=fullname&&sortType={{ $sortType }}">Tên</a> </th>
                <th><a href="?sortBy=email&&sortType={{ $sortType }}">Email</a></th>
                <th>Nhóm</th>
                <th>Trạng thái</th>
                <th width='15%'><a href="?sortBy=created_at&&sortType={{ $sortType }}">Thời gian</a></th>
                <th width='5%'>Sua</th>
                <th width='5%'>xoa</th>
            </tr>
        </thead>
        <tbody>
            @if (!empty($users))
                @foreach ($users as $key => $item)
                    <tr>
                        <th>{{ $key + 1 }}</th>
                        <td>{{ $item->fullname }}</td>
                        <td>{{ $item->email }}</td>
                        <td>{{ $item->group_name }}</td>

                        <td>{!! $item->status == 0
                            ? '<button class="btn btn-danger btn-sm"> Chưa kick hoạt</button>'
                            : '<button class="btn btn-success btn-sm">Kích hoạt</button>' !!}
                        </td>
                        <td>{{ $item->created_at }}</td>
                        <td><a href="{{ route('users.edit', ['id' => $item->id]) }}" class="btn btn-warning btn-sm">sua</a>
                        </td>
                        <td><a onclick='return confirm("Ban chac chan muon xoa!")'
                                href="{{ route('users.delete', ['id' => $item->id]) }}"
                                class="btn btn-danger btn-sm">xoa</a>
                        </td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="4"> Không có người dùng</td>
                </tr>
            @endif

        </tbody>
    </table>
    {{ $users->links() }}
@endsection
