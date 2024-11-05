from pydantic import BaseModel

class Task(BaseModel):
    task: str
    status: str