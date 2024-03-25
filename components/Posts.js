import Post from './Post';


const Post_Data = [
    {
        id: "abc",
        username: "kriscodes",
        userImg: "https://img.hotimg.com/IMG_6262-fotor-bg-remover-20240216121916.png",
        img: "https://img.hotimg.com/IMG_6262-fotor-bg-remover-20240216121916.png",
        caption: "Hit the subscribe and smash the like button now.",
    },
    {
        id: "abd",
        username: "kriscodes",
        userImg: "https://img.hotimg.com/IMG_6262-fotor-bg-remover-20240216121916.png",
        img: "https://img.hotimg.com/IMG_6262-fotor-bg-remover-20240216121916.png",
        caption: "Hit the subscribe and smash the like button now.",
    },
];

function Posts() {
    return (
        <div>
            {Post_Data.map(post => (
                <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
            ))}
        </div>
    );
}

export default Posts;
