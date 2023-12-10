const api_url = "http://127.0.0.1";
const api_port = ":8000"


const serializeData = (query, data) =>
{
    var data_string = []

    for(var d in data)
    {
        if(data.hasOwnProperty(d))
        {
            data_string.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]))
        }
    }
    
    if(data_string.length > 0)
    {
        query += "?" + data_string.join("&")
    }

    return query
}

export const getUsers = async(user) => 
{
    if(user)
    {
        var query = serializeData("/users", user)

        const res = await fetch(api_url + api_port + query, 
        {
            method: "GET",
            headers: 
            {
                "Content-Type": "application/json"
            }
        })

        const users = await res.json()

        return users
    }
}

export const getPosts = async(post) =>
{
    if(post)
    {
        var query = serializeData("/posts", post)

        const res = await fetch(api_url + api_port + query, 
        {
            method: "GET",
            headers: 
            {
                "Content-Type": "application/json"
            }
        })

        const posts = await res.json()

        return posts
    }
}

export const getComments = async(comment) =>
{
    if(comment)
    {
        var query = serializeData("/comments", comment)

        const res = await fetch(api_url + api_port + query, 
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })

        const comments = await res.json()

        return comments
    }
}

export const getReactions = async(reaction) =>
{
    if(reaction)
    {
        var query = serializeData("/reactions", reaction)

        const res = await fetch(api_url + api_port + query, 
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }  
        })

        const reactions = await res.json()
        
        return reactions
    }
}

export const addUser = async(user) =>
{
    if(user)
    {
        const res = await fetch(api_url + api_port + "/add-user", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const data = await res.json();

        return data
    }
}

export const addPost = async(post) =>
{
    if(post)
    {
        const res = await fetch(api_url + api_port + "/add-post", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })

        const data = await res.json()

        return data
    }
}

export const addComment = async(comment) =>
{
    if(comment)
    {
        const res = await fetch(api_url + api_port + "/add-comment",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })

        const data = await res.json()

        return data
    }    
}

export const addReaction = async(reaction, isForPost) => 
{
    if(reaction)
    {
        var query = (!isForPost) ? "/add-reaction?post=false" : "/add-reaction"

        const res = await fetch(api_url + api_port + query,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)  
        })

        const data = await res.json()

        return data
    }
}

export const editUser = async(user, cur_email) =>
{
    if(user)
    {
        var query = "/edit-user?cur_email=" + cur_email

        const res = await fetch(api_url + api_port + query, 
        {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user) 
        })

        const data = await res.json()

        return data
    }
}

export const editPost = async(post, cur_title) =>
{
    if(post)
    {
        var query = "/edit-post?cur_title=" + cur_title

        const res = await fetch(api_url + api_port + query, 
        {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post) 
        })

        const data = await res.json()

        return data
    }
}

export const editComment = async(comm_email, post_title, text) =>
{
    if(text !== "")
    {
        var query = "/edit-comment?comm_email=" + comm_email + "&post_title=" + post_title + "&text=" + text

        const res = await fetch(api_url + api_port + query, 
        {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            }
        })  

        const data = await res.json()

        return data
    }
}

export const delUser = async(user_email) =>
{
    if(user_email !== "")
    {
        var query = "/del-user?user_email=" + encodeURIComponent(user_email)

        const res = await fetch(api_url + api_port + query, 
        {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            } 
        })

        const data = await res.json()

        return data
    }
}

export const delPost = async(post_title) =>
{
    if(post_title !== "")
    {
        var query = "/del-post?post_title=" + encodeURIComponent(post_title)

        const res = await fetch(api_url + api_port + query, 
        {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        return data
    }
}

export const delComment = async(comm_email, post_title) =>
{
    if(post_title !== "" && comm_email !== "")
    {
        var query = "/del-comment?comm_email=" + encodeURIComponent(comm_email) + "&post_title=" + encodeURIComponent(post_title)

        const res = await fetch(api_url + api_port + query,
        {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            }  
        })

        const data = await res.json()

        return data
    }
}

export const delReaction = async(post_title, react_email, isForPost, comm_email) =>
{
    if(post_title !== "" && react_email !== "")
    {
        var query = (!isForPost) ? "/del-reaction?post_title=" + encodeURIComponent(post_title) + "&react_email=" + encodeURIComponent(react_email) + "&post=false&comm_email=" + encodeURIComponent(comm_email) : "/del-reaction?post_title=" + encodeURIComponent(post_title) + "&react_email=" + encodeURIComponent(react_email)

        const res = await fetch(api_url + api_port + query,
        {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        return data
    }
}