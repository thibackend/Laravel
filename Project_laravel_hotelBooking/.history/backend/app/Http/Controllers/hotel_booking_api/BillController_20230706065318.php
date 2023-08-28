<?php

namespace App\Http\Controllers\hotel_booking_api;

use App\Http\Controllers\Controller;
use App\Models\Bills;
use Illuminate\Http\Request;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $bills = Bills::all();
        return response()->json($bills);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // vì là kiểu dữ liệu json nên phải  dùng hàn 
        // json encode và json decode để thực hiện lưu lại ==----------------
        // $services = ['service1', 'service2'];
        // $bill = new Bills;
        // $bill->services = json_encode($services);
        // $bill->save();
        // $bill = Bills::find(1);
        // $services = json_decode($bill->services);
        // --------------------------------------------------------------
        $bill = new Bills;
        $bill ->booking_id = $request->booking_id;
        $bill ->services = $request->services;
        
        $bill = Bills::create($request->all());
        return response()->json($bill, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bills $bills)
    {
        $bill = Bills::findOrFail($bills);
        return response()->json($bill);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bills $bills)
    {
        $bill = Bills::findOrFail($bills);
        $bill->update($request->all());
        return response()->json($bill, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bills $bills)
    {
        $bill = Bills::findOrFail($bills);
        $bill->delete();
        return response()->json(null, 204);
    }
}
