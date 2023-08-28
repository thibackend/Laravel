<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $uniqueEmail = 'unique:users';
        if (!empty(session('id'))) :
            $id = session('id');
            $uniqueEmail = 'unique:users,email,' . $id;
        endif;
        return [
            "fullname" => 'required|min:5',
            'email' => 'required|email|' . $uniqueEmail,
            'group_id' => ['required', 'integer', function ($attribute, $value, $fail) {
                if ($value == 0) :
                    $fail('Bắt buộc phải chọn nhóm');
                endif;
            }],
            'status' => 'Required|integer'
        ];
    }
    public function messages()
    {
        return [];
    }
}
