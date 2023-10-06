const signIn = document.querySelector('.signIn');
const signUp = document.querySelector('.signUp');


const blogsContainer = document.querySelector('#blogsContainer');

const displayBlogs = (blogs) => {
    let html = ''
    blogs.forEach(blog => {
        html += `
        <div class="blogCard">
        <div class="blogTitle">
          <h3>
            ${blog.data().title}
          </h3>
        </div>
        <div class="blogContent">
          <p>
          ${blog.data().content}
          </p>
        </div>
        <div class="blogWritter">
            <p>
           writen by :  ${blog.data().username}
            </p>
        </div>
        </div>
        `
    });

    blogsContainer.innerHTML = html
}