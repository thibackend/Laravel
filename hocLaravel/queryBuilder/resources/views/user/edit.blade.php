@extends('layout')

@section('title')
    <h1>USERS Edit PAGE</h1>
@endsection

@section('content')
    @if (session('msg'))
        <div class="alert alert-success"> {{ session('msg') }}</div>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger">dữ liệu nhập vào không hợp lệ!</div>
    @endif

    <h1 class="mx-5 my-5 shadow">Cập nhật người dùng</h1>
    <form action="{{ route('users.post-edit') }}" method="post">
        @csrf
        <div class="mb-3">
            <label for="">Ho va ten</label>
            <input type="text" name="fullname" id="fullname" class="form-control" placeholder="ho va ten"
                value="{{ old('fullname') ?? $userDetail->fullname }}" />
            @error('fullname')
                <span style="color:red">{{ $message }}</span>
            @enderror
        </div>
        <div class="mb-3">
            <label for="">Email </label>
            <input type="text" value="{{ old('email') ?? $userDetail->email }}" name="email" id="email"
                class="form-control" placeholder="email .." />
            @error('email')
                <span style="color:red">{{ $message }}</span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="">Nhóm </label>
            <select name="group_id" id="group_id" class="form-control">
                <option value="0">chọn nhóm</option>
                @if (!empty($allGroup))
                    @foreach ($allGroup as $item)
                        <option value="{{ $item->id }}"
                            {{ old('group_id') == $item->id || $userDetail->group_id == $item->id ? 'selected' : false }}>
                            {{ $item->name }}</option>
                    @endforeach
                @endif
            </select>
            @error('group_id')
                <span style="color:red">{{ $message }}</span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="status">Trạng thái </label>
            <select name="status" id="status" class="form-control">
                <option value="{{ 0 }}" {{ old('status') == 0 || $userDetail->id == 0 ? 'selected' : false }}>
                    Không Kích hoạt</option>
                <option value="{{ 1 }}"
                    {{ old('status') == 1 || $userDetail->id == 1 ? 'selected' : false }}>Kích hoạt</option>
            </select>
            @error('status')
                <span style="color:red">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary"> update</button>
        <a href="{{ route('users.index') }}" class="btn btn-warning">quay lai</a>
    </form>
@endsection
