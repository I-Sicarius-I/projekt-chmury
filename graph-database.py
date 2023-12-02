from neo4j import GraphDatabase, basic_auth
from datetime import datetime

# driver = GraphDatabase.driver(
#   "neo4j+s://d77c5f03.databases.neo4j.io",
#   auth=basic_auth("neo4j", "zVcV_poS3tKyQZ_29QblaTWiTJ7Np8kWsp5nUz30pTY"))

# cypher_query = '''
# MATCH (u:User)-[:POSTED]->(p:Post) RETURN p.title as title LIMIT 25
# '''

# with driver.session(database="neo4j") as session:
#   results = session.execute_read(
#     lambda tx: tx.run(cypher_query,
#                       tagName="neo4j").data())
#   for record in results:
#     print(record['title'])

# driver.close()


def add_user(fname, lname, nationality, gender, date_of_birth, email):
    
    driver = GraphDatabase.driver(
    "neo4j+s://d77c5f03.databases.neo4j.io",
    auth=basic_auth("neo4j", "zVcV_poS3tKyQZ_29QblaTWiTJ7Np8kWsp5nUz30pTY"))

    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    CREATE (:User {fname: $fname, lname: $lname, nationality: $nationality, gender: $gender, date_of_birth: $date, email: $email})
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, fname=fname, lname=lname, nationality=nationality, gender=gender, date=date_of_birth, email=email)
        
    driver.close()
    return results

def add_post(email, title, subject, text):
    driver = GraphDatabase.driver(
      "neo4j+s://d77c5f03.databases.neo4j.io",
      auth=basic_auth("neo4j", "zVcV_poS3tKyQZ_29QblaTWiTJ7Np8kWsp5nUz30pTY"))

    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (u:User {email: $email})
    CREATE (:Post {title: $title, subject: $subject, text: $text, date_posted: $date}) <-[:POSTED]-(u)
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=email, title=title, subject=subject, text=text, date=date)
        
    driver.close()
    return results

def add_comment(email, post_title,text):

    driver = GraphDatabase.driver(
      "neo4j+s://d77c5f03.databases.neo4j.io",
      auth=basic_auth("neo4j", "zVcV_poS3tKyQZ_29QblaTWiTJ7Np8kWsp5nUz30pTY"))

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


def react_on_post(email, post_title, reaction_type):

    driver = GraphDatabase.driver(
        "neo4j+s://d77c5f03.databases.neo4j.io",
        auth=basic_auth("neo4j", "zVcV_poS3tKyQZ_29QblaTWiTJ7Np8kWsp5nUz30pTY"))
    
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (p:Post {title:$title})
    MATCH (u: User {email: $email})
    CREATE (p) <-[:REACTED {reaction_type: $reaction_type}]-(u)
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, email=email, title=post_title, reaction_type=reaction_type, date=date)
        
    driver.close()
    return results

def react_on_comment(email,com_email,post_title,reaction_type):

    driver = GraphDatabase.driver(
        "neo4j+s://d77c5f03.databases.neo4j.io",
        auth=basic_auth("neo4j", "zVcV_poS3tKyQZ_29QblaTWiTJ7Np8kWsp5nUz30pTY"))
    
    date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

    cypher_query = '''
    MATCH (p:Post {title:$title})
    MATCH (u1: User {email: $com_email})
    MATCH (u2 : User {email: $email})
    MATCH (p)<-[:COMMENTS_ON]-(c:Comment)<-[:COMMENTED]-(u1)
    CREATE (c)<-[:REACTED {reaction_type: $reaction_type}]-(u2)
    '''

    with driver.session(database="neo4j") as session:
        results = session.run(cypher_query, com_email=com_email, email=email, title=post_title, reaction_type=reaction_type, date=date)
        
    driver.close()
    return results
    

# print(add_post('johndoe@example.com', 'test', 'Testing of neo4j database', 'Testing adding an example node Post to User'))
# print(add_comment('williamgarcia@example.com', 'test', 'Testing adding comment under a post'))
# print(react_on_post('emmahernandez@example.com', 'Exploring the Universe', 'like'))
# print(react_on_comment("danieljohnson@example.com", "michaelbrown@example.com", "Writing Techniques", "heart"))
# print(add_user("Adam","Nowak","Poland","Male","2000-01-01","adamnowak@example.com"))