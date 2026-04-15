import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

function Detail() {
    // 우리가 생각할 때, 이미 App에서 Routing 통해 /:id가 들어와야만, Detail이 뜨지 않나?
    // 그렇다면 당연히 id는 string이여야 되지 않나? (URL 값은 무조건 string)
    // 이렇게 생각하는 이유는, 우리가 전체 프로그램을 알고 있기 대문
    // IDE, 그리고 타입스크립트 엔진은 "이 파일만 보고 생각함"
    const { id } = useParams();  // 기능, 무엇이 반환되는지 알아야함. 안에 코드는 알필요없음.

    const [loading, setLoading] = useState<boolean>(true);
    // 배열은 [] 빈 배열을 해도 상관 없지만, 왜냐하면 얘는 그 형태의 요소가 없을 뿐
    // string[] : 빈배열을 허용하지만, 그 배ㅑ열 안의 요소는 무조건 string
    // 객채는 { name  string }이라고 써줬다면, 무조건 이 모양만 허용됨

    // 그리고 fetch가 되기 전 상태를 따져보면, 값이 아직 도착되지 않은 상황이니까 null값이 초기적으로도 논리적으로도 맞음

    const [post, setPost] = useState< PostType | null>(null);

    useEffect(() => {
        // useParams로 가져온 id는 값이 없을 수 있음. 타입이 string | undefined
        // 그래서 fetch를 실행시키기 전에 if를 통해 id값이 없다면 뒤를 실행하지 말고 이 함수를 종료하라고 해줘야함
        if (!id) return;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: PostType ) => {
                setPost(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>본문을 불러오는 중입니다...</div>
    }

    // 에러 처리
    // 1. 초기 상태 : loading: true, post : null
    //           -> 그럼 첫번째 if만 실행될 것임
    // 2. fetch 실행이 된 이후 : loading: false, post: PostType OR null
    //            실패라면 : loading: false, post: null
    //            성공이라면 : loading: false, post: PostType
    if (!post) {
        return <div className={styles.loading}>본문을 불러오는 중입니다...</div>
}

    return <div className={styles.container}>
        <Link to={"/"} className={styles.backLink}>&larr; 목록으로 돌아가기</Link>

        <article className={styles.article}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
                <span>게시물 번호 : {post.id}</span>
                <span style={{margin: "0 12px"}}>|</span>
                <span>작성자 : {post.userId}</span>
            </div>
            <div className={styles.body}>{post.body}</div>
        </article>
    </div>;
}

export default Detail;