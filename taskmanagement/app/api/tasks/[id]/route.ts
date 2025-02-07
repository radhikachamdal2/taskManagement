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
    console.log(params, 'paramsss')
    const taskId = parseInt(params.id); // id comes in as a string 

    const updatedTask: Task = await request.json();


    // const task = tasks.find(task => task.id === taskId);

    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    // Step 3: If the task exists, replace it in the tasks array
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask; // Replace old task with the updated task
    } else if(!taskIndex){
        return NextResponse.json({message: 'Task not found'})
    } 

//   tasks[taskId] = {
//     ...tasks[taskId],
//     ...updatedData,
//   };

  return NextResponse.json(tasks, {status:200})

    
} 