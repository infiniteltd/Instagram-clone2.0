import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from 'react-moment';


function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState("");
    const [input, setInput] = useState(false);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        onSnapshot(
            query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => setComments(snapshot.docs));
    }, [db, id]);

    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', id, 'likes'), orderBy("timestamp", 'desc')), snapshot => setLikes(snapshot.docs));
    }, [db, id]);

    useEffect(() => {
        if (session && session.user && likes) {
            setHasLiked(
                likes.findIndex((like) => like.id === session?.user?.uid) !== -1
            );
        }
    }, [likes, session]);


    const likePost = async () => {
        const likeRef = doc(db, 'posts', id, 'likes', session.user.uid);

        if (hasLiked) {
            await deleteDoc(likeRef);
        } else {
            await setDoc(likeRef, {
                username: session.user.username
            });
        }
    };

    console.log(hasLiked);

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, "posts", id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });

        setInput(false);
    };

    return (
        <div className="bg-white my-2 border rounded-sm">
            <div className="flex items-center p-5">
                <img src={userImg} alt="" className="rounded-full h-12 w-12 border p-1 mr-3 object-fill" />
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>

            <img src={img} alt="" className="object-cover w-full" />

            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        <HeartIcon onClick={likePost} className="btn" />
                        <ChatIcon onClick={() => setInput(true)} className="btn" />
                        <PaperAirplaneIcon className="btn" />
                    </div>

                    <BookmarkIcon className="btn" />
                </div>
            )}

            <p className="p-5 truncate"><span className="font-bold mr-1">{username} </span>{caption}
            </p>

            {/* Comments */}
            {comments.length > 0 && (
                <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={comment.data().userImage} alt="" />
                            <p className="text-sm flex-1">
                                <span className="font-bold">{comment.data().username}</span>{" "}
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {input && session && (
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7" />
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="border-none flex-1 focus:ring-0 outline-none" />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        onClick={sendComment}
                        className="font-semibold text-blue-400">Post</button>
                </form>
            )}
        </div>
    );
}

export default Post;
