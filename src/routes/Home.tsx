import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router";
import type { PostType } from "./Detail.tsx";

function Home() {
    // 초기값이 이미 true로 들어가기 때문에, (타입추론을해서) 타입스크립트 엔진이 loading에 대해 boolean으로 고정시킴
    // loading이라는 state는 useState 메소드를 통해 만들어지는 것이기 때문에,
    // useState<만들어지는 대상의 타입>(초기값)으로 타입 지정을 해줄 수 있음
    const [loading, setLoading] = useState<boolean>(true);

    // 초기값을 [] 해줘서, posts가 [], 배열이 되는건 아는데
    // 그 배열 안에 어떠한 타입의 요소가 들어올지 타입스크립트는 모름 => never[] 타입으로 강제됨
    // never[] => 배열은 배열인데, 안에 결코 요소가 들어갈 수 없는 상태

    // 앞으로 어떠한 요소가 들어가는 배열이 될지를 지정해줘야 됨
    // 객체가 요소로서 존재할 수 있는 배열이 될거야라고 써주면됨
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((json: PostType[]) => {
                setPosts(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>데이터를 로드 중입니다...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>커뮤니티 게시판</h1>
            <table className={styles.boardTable}>
                <thead>
                    <tr>
                        <th className={styles.idCell}>번호</th>
                        <th className={styles.titleCell}>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((value, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.idCell}>{value.id}</td>
                            <td className={styles.titleCell}>
                                <Link to={`/${value.id}`} className={styles.link}>
                                    {value.title}
                                </Link>
                            </td>
                            <td style={{ textAlign: "center", color: "#666" }}>{value.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
