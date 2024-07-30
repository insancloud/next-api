import { NextResponse } from "next/server";

import prisma from "../../../../prisma/client";

export async function GET() {
    const posts = await prisma.post.findMany();

    return NextResponse.json({
        succes: true,
        message: "List data post",
        data: posts
    },
        {
            status: 200

        }
    );
}

export async function POST(request) {

    const { title, content } = await request.json();

    const post = await prisma.post.create({ 
        data: {
            title,  
            content
        }
    });

    return NextResponse.json({
        succes: true,
        message: "Post created",
        data: post
    },
        {
            status: 201
        }
    );

}