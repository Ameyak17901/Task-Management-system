from models import Task
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db_utils import getTasks, modify_task, removeTask, createTask
import traceback


app = FastAPI()

origins = [
    'http://localhost:5173'
]

app.add_middleware(CORSMiddleware,
allow_credentials=True, 
allow_methods=['*'], 
allow_headers=['*'], 
allow_origins=origins)


@app.get('/')
def index():
    return {'message': 'Welcome to TaskManager'}

@app.get('/tasks')
def get_tasks():
    try:
        tasks = getTasks()
        return {'message': 'fetched successfully', 'data': tasks}
    except:
        print(traceback.print_exc())
        return {'message': 'error in fetching'}

@app.post('/task')
def addTask(task: Task):
    try:
        res = createTask(task)
        return res
    except:
        print(traceback.print_exc())
        return {'message': 'Failed to create task'}    

@app.put('/task/{id}')
def update_task(task: Task, id):
    try:
        res = modify_task(task,id)
        return res
    except:
        print(traceback.print_exc())
        return {'message': 'Failed to update...', 'status': 500}        


@app.delete('/task/{id}')
def delete_task(id):
    try:
        res = removeTask(id)
        return res
    except:
        print(traceback.print_exc())    
        return {'message': 'Failed to delete...', 'status': 500}    

if __name__ == '__main__':
    app.run()