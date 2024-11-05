export async function getTasks() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function editTask(task, id) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  console.log(task);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}

export async function deleteTask(id) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/task/${id}`, {
    method: "DELETE",
  });

  if(!response.ok){
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data
}

export async function createTask(task){
  const response = await fetch(`${import.meta.env.VITE_API_URL}/task`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })
  if(!response.ok){
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data  
}
