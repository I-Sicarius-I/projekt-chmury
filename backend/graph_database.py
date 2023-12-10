from neo4j import GraphDatabase
from datetime import datetime

def add_user(uri, auth, fname, lname, nationality, gender, date_of_birth, email):
    
    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    CREATE (:User {fname: $fname, lname: $lname, nationality: $nationality, gender: $gender, date_of_birth: $date, email: $email})
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, fname=fname, lname=lname, nationality=nationality, gender=gender, date=date_of_birth, email=email)
        
    driver.close()
    return results

def add_post(uri, auth, email, title, subject, text):
    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (u:User {email: $email})
    CREATE (:Post {title: $title, subject: $subject, text: $text, date_posted: $date}) <-[:POSTED]-(u)
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=email, title=title, subject=subject, text=text, date=date)
        
    driver.close()
    return results

def add_comment(uri, auth, email, post_title,text):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (p:Post {title:$title})
    MATCH (u: User {email: $email})
    CREATE (p)<-[:COMMENTS_ON]-(:Comment {date_posted: $date, text: $text}) <-[:COMMENTED]-(u)
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=email, title=post_title, text=text, date=date)
        
    driver.close()
    return results


def react_on_post(uri, auth, email, post_title, reaction_type):

    driver = GraphDatabase.driver(
        uri,
        auth=auth)
    
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (p:Post {title:$title})
    MATCH (u: User {email: $email})
    MERGE (p) <-[r:REACTED]-(u)
    SET r.reaction_type = $reaction_type
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=email, title=post_title, reaction_type=reaction_type, date=date)
        
    driver.close()
    return results

def react_on_comment(uri, auth, email,com_email,post_title,reaction_type):

    driver = GraphDatabase.driver(
        uri,
        auth=auth)
    
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (u2 : User {email: $email})
    MATCH (p:Post {title:$title})<-[:COMMENTS_ON]-(c:Comment)<-[:COMMENTED]-(u1: User {email: $com_email})
    MERGE (c)<-[r:REACTED]-(u2)
    SET r.reaction_type = $reaction_type
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, com_email=com_email, email=email, title=post_title, reaction_type=reaction_type, date=date).data()
        
    driver.close()
    return results

def edit_user(uri, auth, cur_email, lname, fname, date_of_birth, nationality, gender, new_email):
    
    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = '''
    MATCH (u: User)
    WHERE u.email = $cur_email
    SET u.email = $new_email, u.lname = $lname, u.fname = $fname, u.date_of_birth = $date_of_birth, u.gender = $gender, u.nationality = $nationality
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, cur_email=cur_email, new_email=new_email, lname=lname, fname=fname, date_of_birth=date_of_birth, nationality=nationality, gender=gender).data()
    
    driver.close()
    return results

def edit_post(uri, auth, cur_title, subject, text, new_title):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = '''
    MATCH (p: Post)
    WHERE p.title = $cur_title
    SET p.title = $new_title, p.subject = $subject, p.text = $text
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, cur_title = cur_title, new_title = new_title, subject=subject, text=text).data()

    driver.close()
    return results

def edit_comment(uri, auth, post_title, user_email, text):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = '''
    MATCH (u:User)-[:COMMENTED]->(c:Comment)-[:COMMENTS_ON]->(p: Post)
    WHERE u.email = $email AND p.title = $title
    SET c.text =  $text
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=user_email, title=post_title, text=text).data()
    
    driver.close()
    return results

def del_user(uri, auth, email):

    driver = GraphDatabase.driver(
        uri,
        auth=auth)

    cypher_query = '''
    MATCH (u:User {email: $email}) DETACH DELETE u
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=email)
        
    driver.close()
    return results

def del_post(uri, auth, post_title):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)
    
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (p:Post {title: $title}) DETACH DELETE p
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, title=post_title)
        
    driver.close()
    return results

def del_comm(uri, auth, comm_email, post_title):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = '''
    MATCH (p:Post {title: $title})<-[:COMMENTS_ON]-(c:Comment)<-[:COMMENTED]-(u:User {email: $email}) DETACH DELETE c
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, title=post_title, email=comm_email)
        
    driver.close()
    return results

def del_react_on_post(uri, auth, react_email, post_title):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = '''
    MATCH (p:Post {title: $title})<-[r:REACTED]-(u:User {email: $email}) DELETE r
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, title=post_title, email=react_email)
        
    driver.close()
    return results

def del_react_on_comm(uri, auth, react_email, comm_email, post_title):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = '''
    MATCH (p:Post {title: $title})<-[:COMMENTS_ON]-(c:Comment)<-[:COMMENTED]-(u:User {email: $email})
    MATCH (c)<-[r:REACTED]-(u1:User {email:$react_email}) DELETE r
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, title=post_title, email=comm_email, react_email=react_email)
        
    driver.close()
    return results

def search_users(uri, auth, data: list):
    
    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = ''

    args ="{"

    for i in data:
        args += i + ", " if i != data[len(data)-1] else i
    
    args += "}"

    if args == "{}":
        cypher_query='''
        MATCH (u:User) RETURN u.fname as fname, u.lname as lname, u.email as email, u.nationality as nationality, u.gender as gender, u.date_of_birth as date_of_birth
        '''
    else:
        cypher_query=f'''
        MATCH (u: User {args}) RETURN u.fname as fname, u.lname as lname, u.email as email, u.nationality as nationality, u.gender as gender, u.date_of_birth as date_of_birth
        '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query).data()
        
    driver.close()
    return results

def search_posts(uri, auth, data: list, user_email: str = ""):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    cypher_query = ''

    args ="{"

    for i in data:
        args += i + ", " if i != data[len(data)-1] else i
    
    args += "}"

    email_arg = "{email: " + user_email + "}" if user_email != "" else ""

    if args == "{}":
        cypher_query=f'''
        MATCH (u:User {email_arg})-[:POSTED]->(p:Post) RETURN u.email as poster_email, p.date_posted as date_posted, p.title as title, p.text as text, p.subject as subject
        '''
    else:
        cypher_query=f'''
        MATCH (u:User {email_arg})-[:POSTED]->(p: Post {args}) RETURN u.email as poster_email, p.date_posted as date_posted, p.title as title, p.text as text, p.subject as subject
        '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query).data()
        
    driver.close()
    return results

def search_comments(uri, auth, user_email: str = "", post_title: str = ""):
    
    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    email_args = "{email: \"" + user_email + "\"}" if user_email != "" else ""
    title_args = "{title: \"" + post_title + "\"}" if post_title != "" else ""

    cypher_query = f'''
       MATCH (u: User {email_args})-[:COMMENTED]->(c: Comment)-[:COMMENTS_ON]->(p: Post {title_args}) RETURN c.date_posted as date_posted, c.text as text, u.email as user_email, p.title as post_title 
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query).data()
        
    driver.close()
    return results

def count_reactions_post(uri, auth, react_email, post_title, reaction_type):

    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    title_arg = "{title: \"" + post_title + "\"}" if post_title != "" else ""
    email_arg = "{email: \"" + react_email + "\"}" if react_email != "" else ""
    reaction_type_arg = "{reaction_type: \"" + reaction_type + "\"}" if reaction_type != "" else ""

    cypher_query = f'''   
        MATCH (p:Post {title_arg})
        OPTIONAL MATCH (u:User {email_arg})-[r:REACTED {reaction_type_arg}]->(p)
        WITH p, COUNT(r) as reactionsCount, r.reaction_type AS reaction_type
        RETURN p.title as post_title, reactionsCount, reaction_type
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query).data()
    
    driver.close()
    return results

def count_reactions_comm(uri, auth, react_email, post_title, comm_email, reaction_type):
    
    driver = GraphDatabase.driver(
    uri,
    auth=auth)

    title_arg = "{title: \"" + post_title + "\"}" if post_title != "" else ""
    comm_email_arg = "{email: \"" + comm_email + "\"}" if comm_email != "" else ""
    email_arg = "{email: \"" + react_email + "\"}" if react_email != "" else ""
    reaction_type_arg = "{reaction_type: \"" + reaction_type + "\"}" if reaction_type != "" else ""

    cypher_query = f'''  
        MATCH (u: User {comm_email_arg})-[:COMMENTED]->(c:Comment)-[:COMMENTS_ON]->(p: Post {title_arg})
        OPTIONAL MATCH (c)<-[r:REACTED {reaction_type_arg}]-(u1:User {email_arg})
        WITH u, p, COUNT(r) as reactionsCount, r.reaction_type AS reaction_type
        RETURN p.title as post_title, u.email as user_email, reactionsCount, reaction_type
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query).data()
          
    driver.close()
    return results