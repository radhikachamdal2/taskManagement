import { NextResponse } from "next/server";
import { tasks } from "../mockData";

interface Task {
    id: number
    title: string
    description: string
    status: string 
}

//Get all the tasks 
export async function GET() {
    debugger
    return NextResponse.json(tasks)
}

// upload a task 
export async function POST(request: Request) {
    const newTask : Task = await request.json()
    newTask.id = tasks.length + 1 
    tasks.push(newTask)
    debugger
    return NextResponse.json(tasks, {status: 200})
}
