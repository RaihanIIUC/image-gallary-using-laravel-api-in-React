<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Models\Image;
 use Redirect,Response,File;
use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $images = Image::all();

        return Response::json($images);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreImageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreImageRequest $request, Image $image)
    {

        // if (isset($request->validator) && $request->validator->fails()) {
        //     return redirect()->route('customer.dashboard', '#account')->withErrors($request->validator, 'forwarding')->withInput()->with([
        //         'status' => 'There was a problem saving. Please try again!',
        //         'alert' => 'danger',
        //     ]);
        // }
        // add validation to it

        $fielnames = $request->input('name');
        $desc = $request->input('description');
        if ($request->file('image_path') == null) {
            $filepath = "404.png";
        } else {
            $filepath = $request->file('image_path')->store('gallary');
        }

        // $filepath = $request->file('img_path')->store('products');

        // $image = new Image();
        // $image->name = $fielnames;
        // $image->description = $desc;
        // $image->img_path = $filepath;

        $image->create([
            'name' =>  $fielnames,
            'description' => $desc,
            'image_path' => $filepath
        ]); 
        return Response::json($image);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show($image)
    {
        $img = Image::find($image);

       return Response::json($img);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateImageRequest  $request
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy($image)
    {
        $img = Image::find($image);

     if($img){
            $img->delete();
            return Response::json(['messages' => 'image deleted success']);
     }else{
         return Response::json(['message'=> 'image not found']);
     }

    }
}
