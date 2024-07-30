import { NextResponse } from "next/server";

import prisma from "../../../../../prisma/client";

export async function GET(request, { params }) {
    const { id } = params;
    const post = await prisma.post.findUnique({
        where: { id: Number(id) }
    }
    );

    if (!post) {
        return NextResponse.json({
            succes: false,
            message: "Post not found"
        },
            {
                status: 404
            }
        );
    }
    return NextResponse.json({
        succes: true,
        message: "Post found",
        data: post
    },
        {
            status: 200
        }
    );
}

export async function PATCH(request, { params }) {
    const id = parseInt(params.id);

    const { title, content } = await request.json();

    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title: title,
            content: content,
            updatedAt: new Date()
        },
    });


    return NextResponse.json({
        succes: true,
        message: "Post updated",
        data: post
    },
        {
            status: 200
        }
    );
}


export async function DELETE(request, { params }) {
    const id = parseInt(params.id);
    const post = await prisma.post.delete({
        where: { id }
    });
    return NextResponse.json({
        succes: true,
        message: "Post deleted",
        data: post
    },
        {
            status: 200
        }
    );
}