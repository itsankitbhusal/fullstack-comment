<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comments::all();
        return response()->json($comments);
    }

    // get comment by id
    public function getComment($id)
    {
        $comment = Comments::find($id);
        if ($comment) {
            return response()->json($comment);
        } else {
            return response()->json(['message' => 'comment not found'], 404);
        }
    }

    // add comment
    public function addComment(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $comment = new Comments();
        $comment->title = $request->input('title');
        $comment->content = $request->input('content');
        $comment->save();
        return response()->json($comment);
    }

    // update comment
    public function updateComment(Request $request, $id)
    {
        $comment = Comments::find($id);

        if (!$comment) {
            return response()->json(['message' => 'comment not found'], 404);
        }

        if ($request->has('content')) {
            $comment->content = $request->input('content');
        }
        if ($request->has('title')) {
            $comment->title = $request->input('title');
        }
        $comment->save();
        return response()->json($comment);
    }

    // delete comment
    public function deleteComment($id)
    {
        $comment = Comments::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json($comment);
        } else {
            return response()->json(['message' => 'comment not found']);
        }
    }
}
