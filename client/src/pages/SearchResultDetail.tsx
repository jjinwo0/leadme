import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export const SearchResultDetail: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  return (
    <div>
      <h2>비디오 재생</h2>
      <Link to={`/search?q=${encodeURIComponent(query)}`}>
        검색 결과로 돌아가기
      </Link>
      <div style={{ width: "100%", maxWidth: "315px", margin: "0 auto" }}>
        <div
          style={{ position: "relative", paddingBottom: "177.77%", height: 0 }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
