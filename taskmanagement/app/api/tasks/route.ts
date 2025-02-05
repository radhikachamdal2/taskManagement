import { NextResponse } from "next/server";

interface Task {
    id: number
    title: string
    description: string
}

const tasks : Task[] = [{
    id: 1, title: 'test', description: 'test3'
}]


//Get all the tasks 
export async function GET() {
    return NextResponse.json(tasks)
}

// upload a task 
export async function POST(request: Request) {
    const newTask : Task = await request.json()
    newTask.id = tasks.length + 1 
    tasks.push(newTask)
    return NextResponse.json(tasks, {status: 200})
}
