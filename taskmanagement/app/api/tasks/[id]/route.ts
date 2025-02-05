import { NextResponse } from "next/server";

interface Task {
    id: number
    title: string
    description: string
}

const tasks : Task[] = [{
    id: 1, title: 'test', description: 'test3'
}]

export async function PATCH(request: Request, { params }: { params : { id: string }}){
    const taskId = parseInt(params.id); // id comes in as a string 
    const updatedData = await request.json();

    const task = tasks.find(task => task.id === taskId);

    if(!task){
        return NextResponse.json({message: 'Task not found'})
    } else {
        Object.assign(task, updatedData)
        return NextResponse.json(task)
    }
} 