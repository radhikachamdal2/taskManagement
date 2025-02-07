import { NextResponse } from "next/server";
import { POST } from "../route";

interface Task {
    id: number
    title: string
    description: string
}

const tasks : Task[] = [{
    id: 1, title: 'test', description: 'test3'
}]

export async function PATCH(request: Request, { params }: { params : { id: string }}){
    const updatedTask: Task = await request.json();

    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask; 
    } else if(!taskIndex){
        return NextResponse.json({message: 'Task not found'})
    } 
    
 
  return NextResponse.json(tasks, {status:200})

    
} 