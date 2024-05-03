<?php

use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// get all comments
Route::get('/comments', [CommentController::class, 'index']);

// get comment by id
Route::get('/comments/{id}', [CommentController::class, 'getComment']);

// create new comment
Route::post('/comments', [CommentController::class, 'addComment']);

// update comment
Route::put('/comments/{id}', [CommentController::class, 'updateComment']);

// delete comment
Route::delete('/comments/{id}', [CommentController::class, 'deleteComment']);
