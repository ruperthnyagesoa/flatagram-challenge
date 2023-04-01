// write your code here
//function to get the image data from the server
function getImage(){
    fetch('http://localhost:3000/images')
    .then(res=>res.json())
    .then(data=>{
    let h2 = document.getElementById('card-title');
    let img = document.getElementById('card-image');
    h2.textContent=data[0].title
    img.src=data[0].image
})
}

//function to add like
function likeIncreamentor(){
    let heart = document.getElementById('like-button');
    let likes = document.getElementById('like-count');
    let count = 0;
    heart.addEventListener('click',function(){
        likes.innerText=`${++count} likes`
        return likes.innerText
    });

}
//function to fetch comment from the server
function fetchComments(){
    fetch('http://localhost:3000/comments')
    .then(res=>res.json())
    .then(data=>{
    let li = document.getElementsByTagName('li');
    const newLi=Array.from(li);
    newLi.forEach(function(element,index){
        element.innerText=data[index].content;
    })
})
}
//function to post comment from form input
function post(){
    const form = document.getElementById('comment-form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        let li = document.createElement('li');
        let comment =document.getElementById('comment');
        const obj={
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body:JSON.stringify({
                imageId:1,
                [comment.name]:comment.value
            })
        }
        fetch('http://localhost:3000/comments',obj)
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err));
        document.getElementById('comments-list').append(li);
        form.reset();
        removeComment();
    });
}
//function to remove comment
function removeComment(){
    let li = document.getElementsByTagName('li');
    let liArray = Array.from(li);
    liArray.forEach(function(element,index){
        element.addEventListener('click',function(){
            const obj={
                method:'DELETE',
                Headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
            fetch(`http://localhost:3000/comments/${++index}`,obj)
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.error(err));
            element.remove();
        })
    });
}
//function toggle between displaying and hiding the image
function toggle(){
    const h2 = document.getElementById('card-title');
    const img = document.getElementById('card-image');
    img.style.display = 'inline'
        h2.addEventListener('click',(e)=>{
            //console.log(e);
            if(img.style.display==='inline'){
                return img.style.display='none';
            }
            else{
                return img.style.display='inline';
            }
        });
}

//function to patch new updated image data on the database
let image = document.getElementById('card-image');
let likes = document.getElementById('like-count').innerText;
image.addEventListener('click',persistImageData)
function persistImageData(){
    let image = document.getElementById('card-image');
    const obj={
        method:'PATCH',
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body:JSON.stringify({
            Likes:likes,
            image:image.src
        })
    }
    fetch('http://localhost:3000/images/1',obj)
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.error(err));

}
//Function to fetch a new random dog image
let img = document.getElementById('card-image');
img.addEventListener('click',fetchDogImage)
function fetchDogImage(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res=>res.json())
    .then(data=>{
    img.src=data.message
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    getImage();
    likeIncreamentor();
    fetchComments();
    post();
    removeComment();
    toggle();
});

