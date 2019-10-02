You can see all the posts by selecting 'Posts' from the left menu or by going '/posts'.

You can search post by its ID (i.e. 0,1,2) from the search bar on the left menu.

You can also go to '/posts/:id' for a specific post.

  - GET to '/posts' => All the posts
  - GET to '/posts/:id' => Post with given ID
  - POST to '/posts' => Add new post (must include title, categories, content) 
  - DELETE to '/posts/:id' => Deletes the post with the given ID 
    
Typescript is used through out the project.
Redux is used for state management. Redux-thunk is used for async calls.
