import os
from dotenv import load_dotenv
from graph_database import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

load_dotenv()
URI = os.getenv("NEO4J_URI")
AUTH = (os.getenv("NEO4J_USERNAME"), os.getenv("NEO4J_PASSWORD"))


class Post(BaseModel):
    poster_email: str
    title: str 
    subject: str 
    text: str   

class User(BaseModel):
    fname: str
    lname: str
    email: str
    nationality: str
    gender: str
    date_of_birth: str

class Comment(BaseModel):
    comm_email: str
    post_title: str
    text: str

class Reaction(BaseModel):
    react_email: str
    comm_email: str | None = None
    post_title: str
    reaction_type: str



#get endpoints

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/posts")
async def get_posts(date_posted: str = "", title: str = "", subject: str = "", text: str = ""):

    parameters = []

    parameters.append("date_posted: \"" + date_posted + "\"") if date_posted != "" else None
    parameters.append("title: \"" + title + "\"") if title != "" else None
    parameters.append("subject: \"" + subject + "\"") if subject != "" else None
    parameters.append("text: \"" + text + "\"") if text != "" else None

    results = search_posts(URI, AUTH, parameters)

    return results

@app.get("/users")
async def get_users(fname: str = "", lname: str = "", nationality: str = "", gender: str = "", date_of_birth: str = ""):

    parameters = []

    parameters.append("fname: \"" + fname + "\"") if fname != "" else None
    parameters.append("lname: \"" + lname + "\"") if lname != "" else None
    parameters.append("nationality: \"" + nationality + "\"") if nationality != "" else None
    parameters.append("gender: \"" + gender + "\"") if gender != "" else None
    parameters.append("date_of_birth: \"" + date_of_birth + "\"") if date_of_birth != "" else None

    results = search_users(URI, AUTH, parameters)
    
    return results

@app.get("/comments")
async def get_comments(commenter_email: str = "", post_title: str = ""):

    results = search_comments(URI, AUTH, commenter_email, post_title)

    return results

@app.get("/reactions")
async def get_reactions(react_email: str = "", post_title: str = "", reaction_type: str = "", post: bool = True, comm_email: str = False):
    
    if post:
        return count_reactions_post(URI, AUTH, react_email, post_title, reaction_type)
    else:
        return count_reactions_comm(URI, AUTH, react_email, post_title, comm_email, reaction_type)

#post endpoints

@app.post("/add-post")
async def post_post(post: Post):
    add_post(URI, AUTH, post.poster_email, post.title, post.subject, post.text)

@app.post("/add-user")
async def post_user(user: User):
    add_user(URI, AUTH, user.fname, user.lname, user.nationality, user.gender, user. date_of_birth, user.email)

@app.post("/add-comment")
async def post_comment(comment: Comment):
    add_comment(URI, AUTH, comment.comm_email, comment.post_title, comment.text)

@app.post("/add-reaction")
async def post_reaction(react: Reaction, post: bool = True):
    
    if post:
        react_on_post(URI, AUTH, react.react_email, react.post_title, react.reaction_type)
    else:
        react_on_comment(URI, AUTH, react.react_email, react.comm_email, react.post_title, react.reaction_type)

#put endpoints

@app.put("/edit-user")
async def put_user(user: User, cur_email: str):
    edit_user(URI, AUTH, cur_email=cur_email, lname=user.lname, fname=user.fname, date_of_birth=user.date_of_birth, nationality=user.nationality, gender=user.gender, new_email=user.email)

@app.put("/edit-post")
async def put_post(post: Post, cur_title: str):
    edit_post(URI, AUTH, cur_title=cur_title, subject=post.subject, text=post.text, new_title=post.title)

@app.put("/edit-comment")
async def put_comment(comm_email: str, post_title: str, text: str):
    edit_comment(URI, AUTH, post_title=post_title, user_email=comm_email, text=text)

#delete endpoints

@app.delete("/del-user")
async def delete_user(user_email: str):
    del_user(URI, AUTH, user_email)

@app.delete("/del-post")
async def delete_post(post_title: str):
    del_post(URI, AUTH, post_title)

@app.delete("/del-comment")
async def delete_comments(comm_email: str, post_title: str):
    del_comm(URI, AUTH, comm_email, post_title)

@app.delete("/del-reaction")
async def delete_reaction(post_title: str, react_email: str, post: bool = True, comm_email: str = ""):
    
    if post:
        del_react_on_post(URI, AUTH, react_email, post_title)
    else:
        del_react_on_comm(URI, AUTH, react_email, comm_email, post_title)


# @app.get("/posts")
# async def get(post_parameters):
