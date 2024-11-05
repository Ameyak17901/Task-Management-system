import traceback
import os
import mysql
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

password = os.getenv('PASSWORD')

mydb = mysql.connector.connect(
    user='root',
    database='dcodeblock',
    password=f"{password}",
    host='localhost'
)

def getTasks():
    try:
        cur = mydb.cursor()
        cur.execute(f"select * from tasks")
        tasks = cur.fetchall()
        cur.close()
        return [{'id': task[0], 'task': task[1], 'status': task[2]} for task in tasks]
    except:
        print(traceback.print_exc())
        return {'message': 'error in fetching'}

def createTask(task):
    try:
        cur = mydb.cursor()
        cur.execute(f"insert into tasks (task,status) values('{task.task}','{task.status}')")
        mydb.commit()
        if cur.rowcount:
            cur.close()
            return {'message': 'Added successfully...', 'status': 200}
        cur.close()
        return {'message': 'Error in adding...', 'status': 500}
    except:
        print(traceback.print_exc())
        return {'message': 'Failed to create'}    

def modify_task(task,id):
    try:
        cur = mydb.cursor()
        cur.execute(f"update tasks set task = '{task.task}', status = '{task.status}' where id = {id}")
        mydb.commit()
        print(cur.rowcount)
        if cur.rowcount > 0:
            cur.close()
            return {'message': 'updated successfully...', 'status': 200}
        cur.close()
        return {'message': 'No task found', 'status': 400}
    except:
        print(traceback.print_exc())
        return {'message': 'Error updating...', 'status': 500}    

def removeTask(id):
    try:
        cur = mydb.cursor()
        cur.execute(f"delete from tasks where id = {id}")
        mydb.commit()
        if cur.rowcount > 0:
            cur.close()
            return {'message': 'Deleted successfully...', 'status': 200}
        return {'messsage': 'No task found', 'status': 404} 
    except:
        print(traceback.print_exc())
        return {'message': 'Error deleting...', 'status': 500}        