<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/refresh', [AuthController::class, 'refresh']);
});

Route::middleware(['jwt.verify'])->group(function() {
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::get('/get-all-client', [ClientController::class, 'forUser']);
    Route::post('/create-client', [ClientController::class, 'store']);
    Route::post('/update-client/{clientId}', [ClientController::class, 'update']);
});

Route::middleware(['auth:api','api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userProfile']);

    Route::group(['prefix' => 'client'], function () {
        Route::get('/get', [ClientController::class, 'forUser']);
        Route::post('/create', [ClientController::class, 'store']);
        Route::post('/update/{clientId}', [ClientController::class, 'update']);
    });

});
