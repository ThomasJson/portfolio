import "./articleScreen.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Container } from "react-bootstrap";

const ArticleScreen = () => {
  const { id } = useParams();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch("http://portfolio-api/comment/*", {
      method: "POST",
      body: JSON.stringify({
        with: ["account"],
      }),
    })
      .then((resp) => {
        return resp.json();
      })

      .then((json) => {
        setComments(json);
      });
  }, []);
  console.log("comments:", comments);
  // Fetch Article

  const { data, loading, error, text } = useFetch("article/" + id, {
    method: "POST",
    body: JSON.stringify({ with: ["image", "category"] }),
  });

  if (loading) return <div>Loading ...</div>;

  if (error) {
    console.log(error, text);
    return <div>Error !</div>;
  }
  console.log("data:", data);

  return (
    <>
      <main>
        <Container fluid className="singleArticle-container">
          <h1 className={data.data[0]?.with[1]?.title}>{data.data[0]?.with[1]?.title}</h1>
          <h2>{data.data[0]?.title}</h2>
          <img
            src={data.data[0]?.with[0]?.src}
            alt={data.data[0]?.with[0]?.alt}
            className="img-spacing"
          />
          <p>{data.data[0]?.content}</p>
        </Container>
        <Container>
          {comments?.data.map((comment) => {
          console.log('comment:', comment)

            if(comment.Id_article === id) {
              return (
                <h3>{comment.content}</h3>
              )
            }

          })}
        </Container>
      </main>
    </>
  );
};

export default ArticleScreen;
